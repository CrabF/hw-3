import Text from 'components/Text';
import styles from './Header.module.scss';
import { LikeIcon, Logo, MenuIcon, UserIcon } from 'assets';
import { NavLink } from 'react-router';
import { ROUTES } from 'config/constants';
import { useState } from 'react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <ul className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
            {links.map(({ link, text }) => {
              return (
                <li key={text}>
                  <NavLink
                    to={link}
                    className={({ isActive }) => {
                      return isActive ? styles.selected : '';
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Text view="p-16">{text}</Text>
                  </NavLink>
                </li>
              );
            })}
            
          </ul>
        </nav>
        <div className={styles.userBlock}>
        <button className={styles.mobileMenuButton} onClick={toggleMenu}>
          <MenuIcon/>
        </button>
          <LikeIcon />
          <UserIcon />
        </div>
      </div>
    </div>
  );
};
