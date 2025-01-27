const slider = document.querySelector(".slider");

async function fetchListOfImage() {
  try {
    const reponse = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=10",
      {
        method: "GET",
      }
    );
    const imageList = await reponse.json();
    console.log(imageList);
  } catch (error) {
    console.log(error);
  }
}

fetchListOfImage();
