const key = "563492ad6f91700001000001d77435a4b11c4b04ae6a9607bba62259"
const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")
let searchValue
const more = document.querySelector(".more")
let page = 1
let fetchLink
let currentSearch

//Event Listeners
searchInput.addEventListener("input", updateInput)

form.addEventListener("submit", (e) => {
  e.preventDefault()
  currentSearch = searchValue
  searchPhotos(searchValue)
})

more.addEventListener("click", loadMore)

function updateInput(e) {
  console.log(e.target.value)
  searchValue = e.target.value
}

async function fetchApi(url) {
  const fetchData = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: key,
    },
  })
  const data = await fetchData.json()
  return data
}

function generateImages(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div")
    galleryImg.classList.add("gallery-image")
    galleryImg.innerHTML = `
    <div class="gallery-info">
      <p>${photo.photographer}</p>
      <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large}> </img>
    `
    gallery.appendChild(galleryImg)
  })
}

async function curatedPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?page=1&per_page=15`
  const data = await fetchApi(fetchLink)
  generateImages(data)
}

async function searchPhotos(query) {
  clear()
  fetchLink = `https://api.pexels.com/v1/search?page=1&query=${query}&per_page=15`
  const data = await fetchApi(fetchLink)
  generateImages(data)
}

function clear() {
  gallery.innerHTML = ""
  searchInput.value = ""
}

async function loadMore() {
  page++
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?page=${page}&query=${currentSearch}&per_page=15`
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`
  }
  const data = await fetchApi(fetchLink)
  generateImages(data)
}

curatedPhotos()
