import { Header } from 'components/Header';
import styles from './CardPage.module.scss';
import { NavLink, useParams } from 'react-router';
import { ArrowLeftIcon, DishIcon, LadleIcon } from 'assets';
import Text from 'components/Text';
import Card from 'components/Card';
import { useRecipe } from 'utils/hooks';

export const CardPage = () => {
  const { id } = useParams();
  const { data } = useRecipe(id as string);

  const RecipeSummary = ({ html }: { html: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }}>{}</div>;
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <NavLink to={'/'}>
            <ArrowLeftIcon />
          </NavLink>
          <Text tag="h1" view="title">
            {data?.data.name}
          </Text>
        </div>
        <div className={styles.content}>
          {data?.data && (
            <>
              <Card
                imgClassName={styles.img}
                className={styles.card}
                image={data.data.images[0].formats.large?.url || data.data.images[0].formats.thumbnail.url}
                subtitle=""
                contentSlot={
                  <div className={styles.cardInfo}>
                    <div className={styles.stats}>
                      <Text view="p-16">Preparation</Text>
                      <Text color="brand" weight="medium" view="p-16">
                        {data.data.preparationTime + ' minutes'}
                      </Text>
                    </div>
                    <div className={styles.stats}>
                      <Text view="p-16">Cooking</Text>
                      <Text color="brand" weight="medium" view="p-16">
                        {data.data.cookingTime + ' minutes'}
                      </Text>
                    </div>
                    <div className={styles.stats}>
                      <Text view="p-16">Total</Text>
                      <Text color="brand" weight="medium" view="p-16">
                        {data.data.totalTime + ' minutes'}
                      </Text>
                    </div>
                    <div className={styles.stats}>
                      <Text view="p-16">Likes</Text>
                      <Text color="brand" weight="medium" view="p-16">
                        {data.data.likes}
                      </Text>
                    </div>
                    <div className={styles.stats}>
                      <Text view="p-16">Servings</Text>
                      <Text color="brand" weight="medium" view="p-16">
                        {data.data.servings + ' servings'}
                      </Text>
                    </div>
                    <div className={styles.stats}>
                      <Text view="p-16">Ratings</Text>
                      <Text color="brand" weight="medium" view="p-16">
                        {data.data.rating + ' /' + ' 5'}
                      </Text>
                    </div>
                  </div>
                }
              />
              <div className={styles.summary}>
                <RecipeSummary html={data.data.summary}></RecipeSummary>
              </div>
              <div className={styles.cookingBlock}>
                <div className={styles.ingredientsBlock}>
                  <Text view="p-20" weight="medium">
                    Ingredients
                  </Text>
                  <div className={styles.ingredients}>
                    {data.data.ingradients.map((item) => {
                      return (
                        <span key={item.id} className={styles.ingredient}>
                          <DishIcon />
                          <Text>{`${item.amount} ${item.unit} ${item.name}`}</Text>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.separatorBlock}>
                  <li className={styles.dot}></li>
                  <div className={styles.separator}></div>
                </div>

                <div className={styles.equipmentBlock}>
                  <Text view="p-20" weight="medium">
                    Equipment
                  </Text>
                  <div className={styles.equipments}>
                    {data.data.equipments.map((item) => {
                      return (
                        <span key={item.id} className={styles.ingredient}>
                          <LadleIcon />
                          <Text>{item.name}</Text>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.directions}>
                <Text view="p-20" weight="medium">
                  Directions
                </Text>
                {data.data.directions.map((item, index) => {
                  return (
                    <div key={item.id} className={styles.steps}>
                      <div className={styles.step}>
                        <Text view="p-16" weight="medium">
                          Step {index + 1}
                        </Text>
                        <Text view="p-14">{item.description}</Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
