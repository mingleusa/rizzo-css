import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';

export interface BackToTopProps extends HTMLAttributes<HTMLDivElement> {
  threshold?: number;
  label?: string;
  className?: string;
}

export function BackToTop({
  threshold = 400,
  label = 'Back to top',
  className = '',
  ...rest
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  const wrapperClass = ['back-to-top', className].filter(Boolean).join(' ').trim();

  return (
    <div
      className={wrapperClass}
      data-back-to-top
      data-visible={visible ? 'true' : 'false'}
      aria-hidden={visible ? 'false' : 'true'}
      {...rest}
    >
      <button type="button" className="back-to-top__btn" aria-label={label} onClick={scrollToTop}>
        <span className="back-to-top__icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default BackToTop;
