const key = "563492ad6f91700001000001d77435a4b11c4b04ae6a9607bba62259"
const url = "https://api.pexels.com/v1/curated?per_page=15"
const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const submitButton = document.querySelector(".submit-button")
let searchValue

async function curatedPhotos() {
  const fetchData = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: key,
    },
  })
  const data = await fetchData.json()
  data.photos.forEach((photo) => {
    console.log(photo)
    const galleryImg = document.createElement("div")
    galleryImg.classList.add("gallery-image")
    galleryImg.innerHTML = `<img src=${photo.src.large}> </img>
    <p>${photo.photographer}</p>
    `
    gallery.appendChild(galleryImg)
  })
}

curatedPhotos()
