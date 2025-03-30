import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';
import Text from '../Text';
export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title?: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /**Дополнительный класс для изображения */
  imgClassName?: string;
};

const Card: React.FC<CardProps> = ({
  className,
  imgClassName,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  actionSlot,
  onClick,
}) => {
  return (
    <div className={clsx(styles.card, className)} onClick={onClick}>
      <div className={clsx(styles.imageContainer, imgClassName)}>
        <img className={clsx(styles.image, imgClassName)} src={image} />
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          {captionSlot && (
            <Text className={styles.caption} view="p-14" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text className={styles.title} view="p-20" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text className={styles.subtitle} view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        {contentSlot}
        {actionSlot}
      </div>
    </div>
  );
};

export default Card;
