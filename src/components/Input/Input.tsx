import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={clsx(styles.wrapper, className)}>
        <input {...rest} ref={ref} type="text" value={value} onChange={handleChange} className={styles.input} />
        {afterSlot}
      </div>
    );
  },
);

export default Input;
