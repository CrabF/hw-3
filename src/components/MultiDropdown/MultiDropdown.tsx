import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Input from '../Input';
import styles from './MultiDropdown.module.scss';
import ArrowDownIcon from '../icons/ArrowDownIcon';

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

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, value, onChange, options, disabled, getTitle }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const hasValue = value.length > 0;

  const onSelect = (option: Option) => {
    const idx = value.findIndex(({ key }) => key === option.key);
    const newValues = idx === -1 ? [...value, option] : value.filter(({ key }) => key !== option.key);
    onChange(newValues);
  };

  const closeDropdown = () => {
    setOpen(false);
    setFilter('');
  };

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.getElementById('multi-dropdown');
      if (dropdown && !dropdown.contains(target)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', clickOutside);
    return () => document.removeEventListener('click', clickOutside);
  }, []);

  const filteredOptions = options.filter(
    (option) => filter === '' || option.value.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div id="multi-dropdown" className={clsx(styles.wrapper, disabled && styles.disabled, className)}>
      <Input
        value={open ? filter : hasValue ? getTitle(value) : ''}
        placeholder={getTitle(value) || 'Categories'}
        onChange={(text) => {
          setFilter(text);
        }}
        onFocus={() => {
          if (!disabled) {
            setOpen(true);
          }
        }}
        onClick={() => !disabled && setOpen(true)}
        className={!hasValue ? styles.placeholder : undefined}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {open && !disabled && (
        <div className={styles.options}>
          {filteredOptions.map((option) => (
            <div
              className={clsx(styles.option, value.some((item) => item.key === option.key) && styles.selected)}
              key={option.key}
              onClick={() => onSelect(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
