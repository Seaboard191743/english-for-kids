
import cards from "../../assets/cards.js";

const cardState = {
    data: cards
}

const createElement = (selector, classname) => {
    const elem = document.createElement(selector);
    elem.classList.add(classname);
    return elem;
}

const createContainer = () => {
    const root = document.querySelector("#root");
    const container = createElement("div", "container");
    const footer = createElement("footer", "footer");
    const navBrand = createElement("div", "navBrand");
    const logo = createElement("img", "logo");
    logo.setAttribute("src", "../../assets/logo.svg");
    logo.setAttribute("alt", "logo");
    const logoLink = createElement("a", "logoLink");
    logoLink.setAttribute("href", "https://rs.school/js/");
    logoLink.setAttribute("target", "_blank");
    logoLink.append(logo);
    navBrand.append(logoLink);
    const ghCont = createElement("div", "ghContainer");
    const ghLink = createElement("a", "ghLink");
    ghLink.setAttribute("href", "https://github.com/Seaboard191743");
    ghLink.setAttribute("target", "_blank");
    ghLink.innerText = "www.github.com/Seaboard191743"
    const year = createElement("div", "year");
    year.innerText = "published in 2020"
    ghCont.append(ghLink)
    footer.append(navBrand, ghCont, year);
    root.append(container, footer);
}

const createContentField = () => {
    createContainer();
    const container = document.querySelector(".container");
    container.append(createElement("div", "contentField"));
}

const createCardContainer = () => {
    createContentField();
    const contentField = document.querySelector(".contentField");
    cardState.data.forEach(item => {
        contentField.append(createElement("div", "card"));
    })
}
const createCards = () => {
    createCardContainer();
    const cards = document.querySelectorAll(".card");
    cards.forEach(item => {
        item.append(createElement("div", "imagePlace"), createElement("div", "cardDesc"))
    })
}

export {createCards, createElement};


