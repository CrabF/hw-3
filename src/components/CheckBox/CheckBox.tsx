import React from 'react';
import clsx from 'clsx';
import styles from './CheckBox.module.scss';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  className,
  checked,
  disabled,
  ...props
}) => {
  return (
    <label
      className={clsx(styles.wrapper, disabled && styles.disabled, className)}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      {checked && (
        <CheckIcon
          width={40}
          height={40}
          color={disabled ? 'tertiary' : 'accent'}
          className={styles.icon}
        />
      )}
    </label>
  );
};

export default CheckBox;
