import React from 'react';
import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
  colorClass?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = 'l',
  className = '',
  colorClass,
}) => {
  return (
    <div
      className={`${className} ${styles.container} ${
        styles[`container-${size}`]
      }`}
    >
      <div
        className={`${styles.loader} ${styles[`loader-${size}`]} ${colorClass}`}
      />
    </div>
  );
};
export default Loader;
