import { Carousel } from './Carousel';

/** Wrapper for doc demo and Storybook: Carousel with default slides. */
export function CarouselDemo() {
  return (
    <Carousel label="Slides">
      <div className="carousel__slide">
        <h4 style={{ marginTop: 0 }}>Slide 1</h4>
        <p>First slide content. Use previous/next or the indicators to navigate.</p>
      </div>
      <div className="carousel__slide">
        <h4 style={{ marginTop: 0 }}>Slide 2</h4>
        <p>Second slide content.</p>
      </div>
      <div className="carousel__slide">
        <h4 style={{ marginTop: 0 }}>Slide 3</h4>
        <p>Third slide content.</p>
      </div>
    </Carousel>
  );
}
