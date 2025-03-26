// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const menu = document.querySelector('#mobile-menu');
  const menuLinks = document.querySelector('.navbar__menu');
  
  // Check if menu elements exist before adding event listeners
  if (menu && menuLinks) {
      menu.addEventListener('click', function() {
          menu.classList.toggle('is-active');
          menuLinks.classList.toggle('active');
      });
  }

  // Carousel Configuration
  const images = [
    'images/Hatta.jpg',
    'images/HUnza.jpg',
    'images/Fuego.jpg',
    'images/Tikal.jpg',
    'images/Dune.jpg',
    'images/Panama.jpg',
    'images/LUSK.jpg',
    'images/Petra.jpg',
    'images/Granada.jpg',
    'images/MA.jpg',
    'images/PK_border.jpg',
  ];
  
  const carouselContainer = document.querySelector('.carousel-container');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  
  // Check if carousel elements exist
  if (carouselContainer && indicatorsContainer) {
    let currentSlide = 0;
    
    // Create slides
    images.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      slide.style.backgroundImage = `url(${image})`;
      carouselContainer.appendChild(slide);
      
      // Create indicators
      const indicator = document.createElement('div');
      indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
      indicator.dataset.index = index;
      indicatorsContainer.appendChild(indicator);
    });
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Check if slides were created
    if (slides.length > 0) {
      // Add event listeners to buttons
      const prevButton = document.querySelector('.carousel-button.prev');
      const nextButton = document.querySelector('.carousel-button.next');
      
      if (prevButton && nextButton) {
        let autoSlideInterval;
        
        // Start auto-sliding
        function startAutoSlide() {
          // Clear any existing interval first to prevent duplicates
          stopAutoSlide();
          autoSlideInterval = setInterval(() => changeSlide('next'), 10000);
        }
        
        // Stop auto-sliding
        function stopAutoSlide() {
          clearInterval(autoSlideInterval);
        }
        
        prevButton.addEventListener('click', () => {
          changeSlide('prev');
          stopAutoSlide();
          startAutoSlide();
        });
        
        nextButton.addEventListener('click', () => {
          changeSlide('next');
          stopAutoSlide();
          startAutoSlide();
        });
        
        // Add event listeners to indicators
        indicators.forEach(indicator => {
          indicator.addEventListener('click', () => {
            const index = parseInt(indicator.dataset.index);
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
          });
        });
        
        // Function to change slide
        function changeSlide(direction) {
          slides[currentSlide].classList.remove('active');
          indicators[currentSlide].classList.remove('active');
          
          if (direction === 'next') {
            currentSlide = (currentSlide + 1) % slides.length;
          } else {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          }
          
          slides[currentSlide].classList.add('active');
          indicators[currentSlide].classList.add('active');
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
          slides[currentSlide].classList.remove('active');
          indicators[currentSlide].classList.remove('active');
          
          currentSlide = index;
          
          slides[currentSlide].classList.add('active');
          indicators[currentSlide].classList.add('active');
        }
        
        // Initialize auto-sliding (only once)
        startAutoSlide();
      }
    }
  }
});
