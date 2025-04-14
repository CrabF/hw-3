import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input';
import styles from './MultiDropdown.module.scss';
import clsx from 'clsx';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, onChange, value, disabled, getTitle, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null);

  const addNewOption = (val: Option) => {
    const newVal = [...value, val];
    return newVal;
  };

  const searchOption = (option: Option) => {
    return value.find((item) => {
      return item.key === option.key;
    });
  };

  const removeOption = (option: Option) => {
    return value.filter((item) => {
      return option.key !== item.key;
    });
  };

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as HTMLDivElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <div className={clsx(styles.wrapper, className)} ref={ref}>
      <Input
        className={value.length === 0 ? styles.placeholder : undefined}
        disabled={disabled}
        value={isOpen ? filter : value.length > 0 ? getTitle(value) : ''}
        placeholder="Category"
        onChange={(value) => {
          setFilter(value);
        }}
        onClick={() => !disabled && setIsOpen(true)}
      ></Input>
      {isOpen && !disabled && (
        <div className={styles.options}>
          {options.map((option) => {
            return (
              <div
                className={clsx(styles.option, value.some((item) => item.key === option.key) && styles.selected)}
                key={option.key}
                onClick={() => {
                  let newValue;
                  if (searchOption(option)) {
                    newValue = removeOption(option);
                  } else {
                    newValue = addNewOption(option);
                  }
                  onChange(newValue);
                  setFilter(getTitle(newValue));
                }}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
