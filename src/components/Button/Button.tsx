import React from 'react';
import styles from './Button.module.scss';
import Loader from '../Loader';
import Text from '../Text';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  className,
  disabled = false,
  type = 'button',
  ...rest
}) => {
  const buttonClasses = clsx(
    styles.container,
    {
      [styles.loading]: loading,
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-busy={loading}
    >
      {loading && (
        <Loader
          colorClass={styles['btn-loader']}
          size="s"
          aria-label="Загрузка"
        />
      )}
      <Text view="button">{children}</Text>
    </button>
  );
};

export default Button;
