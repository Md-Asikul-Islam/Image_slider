const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");
let currentSlide = 0;

// Fetch images from API
async function fetchImages() {
  try {
    const response = await fetch("https://picsum.photos/v2/list?page=1&limit=10");
    const images = await response.json();
    if (images?.length) renderImages(images);
  } catch (error) {
    console.log("Error fetching images:", error);
  }
}

// Render the image slider
function renderImages(images) {
  // Render slides
  slider.innerHTML = images.map((image, index) => imagesTemplate(image, index)).join("");
  
  // Render dots separately
  dotsContainer.innerHTML = images.map((_, index) => dotTemplate(index)).join("");
  
  initializeSlider();
}

// Template for individual image slide
function imagesTemplate({ id, download_url }, index) {
  return `
    <div class="slide" style="transform: translateX(${100 * index}%);">
      <img src="${download_url}" alt="${id}" />
    </div>
  `;
}

// Template for dots
function dotTemplate(index) {
  return `<span class="dot ${index === 0 ? "active" : ""}" data-slide="${index}"></span>`;
}

// Initialize slider functionality
function initializeSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  function updateSliderPosition() {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });

    // Update active dot
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  }

  prev?.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSliderPosition();
  });

  next?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSliderPosition();
  });

  // Dot click event
  dots.forEach(dot => {
    dot.addEventListener("click", (event) => {
      currentSlide = parseInt(event.target.dataset.slide);
      updateSliderPosition();
    });
  });

  updateSliderPosition();
}

// Fetch images and initialize
fetchImages();
