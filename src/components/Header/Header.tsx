import Text from 'components/Text';
import styles from './Header.module.scss';
import { LikeIcon, Logo, UserIcon } from 'assets';
import { NavLink } from 'react-router';

const links = [
  {
    link: '/',
    text: 'Recipes',
  },
  {
    link: '/MealsCategories',
    text: 'Meals Categories',
  },
  {
    link: '/Products',
    text: 'Products',
  },
  {
    link: '/MenuItems',
    text: 'Menu Items',
  },
  {
    link: '/MealPlanning',
    text: 'Meal Planning',
  },
];

export const Header = () => {
  return (
    <div className={styles.c}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
          <Text color="primary" view="p-20" weight="bold">
            Food Client
          </Text>
        </div>
        <nav>
          <ul className={styles.links}>
            {links.map(({ link, text }) => {
              return (
                <li key={text}>
                  <NavLink
                    to={link}
                    className={({ isActive }) => {
                      return isActive ? styles.selected : '';
                    }}
                  >
                    <Text view="p-16">{text}</Text>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.userBlock}>
          <LikeIcon />
          <UserIcon />
        </div>
      </div>
    </div>
  );
};
