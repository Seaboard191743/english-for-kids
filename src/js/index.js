import {menuIconContainer, styleMenuBtn, setPlayMode} from "./createMenu.js";
import {createCards} from "./cardItem.js";
import {setProps} from "./updateCards.js";
import {navigation, addNavMenu} from "./navigation.js";
import {createStatsContainer, getLocalPlayItems, openCloseStats} from "./stats.js";

createCards();
setProps();
setPlayMode();
styleMenuBtn();
createStatsContainer();
if(localStorage.getItem("failedWords") && localStorage.getItem("successWords")) {
    getLocalPlayItems();
}
openCloseStats();
