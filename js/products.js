const cards = document.querySelector(".cards");
const seeMoreBtn = document.querySelector(".see__more-btn");
const loading = document.querySelector(".loading");

let count = 1;
let limitCount = 4;

const API_URL = "https://dummyjson.com";

async function fetchData(url) {
    let data = await fetch(`${url}/products?limit=${count * limitCount}`, {
        method: "GET",
    });
    data.json()
        .then((res) => createCards(res))
        .catch((err) => console.log(err))
        .finally(() => {
            loading.style.display = "none";
            seeMoreBtn.innerHTML = "See more";
            seeMoreBtn.removeAttribute("disabled");
        });
}

fetchData(API_URL);

function createCards(data) {
    console.log(data);
    let productCards = "";
    data.products.forEach((product) => {
        productCards += `
            <div class="card">
                <div class="card__img" >
                    <img class="product-img" data-id=${product.id} src="${product.images[0]}"  alt="" />
                </div>
                <div class="card__info">
                    <h3 class="card__title">${product.title}</h3>
                    <p class="card__description">${product.description}$</p>
                </div>
            </div>
        `;
    });
    cards.innerHTML = productCards;
}

cards.addEventListener("click", (e) => {
    if (e.target.className === "product-img") {
        let id = e.target.dataset.id;
        window.open(`./pages/product.html?id=${id}`, "_self");
    }
});

seeMoreBtn.addEventListener("click", () => {
    count++;
    fetchData(API_URL);
    seeMoreBtn.innerHTML = "Loading...";
    seeMoreBtn.setAttribute("disabled", true);
});

function createLoadingItem(count) {
    let loadingItem = "";
    for (let i = 0; i < count; i++) {
        loadingItem += `
            <div class="loading__item">
                <div class="loading__image bg__animation"></div>
                <div class="loading__title bg__animation"></div>
                <div class="loading__title bg__animation"></div>
            </div>
        `;
    }
    loading.innerHTML = loadingItem;
}

createLoadingItem(limitCount);
