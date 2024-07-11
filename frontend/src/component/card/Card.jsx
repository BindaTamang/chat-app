import React, { useState } from 'react';
import './CardCarousel.scss';

const CardCarousel = () => {
  const cards = [
    'Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6', 
    'Card 7', 'Card 8', 'Card 9', 'Card 10', 'Card 11', 'Card 12'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 3 < cards.length) {
      setCurrentIndex(currentIndex + 3);
    } else {
      setCurrentIndex(cards.length - 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div>
        <div class="scroll-container">
        <div class="scroll-item">Item 1</div>
        <div class="scroll-item">Item 2</div>
        <div class="scroll-item">Item 3</div>
        <div class="scroll-item">Item 4</div>
        <div class="scroll-item">Item 5</div>
        <div class="scroll-item">Item 6</div>
        <div class="scroll-item">Item 1</div>
        <div class="scroll-item">Item 2</div>
        <div class="scroll-item">Item 3</div>
        <div class="scroll-item">Item 4</div>
        <div class="scroll-item">Item 5</div>
        <div class="scroll-item">Item 6</div>
        </div>
        <div className="card-carousel">
      <button className="arrow left" onClick={handlePrev} disabled={currentIndex === 0}>
        &lt;
      </button>
      <div className="cards-container">
        <div className="cards" style={{ transform: `translateX(-${(currentIndex / cards.length) * 100}%)` }}>
          {cards.map((card, index) => (
            <div key={index} className="card">
              {card}
            </div>
          ))}
        </div>
      </div>
      <button className="arrow right" onClick={handleNext} disabled={currentIndex + 3 >= cards.length}>
        &gt;
      </button>
    </div>
    </div>
   
  );
};

export default CardCarousel;