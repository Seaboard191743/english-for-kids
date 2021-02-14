import {createNav} from "./navigation.js";
import {turnToInitial, switchPlayMode, playModeStatus} from "./playMode.js"

const menuIconContainer = createNav("div", "menuIconContainer", "#root");
const menuHamburger = menuIconContainer("div", "menuHamburger");
const menuPlayMode = menuIconContainer("div", "menuPlayMode");
const playSwitcher = createNav("div", "playSwitcher", ".menuPlayMode");
const practice = createNav("p", "practice", ".menuPlayMode");

const setMenuElems = () => {
    const menuIconInner = Array.from({length: 3}, (item) => item = " div");
    const iconElemsCont = document.querySelector(".menuHamburger");
    const practice = document.querySelector(".practice");
    menuIconInner.forEach(item => {
        const menuIconElems = document.createElement("div");
        menuIconElems.classList.add("menuIconElem");
        iconElemsCont.append(menuIconElems);
    })
    practice.innerText = "Train"
}
setMenuElems();

const switchOfCardOpacity = () => {
    const card = document.querySelectorAll(".card");
    card.forEach(item => item.classList.remove("card--opacity"));
}

const styleMenuBtn = () => {
    const menuIconClasses = ["menuIconElem--first", "menuIconElem--second", "menuIconElem--third"];
    const navigation = document.querySelector(".navigation");
    const container = document.querySelector(".container");
    const menuItems = document.querySelectorAll(".menuItem")
    const menuIconContainer = document.querySelector(".menuIconContainer");
    const menu = document.querySelector(".menuHamburger");
    const menuElems = document.querySelectorAll(".menuIconElem");
    const overlay = document.querySelector(".overlay");
    const menuPlayMode = document.querySelector(".menuPlayMode");
    const playSwitcher = document.querySelector(".playSwitcher");
    const practice = document.querySelector(".practice");
    const footer = document.querySelector(".footer");
 
    menu.addEventListener("click", () => {
        menu.classList.toggle("menuHamburger--active");
        navigation.classList.toggle("navigation--active");
        container.classList.toggle("container--active");
        menuIconContainer.classList.toggle("menuIconContainer--active");
        overlay.classList.toggle("overlay--active");
        menuElems.forEach((elem, i) => elem.classList.toggle(menuIconClasses[i]));
        menuItems.forEach(menuItem => menuItem.classList.toggle("menuItem--active"));
        menuPlayMode.classList.remove("menuPlayMode--active");
        playSwitcher.classList.remove("playSwitcher--active");
        footer.classList.toggle("footer--notActive");
        menuPlayMode.classList.toggle("menuPlayMode--display");
        practice.innerText = "Training";

        switchOfCardOpacity();
        turnToInitial();
    })
    document.body.addEventListener("click", e => {
        if(e.target.matches(".menuItem") || e.target.matches(".overlay") 
            || e.target.matches(".menuIconContainer") || e.target.matches(".statsBtn")) {
            menu.classList.remove("menuHamburger--active");
            navigation.classList.remove("navigation--active");
            container.classList.remove("container--active");
            menuIconContainer.classList.remove("menuIconContainer--active");
            overlay.classList.remove("overlay--active");
            menuElems.forEach((elem, i) => elem.classList.remove(menuIconClasses[i]));
            menuItems.forEach(menuItem => menuItem.classList.remove("menuItem--active"));
            menuPlayMode.classList.remove("menuPlayMode--display");
            footer.classList.remove("footer--notActive");
        }
    })
}

const setPlayMode = () => {
    const menuPlayMode = document.querySelector(".menuPlayMode");
    const playSwitcher = document.querySelector(".playSwitcher");
    const practice = document.querySelector(".practice");
    const startGameBtn = document.querySelector(".startGame");

    menuPlayMode.addEventListener("click", () => {
        switchOfCardOpacity();
        menuPlayMode.classList.toggle("menuPlayMode--active");
        playSwitcher.classList.toggle("playSwitcher--active");  
        if(menuPlayMode.classList.contains("menuPlayMode--active")) {
            practice.innerText = "Play";
            switchPlayMode();
        }else {
            practice.innerText = "Training";
            turnToInitial();
        }
    })
}

export {menuIconContainer, switchOfCardOpacity, styleMenuBtn, setPlayMode};