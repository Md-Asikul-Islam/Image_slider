const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container")

async function fetchListOfImage() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=10",
      {
        method: "GET",
      }
    );
    const imageList = await response.json(); // Fixed the typo "reponse" to "response"
    console.log(imageList);

    if (imageList && imageList.length > 0) { // Fixed: changed condition from imageList > 0 to imageList.length > 0
      displayImages(imageList);
    }
  } catch (error) {
    console.log("Error fetching images:", error); // Enhanced error message
  }
}

function displayImages(getImageList) {
  slider.innerHTML = getImageList.map(
    (item) => `
    <div class="slide">
      <img src="${item.download_url}" alt="Image by ${item.author}" class="slider-image" />
    </div>
    `
  ).join(" "); // Fixed: Added .join("") to properly join the elements into a single string

 dotsContainer.innerHTML = getImageList.map(
    (item, index) => `
    <span class="dot ${index === 0 ? "active" : ""}" data-slide=${index}></span>
    `
  ).join(" ");

}

fetchListOfImage();
