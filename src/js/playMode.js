
import cards from "../../assets/cards.js";
import {menuItems} from "./navigation.js";

const setLocalStorage = (correctWords, errorWords, index) => {
    const failedWords = JSON.parse(localStorage.getItem("failedWords")) || [];
    failedWords.push({words: errorWords, category: menuItems[index], card: cards[index]})
    localStorage.setItem("failedWords", JSON.stringify(failedWords));

    const successWords = JSON.parse(localStorage.getItem("successWords")) || [];
    successWords.push({words: correctWords, category: menuItems[index], card: cards[index]});
    localStorage.setItem("successWords", JSON.stringify(successWords));
}

const setStatData = (correctWords, errorWords, index) => {
    const finalBoard = document.querySelector(".finalBoard");
    const result = document.createElement("div");
    result.classList.add("result--active");
    finalBoard.appendChild(result);
    let resultMessage = '';
    const audioFinal = new Audio();
    let finalClassName = "";
    audioFinal.src = "../../assets/audio/playStatus/complete.mp3";
    if (errorWords.length < 1) {
        audioFinal.src = "../../assets/audio/playStatus/complete.mp3";
        finalClassName = "finalBoard-complete--active";
        resultMessage = "You've passed the task with no mistakes";

    }else {
        audioFinal.src = "../../assets/audio/playStatus/notcomplete.mp3";
        finalClassName = "finalBoard-notcomplete--active";
        resultMessage = `You've completed ${errorWords.length} mistake(s)`;
    } 
    finalBoard.classList.add(finalClassName);
    setTimeout(() => {
        audioFinal.play()
        result.innerHTML = `
        <h1 class = "resultHeading">${resultMessage}</h1>
        `
    }, 500);

    setTimeout(() => {
        location.reload();
    }, 5500)

    setLocalStorage(correctWords, errorWords, index);
}


function playModeStatus(startGameBtn) {
    const root = document.querySelector("#root");
    const menuPlayMode = document.querySelector(".menuPlayMode");
    const outerAudio = document.querySelectorAll(".outerAudio");
    const innerAudio = document.querySelectorAll(".innerAudio");
    const repeatAudio = document.querySelector(".repeatAudio");
    const card = document.querySelectorAll(".card");
    const descPar = document.querySelectorAll(".descPar");
    const finalBoard = document.createElement("div");
    finalBoard.classList.add("finalBoard");
    root.appendChild(finalBoard);

    const repeatWordFunc = () => {
        startGameBtn.addEventListener("click", () => {
            if(startGameBtn.classList.contains("repeatWord--active")) {
                repeatAudio.play()
            }
        })
    }

    const countStaFunc = (i) => {
        const countStat = document.querySelectorAll(".countStat");
        const countCorrect = document.querySelectorAll(".countCorrect");
        const countError = document.querySelectorAll(".countError");
        countStat[i].classList.add("countStat--active");
        console.log(correctWords, errorWords)
        countCorrect[i].innerText = correctWords.length;
        countError[i].innerText = errorWords.length;
    }

    let audioObj = {};
    innerAudio.forEach((item, i) => audioObj[item.src] = descPar[i].textContent);
    let audioArr = Object.keys(audioObj);
    for(let i = 0; i < audioArr.length; i+=1) {
        let j = Math.floor(Math.random() * (i + 1));
        [audioArr[i], audioArr[j]] = [audioArr[j], audioArr[i]];
    }
    const correctWords = []
    const errorWords = []
    if(menuPlayMode.classList.contains("menuPlayMode--active")) {
        menuPlayMode.addEventListener("click", () => location.reload());
        outerAudio.forEach((item, i) => item.src = audioArr[i]);
        let newAudio = new Audio();
        const errorAudio = new Audio();
        const correctAudio = new Audio();
      
     
        errorAudio.src = "../../assets/audio/playStatus/error.mp3";
        correctAudio.src = "../../assets/audio/playStatus/correct.mp3";

        newAudio.src = audioArr[audioArr.length-1];
        newAudio.play();
        repeatAudio.src = audioArr[audioArr.length-1];
        repeatWordFunc();

            card.forEach((item, i) => {
                item.addEventListener("click", () => {
                    if(audioArr.length-1 < 1) {
                        // card[i].classList.add("card--opacity");
                        correctWords.push(audioObj[audioArr[0]])
                        countStaFunc(i)
                        card[i].style.pointerEvents = "none";
                        setTimeout(() => {
                            setStatData([...new Set(correctWords)], [...new Set(errorWords)], i);
                        }, 500)
                        return
                    }
                    if(audioArr[audioArr.length-1].includes(descPar[i].textContent))  {
                        correctWords.push(audioObj[audioArr[audioArr.length-1]]);
                        card[i].style.pointerEvents = "none";
                        audioArr.pop();
                        newAudio.src = audioArr[audioArr.length-1];
                        repeatAudio.src = audioArr[audioArr.length-1];
                        repeatWordFunc();
                        correctAudio.play();
                        countStaFunc(i)
                        setTimeout(() => newAudio.play(), 800)
                    }else {
                        errorWords.push(audioObj[audioArr[audioArr.length-1]])
                        card[i].style.pointerEvents = "auto";
                        card[i].classList.remove("card--opacity");
                        errorAudio.play();
                    }
                })
        })
    }
    
}

const switchPlayMode = () => {
    const card = document.querySelectorAll(".card");
    const imagePlace = document.querySelectorAll(".imagePlace");
    const cardDesc = document.querySelectorAll(".cardDesc");
    const startGameBtn = document.querySelector(".startGame");

    if (Array.from(card).every(item => item.classList.contains("wordCollection"))) return;
        startGameBtn.classList.add("startGame--active");
        card.forEach((item, i) => {
            cardDesc[i].classList.add("cardDesc--active");
            imagePlace[i].classList.add("imagePlace--fullHeight");
        })
    
        startGameBtn.addEventListener("click", () => {
            if(startGameBtn.classList.contains("startGame--active")) {
                playModeStatus(startGameBtn);
            }
            startGameBtn.classList.add("repeatWord--active");
            startGameBtn.classList.remove("startGame--active");
            startGameBtn.innerText = "Repeat the word";
        })
}
function turnToInitial() {
    const card = document.querySelectorAll(".card");
    const imagePlace = document.querySelectorAll(".imagePlace");
    const cardDesc = document.querySelectorAll(".cardDesc");
    const startGameBtn = document.querySelector(".startGame");
    card.forEach((item, i) => {
        cardDesc[i].classList.remove("cardDesc--active");
        imagePlace[i].classList.remove("imagePlace--fullHeight");
        item.classList.remove("card--open");
        item.style.pointerEvents = "auto";
    })
    startGameBtn.classList.remove("startGame--active");
    startGameBtn.classList.remove("repeatWord--active");
    startGameBtn.innerText = "Start the Game";
}
export {switchPlayMode, turnToInitial, playModeStatus};