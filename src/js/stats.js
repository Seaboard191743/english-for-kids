import {createElement} from "./cardItem.js";
import cards from "../../assets/cards.js";
import {menuItems} from "./navigation.js";
let selectedButton;


const openCloseStats = () => {
    const statsBtn = document.querySelector(".statsBtn");
    const statsContainer = document.querySelector(".statsContainer");
    const closeLink = document.querySelector(".closeLink");
    const clearStats = document.querySelector(".clearStats");

    statsBtn.addEventListener("click", () => {
        setTimeout(() => {
            statsContainer.classList.add("statsContainer--active");
        }, 500);
    })
    closeLink.addEventListener("click", () => {
        statsContainer.classList.remove("statsContainer--active");
    })
    clearStats.addEventListener("click", () => {
        statsContainer.classList.remove("statsContainer--active");
        localStorage.clear();
        location.reload();
    })
}

const createObjFromStorage = (elem) => {
    return elem.reduce((p, v) => {
        p[v] = (p[v] || 0) + 1;
        return p
    }, {});
}
const getLocalPlayItems = () => {
    const successBlock = document.querySelectorAll(".successBlock");
    const failBlock = document.querySelectorAll(".failBlock");
    const words = document.querySelectorAll(".words");
    const prcntBlock = document.querySelectorAll(".prcntBlock");
    const failedData = JSON.parse(localStorage.getItem("failedWords"));
    const succeedData = JSON.parse(localStorage.getItem("successWords"));
    const errorWordsArray = failedData.map(item => item.words).flat();
    const successWordsArray =  succeedData.map(item => item.words).flat();
    failBlock.forEach((item, i) => {
        if(createObjFromStorage(errorWordsArray).hasOwnProperty(words[i].textContent)) {
            item.textContent = `${createObjFromStorage(errorWordsArray)[words[i].textContent]} time(s)`;
        }
        if(createObjFromStorage(successWordsArray).hasOwnProperty(words[i].textContent)) {
            successBlock[i].textContent = `${createObjFromStorage(successWordsArray)[words[i].textContent]} time(s)`;
        }
        prcntBlock[i].innerText = Math.floor(100 / (parseInt(successBlock[i].textContent) + parseInt(failBlock[i].textContent)) 
                                            * parseInt(successBlock[i].textContent)) || 0;
    })
}

const showCategoryBtnStyle = (target, category) => {
    category.classList.remove("category--active");
    if(selectedButton) {
        selectedButton.classList.remove("category--active");
    }
    selectedButton = target;
    selectedButton.classList.add("category--active");
}
const styleCategoryBtn = (categoryDiv) => {
    const category = document.querySelector(".category");
    category.classList.add("category--active");
    categoryDiv.addEventListener("click", e => {
        const target = e.target.closest(".category");
        if (!target) return;
        showCategoryBtnStyle(target, category)
    })
}

const hideWords = () => {
    const categoryWords = document.querySelectorAll(".categoryWords");
    const successCat = document.querySelectorAll(".successCat");
    const failCat = document.querySelectorAll(".failCat");
    const categoryTranslate = document.querySelectorAll(".categoryTranslate");
    const prcntCat = document.querySelectorAll(".prcntCat");
    categoryWords.forEach((item, i) => {
        item.classList.remove("categoryWords--active");
        successCat[i].classList.remove("successCat--active");
        failCat[i].classList.remove("failCat--active");
        categoryTranslate[i].classList.remove("categoryTranslate--active");
        prcntCat[i].classList.remove("prcntCat--active");
    })

}
const showWords = (i) => {
    const categoryWords = document.querySelectorAll(".categoryWords");
    const successCat = document.querySelectorAll(".successCat");
    const failCat = document.querySelectorAll(".failCat");
    const categoryTranslate = document.querySelectorAll(".categoryTranslate");
    const prcntCat = document.querySelectorAll(".prcntCat");
    categoryWords[i].classList.add("categoryWords--active");
    categoryTranslate[i].classList.add("categoryTranslate--active");
    successCat[i].classList.add("successCat--active");
    failCat[i].classList.add("failCat--active");
    prcntCat[i].classList.add("prcntCat--active");
}

const displayWordsSwitcher = () => {
    const category = document.querySelectorAll(".category");
    category.forEach((item, i) => {
        item.addEventListener("click", () => {
            hideWords();
            showWords(i);
        })
    })
}

const createStatsContainer = () => {
    const root = document.querySelector("#root");
    const statsContainer = createElement("div", "statsContainer");
    const closeLink = createElement("div", "closeLink");
    closeLink.innerText = "close";
    const clearStats = createElement("div", "clearStats");
    clearStats.innerText = "clear stats";
    const statsHeading = createElement("h1", "statsHeading");
    const innerStatsContainer = createElement("div", "innerStatsContainer");
    const stats = createElement("div", "stats");
    const categoryDiv = createElement("div", "categoryDiv");
    const wordsDiv = createElement("div", "wordsDiv");
    const wordsDivTranslate = createElement("div", "wordsDivTranslate");
    const successful = createElement("div", "successful");
    const failure = createElement("div", "failure");
    const prcnt = createElement("div", "prcnt");
    stats.append(wordsDiv, wordsDivTranslate, successful, failure, prcnt);
    statsHeading.innerText = "Your Practice Stats";
    cards.forEach((item, i) => {
        const category = createElement("div", "category");
        const categoryContent = document.createElement("p");
        categoryContent.classList.add("categoryContent");
        const categoryWords = createElement("div", "categoryWords");
        const categoryTranslate = createElement("div", "categoryTranslate");
        const successCat = createElement("div", "successCat");
        const prcntCat = createElement("div", "prcntCat");
        prcnt.append(prcntCat);
        successful.append(successCat);
        const failCat = createElement("div", "failCat");
        failure.append(failCat);
        
        cards.forEach((_, j) => {
            const words = createElement("div", "words");
            const wordsTranslate = createElement("div", "wordsTranslate");
            words.innerText = `${cards[i][j].word}`;
            wordsTranslate.innerText = `${cards[i][j].translation}`;
            categoryWords.append(words);
            categoryTranslate.append(wordsTranslate)
            const successBlock = createElement("p", "successBlock");
            const prcntBlock = createElement("p", "prcntBlock");
            prcntBlock.innerText = "0";
            successBlock.innerText = "0 time(s)";
            const failBlock = createElement("p", "failBlock");
            failBlock.innerText = "0 time(s)";
            successCat.append(successBlock);
            failCat.append(failBlock);
            prcntCat.append(prcntBlock);
        })
        category.append(categoryContent)
        categoryContent.innerText = menuItems[i]
        categoryDiv.append(category);
        wordsDiv.append(categoryWords);
        wordsDivTranslate.append(categoryTranslate);
        
    })

    const categoryDivHeading = createElement("h3", "categoryDivHeading");
    const wordsDivHeading = createElement("h3", "wordsDivHeading");
    const wordsDivTrHeading = createElement("h4", "wordsDivTrHeading")
    const successfulHeading = createElement("h3", "successfulHeading");
    const failureHeading = createElement("h4", "failureHeading");
    const prcntHeading = createElement("h4", "prcntHeading");
    prcntHeading.innerText = "Prcnt. (%)"
    successfulHeading.innerText = "Successful";
    failureHeading.innerText = "Failure";
    categoryDivHeading.innerText = "Category";
    wordsDivHeading.innerText = "Word";
    wordsDivTrHeading.innerText = "Translation";
    categoryDiv.prepend(categoryDivHeading);
    wordsDiv.prepend(wordsDivHeading);
    wordsDivTranslate.prepend(wordsDivTrHeading);
    successful.prepend(successfulHeading);
    failure.prepend(failureHeading);
    prcnt.prepend(prcntHeading);
    root.append(statsContainer);
    statsContainer.append(statsHeading, innerStatsContainer, clearStats, closeLink);
    innerStatsContainer.append(categoryDiv, stats)

    hideWords();
    showWords(0);
    displayWordsSwitcher();
    styleCategoryBtn(categoryDiv);
}

export {createStatsContainer, getLocalPlayItems, showWords, openCloseStats};