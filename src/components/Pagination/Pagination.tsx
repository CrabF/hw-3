import { FC, useEffect, useRef, useState } from 'react';
import styles from './Pagination.module.scss';
import { BlackArrowRightIcon } from 'assets';
import clsx from 'clsx';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contWidth, setContWidth] = useState(0);

  useEffect(() => {
    const handleResize = (entries: Array<ResizeObserverEntry>) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setContWidth(width);
      }
    };

    const observer = new ResizeObserver(handleResize);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      onClick(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onClick(currentPage - 1);
    }
  };

  function getArrayNumber(): Array<string | number> {
    const abbreviatedArrayLength = 7;
    if (totalPages <= abbreviatedArrayLength && contWidth > 650) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else if (totalPages > abbreviatedArrayLength || contWidth <= 650) {
      const array: (string | number)[] = [];

      let firstNumber = Math.max(1, currentPage - 3);
      let lastNumber = Math.min(totalPages - 1, currentPage + 3);

      if (contWidth && contWidth <= 650) {
        firstNumber = Math.max(1, currentPage - 1);
        lastNumber = Math.min(totalPages - 1, currentPage + 1);
        if (totalPages <= 5) {
          firstNumber = 1;
          lastNumber = Math.min(totalPages - 1, currentPage + 2);
        } else {
          if (currentPage === 1) {
            lastNumber = currentPage + 2;
          }
          if (currentPage >= totalPages - 3) {
            firstNumber = totalPages - 4;
          }
        }
      } else {
        if (currentPage <= 4) {
          lastNumber = 7;
        }

        if (currentPage >= totalPages - 5) {
          firstNumber = totalPages - 8;
        }
      }

      for (let i = firstNumber; i < currentPage; i++) {
        array.push(i);
      }

      if (currentPage != totalPages) {
        array.push(currentPage);
      }

      for (let i = currentPage + 1; i <= lastNumber; i++) {
        array.push(i);
      }

      if (lastNumber < totalPages - 1) {
        array.push('...');
      }

      if (lastNumber < totalPages) {
        array.push(totalPages);
      }

      return array;
    }
    return [];
  }

  const arrayNumbers = getArrayNumber();

  return (
    <div className={styles.container} ref={containerRef}>
      <button disabled={currentPage === 1} onClick={handlePrev} className={clsx(styles.arrow, styles.leftArrow)}>
        <BlackArrowRightIcon />
      </button>
      <ul className={styles.pages}>
        {arrayNumbers.map((item) => {
          if (typeof item === 'string') {
            return (
              <li className={styles.ellipsis} key={item}>
                {item}
              </li>
            );
          }
          return (
            <li
              onClick={() => {
                onClick(item);
              }}
              key={item}
              className={clsx(styles.page, {
                [styles.pageActive]: item === currentPage,
              })}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <button disabled={currentPage === totalPages} onClick={handleNext} className={styles.arrow}>
        <BlackArrowRightIcon />
      </button>
    </div>
  );
};
