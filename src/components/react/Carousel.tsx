import type { HTMLAttributes, ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  /** Accessible label for the carousel region */
  label?: string;
  /** Show dot indicators (default true) */
  showIndicators?: boolean;
  children?: ReactNode;
  className?: string;
}

export function Carousel({
  id: idProp,
  label = 'Carousel',
  showIndicators = true,
  children,
  className = '',
  ...rest
}: CarouselProps) {
  const id = idProp ?? `carousel-${Math.random().toString(36).slice(2, 9)}`;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll('.carousel__slide');
    setTotal(slides.length);
  }, [children]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || total === 0) return;
    const w = viewport.offsetWidth;
    track.style.transform = `translateX(${-index * w}px)`;
  }, [index, total]);

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(i, total - 1)));

  return (
    <div
      className={`carousel ${className}`.trim()}
      id={id}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-carousel
      {...rest}
    >
      <div className="carousel__viewport" ref={viewportRef} data-carousel-viewport>
        <div className="carousel__track" ref={trackRef} data-carousel-track>
          {children}
        </div>
      </div>

      <div className="carousel__controls">
        <button
          type="button"
          className="carousel__prev"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {showIndicators && total > 0 && (
          <div className="carousel__indicators" role="tablist" aria-label="Slide indicators">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Slide ${i + 1}`}
                aria-selected={i === index}
                className="carousel__indicator"
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          className="carousel__next"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
          disabled={index >= total - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
