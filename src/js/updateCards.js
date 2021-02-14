import cards from "../../assets/cards.js";
import {createElement} from "./cardItem.js";
import {switchPlayMode} from "./playMode.js"

const collectionSet = {
    collection: ["Action (A)", "Action (B)", "Animal 1", "Animal 2", "Clothes", "Emotions", "Activities", "Hobbies"],
    data: cards
}

const translateWord = (index) => {
    const cardSet = document.querySelectorAll(".card");
    const btns = document.querySelectorAll(".turnAroundBtn");
    const descPar = document.querySelectorAll(".descPar");
    const imagePlace = document.querySelectorAll(".imagePlace");
    btns.forEach((item, i) => {
        item.addEventListener("click", () => {
            cardSet[i].classList.add("card--active");
            imagePlace[i].classList.add("imagePlace--active");
            descPar[i].classList.add("descPar--active");
            descPar[i].textContent = collectionSet.data[index][i].translation;
            item.style.display = "none";
        })
        cardSet[i].addEventListener("mouseleave", () => {
            cardSet[i].classList.remove("card--active");
            imagePlace[i].classList.remove("imagePlace--active");
            descPar[i].classList.remove("descPar--active")
            descPar[i].textContent = collectionSet.data[index][i].word;
            btns[i].style.display = "block";
    })
    })
}


const handleCard = (imagePlace, index, cardArr) => {
    const descPar = document.querySelectorAll(".descPar")
    const cardDesc = document.querySelectorAll(".cardDesc");
    const outerAudio = document.querySelectorAll(".outerAudio");
    const innerAudio = document.querySelectorAll(".innerAudio");
    const btns = document.querySelectorAll(".turnAroundBtn");
    const menuPlayMode = document.querySelector(".menuPlayMode");
    imagePlace.forEach((item, i) => {
       btns[i].style.display = "block";
       cardArr[i].classList.remove("wordCollection");
        item.style.backgroundImage = `url(${collectionSet.data[index][i].image})`; 
        descPar[i].textContent = collectionSet.data[index][i].word;
        if(!menuPlayMode.classList.contains("menuPlayMode--active")) {
            innerAudio[i].src = collectionSet.data[index][i].audioSrc;
        }

    })
    const wordsArr = [];
    cardArr.forEach((item, i) => {    
        item.addEventListener("click", (e) => {
            if(!e.target.matches(".turnAroundBtn") && !menuPlayMode.classList.contains("menuPlayMode--active")) {
                innerAudio[i].play();
            }
            wordsArr.push(descPar[i].innerText);
        })
    })
    translateWord(index);    
}

const setProps = () => {
    const cardArr = document.querySelectorAll(".card");
    const imagePlace = document.querySelectorAll(".imagePlace");
    const cardDesc = document.querySelectorAll(".cardDesc");
    const menuItems = document.querySelectorAll(".menuItem");
    const menuPlayMode = document.querySelector(".menuPlayMode");
    const root = document.querySelector("#root")
    const container = document.querySelector(".container");

    cardArr.forEach((card, i) => {
        card.classList.add("wordCollection");
        const countStat = document.createElement("div");
        const countCorrect = document.createElement("div");
        const countError = document.createElement("div");
        const countSeparator = document.createElement("div");
        countSeparator.classList.add("countSeparator");
        countSeparator.innerText = ":";
        countCorrect.classList.add("countCorrect");
        countError.classList.add("countError");
        countStat.append(countCorrect, countSeparator, countError);
        countStat.classList.add("countStat");
        imagePlace[i].style.backgroundImage = `url(${collectionSet.data[i][i].image})`;
        const descPar = document.createElement("p");
        const outerAudio = document.createElement("audio");
        outerAudio.classList.add("outerAudio");
        const innerAudio = document.createElement("audio");
        innerAudio.classList.add("innerAudio");
        innerAudio.setAttribute("src", "");
        outerAudio.setAttribute("data-number", i);
        const turnAroundBtn = document.createElement("button");
        turnAroundBtn.classList.add("turnAroundBtn");
        turnAroundBtn.textContent = "Перевод";
        cardDesc[i].append(turnAroundBtn);
        card.append(countStat, innerAudio);
        root.append(outerAudio);
        descPar.classList.add("descPar");
        cardDesc[i].append(descPar);
            card.addEventListener("click", () => {
                if(card.classList.contains("wordCollection")) {
                    handleCard(imagePlace, i, cardArr);
                }
            })
            menuItems[i].addEventListener("click", () => {
                handleCard(imagePlace, i, cardArr);
            })
        
    })
    const descPar = document.querySelectorAll(".descPar");
    const btns = document.querySelectorAll(".turnAroundBtn");
    btns.forEach(item => item.style.display = "none")
    descPar.forEach((item, i) => item.textContent = collectionSet.collection[i])
    const startGameBtn = document.createElement("button");
    startGameBtn.classList.add("startGame");
    startGameBtn.innerText = "Start the Game";
    container.append(startGameBtn);

    const repeatAudio = document.createElement("audio");
    repeatAudio.classList.add("repeatAudio");
    repeatAudio.setAttribute("src", "");
    root.appendChild(repeatAudio);
}




export {setProps};