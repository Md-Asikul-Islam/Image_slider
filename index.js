const slider = document.querySelector(".slider");


async function fetchListOfImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=10",
      {
        method: "GET",
      }
    );

    const imagesList = await response.json();
    console.log(imagesList)
    if (imagesList && imagesList.length > 0) displayImages(imagesList);
  } catch (error) {
    console.log(error);
  }
}

function displayImages(getImagesList) {
  slider.innerHTML = getImagesList
    .map(
      (item) => `
    <div class="slide">
     <img src= ${item.download_url} alt=${item.id} />
    </div>
    `
    )
    .join(" ");
}

fetchListOfImages();

// slider functionality begins

setTimeout(() => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;



  function changeCurrentSlide(currentSlide) {
    slides.forEach(
      (slideItem, index) =>
        (slideItem.style.transform = `translateX(${
          100 * (index - currentSlide)
        }%)`)
    );
  }

  changeCurrentSlide(currentSlide)

  nextBtn.addEventListener("click", () => {
    currentSlide++;

    if (slides.length - 1 < currentSlide) {
      currentSlide = 0;
    }

    changeCurrentSlide(currentSlide);
    
  });

  prevBtn.addEventListener("click", () => {
    currentSlide--;

    if (0 > currentSlide) {
      currentSlide = slides.length - 1;
    }

    changeCurrentSlide(currentSlide);
    
  });

  dotsContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains('dot')){
        const currentSlide = event.target.dataset.slide
        changeCurrentSlide(currentSlide)
        
    }
  });
}, 1000);