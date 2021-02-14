
const createNav = (element, elemClass, parentElement) => {
    const elem = document.createElement(element);
    elem.classList.add(elemClass);
    const parentElem = document.querySelector(parentElement);
    parentElem.append(elem);
    return (element, elemClass) => {
        const childElem = document.createElement(element);
        childElem.classList.add(elemClass);
        elem.append(childElem);
    }
}

const menuItems = ["Action (A)", "Action (B)", "Animal 1", "Animal 2", "Clothes", "Emotions", "Activities", "Hobbies"];

const navigation = createNav("nav", "navigation", "#root");
const overlay = createNav("div", "overlay", "#root");
const addNavMenu = createNav("div", "navMenu", ".navigation");
const statsBtn = createNav("button", "statsBtn", ".navigation");

const menuLinks = ["a", "a", "a", "a", "a", "a", "a", "a"];

const addMenuItems = menuLinks.map(addNavMenu)

const setLinksPops = () => {
    const statsBtn = document.querySelector(".statsBtn");
    statsBtn.innerText = "Stats";
    const links = document.querySelectorAll(".navMenu > *")
    links.forEach((link, i) => {
        link.className = "menuItem";
        link.textContent = menuItems[i];
        link.setAttribute("href", "#");
    })
}
setLinksPops()




export {navigation, addNavMenu, createNav, menuItems};