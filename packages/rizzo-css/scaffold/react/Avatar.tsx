import type { HTMLAttributes } from 'react';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
}

export function Avatar({
  src,
  alt = '',
  name = '',
  initials: initialsProp = '',
  size = 'md',
  shape = 'circle',
  className = '',
  ...rest
}: AvatarProps) {
  const displayInitials = name ? getInitials(name) : initialsProp;
  const ariaLabel = alt || name || (displayInitials ? `Avatar: ${displayInitials}` : 'Avatar');
  const classes = ['avatar', `avatar--${size}`, `avatar--${shape}`, className]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <span className={classes} role="img" aria-label={ariaLabel} {...rest}>
      {src ? (
        <img src={src} alt={alt || name || ''} className="avatar__img" loading="lazy" />
      ) : (
        <span className="avatar__initials" aria-hidden="true">
          {displayInitials || '?'}
        </span>
      )}
    </span>
  );
}

export default Avatar;
