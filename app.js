const key = "563492ad6f91700001000001d77435a4b11c4b04ae6a9607bba62259"
const getUrl = "https://api.pexels.com/v1/curated?per_page=15"
const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")
let searchValue

//Event Listeners
searchInput.addEventListener("input", updateInput)

form.addEventListener("submit", (e) => {
  e.preventDefault()
  searchPhotos(searchValue)
})

function updateInput(e) {
  console.log(e.target.value)
  searchValue = e.target.value
}

async function curatedPhotos() {
  const fetchData = await fetch(getUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: key,
    },
  })
  const data = await fetchData.json()
  data.photos.forEach((photo) => {
    // console.log(photo)
    const galleryImg = document.createElement("div")
    galleryImg.classList.add("gallery-image")
    galleryImg.innerHTML = `<img src=${photo.src.large}> </img>
    <p>${photo.photographer}</p>
    `
    gallery.appendChild(galleryImg)
  })
}

async function searchPhotos(query) {
  const fetchData = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: key,
      },
    }
  )
  const data = await fetchData.json()
  data.photos.forEach((photo) => {
    // console.log(photo)
    const galleryImg = document.createElement("div")
    galleryImg.classList.add("gallery-image")
    galleryImg.innerHTML = `<img src=${photo.src.large}> </img>
    <p>${photo.photographer}</p>
    `
    gallery.appendChild(galleryImg)
  })
}

curatedPhotos()
