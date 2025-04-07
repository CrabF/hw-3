import { Header } from 'components/Header';
import styles from './MainPage.module.scss';
import Text from 'components/Text';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import Input from 'components/Input';
import Button from 'components/Button';
import { Clock, LoupeIcon } from 'assets';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { useEffect, useState } from 'react';
import Card from 'components/Card';
import { Pagination } from 'components/Pagination/Pagination';
import { observer } from 'mobx-react-lite';
import { RecipesStore } from 'store/RecipesStore';
import rootStore from 'store/RootStore';

const store = new RecipesStore();

export const MainPage = observer(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPageParam] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    rootStore.query.params.filter ? ([rootStore.query.params.filter] as Option[]) : [],
  );
  const [inputValue, setInputValue] = useState((rootStore.query.params.search as string) || '');
  const navigate = useNavigate();
  const { recipes } = store;

  const currentPage = Number(rootStore.query.params.page || 1);
  const getTitle = (selected: Option[]): string => {
    if (selected.length === 0) {
      return 'Categories';
    }
    return selected.map((opt) => opt.value).join(', ');
  };

  const getCategoryList = () => {
    if (recipes) {
      const options: Option[] = recipes.data.map((item) => {
        return {
          key: item.category.id.toString(),
          value: item.category.title,
        };
      });
      return options.filter((option, index, arr) => {
        return (
          arr.findIndex((i) => {
            return i.key === option.key;
          }) === index
        );
      });
    } else {
      return [];
    }
  };

  const getFilteredByCategory = (o: Option[]) => {
    setSelectedOptions(o);
    const filteredValues = o
      .map((item) => {
        return item.value;
      })
      .join('_');

    store.getFilteredRecipesByCategory(getTitle(o));
    setPageParam((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set('filter', filteredValues);

      return newParams;
    });
  };

  const handleChangeInput = (value: string) => {
    setInputValue(value);
    setPageParam((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      if (value) {
        newParams.set('search', value);
      } else {
        newParams.delete('search');
      }

      return newParams;
    });
  };

  const handleFilterClick = () => {
    store.getFilteredRecipes(inputValue);
    setPageParam((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set('page', '1');

      return newParams;
    });
  };

  const handlePaginationClick = (newPage: number) => {
    setPageParam((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set('page', newPage.toString());
      return newParams;
    });
  };

  useEffect(() => {
    store.getRecipes(currentPage, 10, rootStore.query.params.search as string, rootStore.query.params.filter as string);
  }, [currentPage]);

  const handleClickCard = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const RecipeSummary = ({ html }: { html: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }}>{}</div>;
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.img}>
          <div className={styles.title}></div>
        </section>
        <section className={styles.content}>
          <Text>
            Find the perfect food and{' '}
            <NavLink className={styles.link} to={'#'}>
              drink ideas
            </NavLink>{' '}
            for every occasion, from{' '}
            <NavLink className={styles.link} to={'#'}>
              weeknight dinners
            </NavLink>{' '}
            to{' '}
            <NavLink className={styles.link} to={'#'}>
              holiday feasts
            </NavLink>
            .
          </Text>
          <div className={styles.sortBox}>
            <div className={styles.inputBox}>
              <Input
                className={styles.input}
                placeholder="Enter dishes"
                value={inputValue}
                onChange={handleChangeInput}
              />
              <Button onClick={handleFilterClick} className={styles.btn}>
                <LoupeIcon />
              </Button>
            </div>
            <div className={styles.dropdown}>
              <MultiDropdown
                options={getCategoryList()}
                getTitle={getTitle}
                value={selectedOptions}
                onChange={(o) => {
                  getFilteredByCategory(o);
                }}
              />
            </div>
          </div>
          <ul className={styles.cards}>
            {recipes?.data.map((card) => {
              return (
                <Card
                  onClick={() => handleClickCard(card.documentId)}
                  className={styles.card}
                  captionSlot={
                    <span className={styles.timeSpan}>
                      <Clock />
                      {card.preparationTime + ' minutes'}
                    </span>
                  }
                  actionSlot={
                    <div className={styles.actionSlot}>
                      <Text view="p-18" weight="bold" color="brand">
                        {Math.trunc(card.calories) + ' kcal'}
                      </Text>
                      <Button className={styles.btn}>Save</Button>
                    </div>
                  }
                  key={card.id}
                  image={card.images[0].formats.large?.url || card.images[0].formats.thumbnail.url}
                  title={
                    <Text view="p-20" weight="medium" maxLines={1}>
                      {card.name}
                    </Text>
                  }
                  subtitle={<RecipeSummary html={card.summary} />}
                />
              );
            })}
          </ul>
          <Pagination
            onClick={handlePaginationClick}
            totalPages={recipes?.meta.pagination.pageCount as number}
            currentPage={currentPage}
          />
        </section>
      </div>
    </>
  );
});
