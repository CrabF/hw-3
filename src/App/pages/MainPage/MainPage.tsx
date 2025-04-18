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
  const [, setPageParam] = useSearchParams();
  const { page, filter, search } = rootStore.query.params;
  const { recipes, categories } = store;
  const options: Option[] = [];

  if (filter && categories) {
    const filterArr = filter.toString().split('_');
    const allCategoriesArr = categories.data.map((item) => {
      return {
        key: item.id.toString(),
        value: item.title,
      };
    });

    for (let i = 0; i < filterArr.length; i++) {
      const option = allCategoriesArr.find((item) => {
        return filterArr[i] === item.value;
      });
      options.push(option as Option);
    }
  }

  const [, setSelectedOptions] = useState<Option[]>(options ? options : []);
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  const currentPage = Number(page || 1);

  const getTitle = (selected: Option[]): string => {
    if (selected.length === 0) {
      return '';
    }

    if (selected.length === 1) {
      return selected[0].value;
    }

    return selected.map((opt) => opt.value).join(', ');
  };

  const getFilteredByCategory = (options: Option[]) => {
    setSelectedOptions(options);
    const filteredValues = options
      .map((item) => {
        return item.value;
      })
      .join('_');

    setPageParam((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      newParams.set('filter', filteredValues);

      return newParams;
    });
  };

  const handleFilterClick = () => {
    setPageParam((prev) => {
      const newParams = new URLSearchParams(prev.toString());

      if (inputValue) {
        newParams.set('search', inputValue.toString());
      } else {
        newParams.delete('search');
      }

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
    setInputValue(search?.toString() ?? '');
    store.getRecipes();
    store.getAllCategoriesForRecipes();
  }, [currentPage, filter, search]);

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
                value={inputValue.toString()}
                onChange={setInputValue}
              />
              <Button
                onClick={() => {
                  handleFilterClick();
                }}
                className={styles.btn}
              >
                <LoupeIcon />
              </Button>
            </div>
            <div className={styles.dropdown}>
              {categories && (
                <MultiDropdown
                  options={categories.data.map((item) => {
                    return {
                      key: item.id.toString(),
                      value: item.title,
                    };
                  })}
                  getTitle={getTitle}
                  value={options as Option[]}
                  onChange={(options) => {
                    getFilteredByCategory(options);
                  }}
                />
              )}
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
