import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';

function TestimonialsCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToIndex = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Animation classes based on direction
  const slideClasses = `
    transition-all duration-500 ease-in-out absolute w-full
    ${isAnimating && direction === 'next' ? 'animate-[slideOutLeft_0.5s_forwards]' : ''}
    ${isAnimating && direction === 'prev' ? 'animate-[slideOutRight_0.5s_forwards]' : ''}
  `;

  const nextSlideClasses = `
    transition-all duration-500 ease-in-out absolute w-full
    ${isAnimating && direction === 'next' ? 'animate-[slideInRight_0.5s_forwards]' : 'opacity-0 translate-x-full'}
  `;

  const prevSlideClasses = `
    transition-all duration-500 ease-in-out absolute w-full
    ${isAnimating && direction === 'prev' ? 'animate-[slideInLeft_0.5s_forwards]' : 'opacity-0 -translate-x-full'}
  `;

  const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
  const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="relative h-80 overflow-hidden">
        {/* Current testimonial */}
        <div className={slideClasses}>
          <TestimonialCard testimonial={testimonials[currentIndex]} />
        </div>

        {/* Next testimonial (for animation) */}
        <div className={nextSlideClasses}>
          <TestimonialCard testimonial={testimonials[nextIndex]} />
        </div>

        {/* Previous testimonial (for animation) */}
        <div className={prevSlideClasses}>
          <TestimonialCard testimonial={testimonials[prevIndex]} />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={goToPrevious}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-primary dark:text-blue-400"
          aria-label="Previous testimonial"
        >
          <HiChevronLeft size={24} />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2 items-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-primary w-5' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-primary dark:text-blue-400"
          aria-label="Next testimonial"
        >
          <HiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-custom p-8 h-full flex flex-col">
      {/* Stars */}
      <div className="flex text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <HiStar 
            key={i} 
            size={20} 
            className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} 
          />
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">
        "{testimonial.quote}"
      </blockquote>
      
      {/* Author info */}
      <div className="flex items-center mt-auto">
        {testimonial.avatar && (
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCarousel; 