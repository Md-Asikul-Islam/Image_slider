const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");

// Fetch and display the images
async function fetchListOfImage() {
  try {
    const response = await fetch("https://picsum.photos/v2/list?page=1&limit=10");
    const imageList = await response.json();

    if (imageList && imageList.length > 0) {
      displayImages(imageList);
      initializeSlider();
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function displayImages(imageList) {
  slider.innerHTML = imageList
    .map(
      (item) => `
      <div class="slide">
        <img src="${item.download_url}" alt="Image by ${item.author}" />
      </div>
    `
    )
    .join("");

  dotsContainer.innerHTML = imageList
    .map(
      (_, index) => `
      <span class="dot ${index === 0 ? "active" : ""}" data-slide="${index}"></span>
    `
    )
    .join("");
}

// Initialize slider functionality
function initializeSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  // Update active slide and dot
  function updateSlider(index) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // Navigate to the next slide
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider(currentSlide);
  });

  // Navigate to the previous slide
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider(currentSlide);
  });

  // Navigate using dots
  dotsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("dot")) {
      currentSlide = parseInt(event.target.dataset.slide, 10);
      updateSlider(currentSlide);
    }
  });

  // Initialize the first slide
  updateSlider(currentSlide);
}

// Fetch images and initialize the slider
fetchListOfImage();
