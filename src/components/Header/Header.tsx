import Text from 'components/Text';
import styles from './Header.module.scss';
import { LikeIcon, Logo, UserIcon } from 'assets';
import { NavLink } from 'react-router';
import { ROUTES } from 'config/constants';

const links = [
  {
    link: ROUTES.HOME,
    text: 'Recipes',
  },
  {
    link: ROUTES.MEALS_CATEGORIES,
    text: 'Meals Categories',
  },
  {
    link: ROUTES.PRODUCTS,
    text: 'Products',
  },
  {
    link: ROUTES.MENU_ITEMS,
    text: 'Menu Items',
  },
  {
    link: ROUTES.MEAL_PLANING,
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
