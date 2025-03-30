import * as React from 'react';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'tertiary';
  width?: number;
  height?: number;
};

const Icon: React.FC<IconProps> = ({
  className,
  color = 'primary',
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  const iconClassName = [styles.icon, styles[color], className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      {...props}
      className={iconClassName}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      {children}
    </svg>
  );
};

export default Icon;
