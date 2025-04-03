import { Header } from 'components/Header';
import styles from './MainPage.module.scss';
import Text from 'components/Text';
import { NavLink, useNavigate } from 'react-router';
import Input from 'components/Input';
import Button from 'components/Button';
import { Clock, LoupeIcon } from 'assets';
import MultiDropdown from 'components/MultiDropdown';
import { useState } from 'react';
import Card from 'components/Card';
import { Pagination } from 'components/Pagination/Pagination';
import { useRecipes } from 'utils/hooks';

export const MainPage = () => {
  const [inputValue, setInputValue] = useState('');
  const { data } = useRecipes();
  const navigate = useNavigate();

  const handleChangeInput = (value: string) => {
    setInputValue(value);
  };

  // const handleFilterrecipes = async () => {
  //   const newCards = await filterRecipes({
  //     name: inputValue,
  //   });
  //   console.log(newCards);
  //   setCards(newCards);
  // };

  const cardsOption = [
    {
      key: 'Dog',
      value: 'Cat',
    },
    {
      key: 'Dog',
      value: 'Cat',
    },
  ];
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
              <Button className={styles.btn}>
                <LoupeIcon />
              </Button>
            </div>
            <div className={styles.dropdown}>
              <MultiDropdown options={cardsOption} getTitle={() => 'Category'} value={[]} onChange={() => {}} />
            </div>
          </div>
          <ul className={styles.cards}>
            {data?.data.map((card) => {
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
          <Pagination onClick={() => {}} totalPages={9} currentPage={1} />
        </section>
      </div>
    </>
  );
};
