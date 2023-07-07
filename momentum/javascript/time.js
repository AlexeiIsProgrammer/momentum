import chooseLang from "https://rolling-scopes-school.github.io/alexeiisprogrammer-JSFEPRESCHOOL2022Q2/momentum/javascript/language.js";
import getWeather from "https://rolling-scopes-school.github.io/alexeiisprogrammer-JSFEPRESCHOOL2022Q2/momentum/javascript/weather.js";

export const state = {
    language: 'en',
    photoSource: 'github',
    time: '1',
    day: '1',
    greeting: '1',
    quoteSystem: '1',
    weather: '1',
    'audio-player': '1',
    toDoList: '1',
    taskArray:[],
}

/* Time and Date */

let randomNum;
let languageCounter = 0;
let taskCounter = 1;

let date = new Date();
let localTime = date.toLocaleTimeString();    
let hours = date.getHours();

let bodys = document.body;

const languageChanger = document.querySelector('.language');
const langArray = Object.keys(chooseLang);
let currentLanguage = chooseLang[langArray[languageCounter]];

const placeHolder = document.querySelector('.name');

languageChanger.addEventListener('click', changeLang);

const slidePrev = document.querySelector('.left-arrow');
const slideNext = document.querySelector('.right-arrow');

const time = document.querySelector('.time');
const day = document.querySelector('.day');

const greet = document.querySelector('.phrase');

const options = {month: 'long', day: 'numeric', timeZone: 'UTC'};

const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

getRandomNum();

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

function getRandomNum(){
    randomNum = Math.floor(Math.random() * (20 - 1) + 1);
    getImageChanger();
}

function getSlideNext() {
    randomNum === 20 ? randomNum = 1 : randomNum++;
    getImageChanger();
}

function getSlidePrev() {
    randomNum === 1 ? randomNum = 20 : randomNum--;
    getImageChanger();
}

function setBG(timeOfDay, bgNum) {
    const img = new Image();
    
    bgNum = bgNum < 10 ? `0${bgNum}` : bgNum;

    img.src = `https://raw.githubusercontent.com/AlexeiIsProgrammer/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;

    img.onload = () => {
        bodys.style.background = `url(${img.src}) no-repeat center center fixed`;
        bodys.style.backgroundSize = 'cover';
        bodys.style.transition = 'background-image 1s ease-in-out';  
        bodys.style.minHeight = '100%';
    };
    
}

function getImageChanger(){
    switch(state.photoSource){
        case "github":
            setBG(getTimeOfDay(hours), randomNum);
            break;
        case "unsplash":
            if(tagValue.value !== ""){
                getUnplashImage(tagValue.value);
            }
            else{
                getUnplashImage(getTimeOfDay(hours));
            }
            break;
        case "flickr":
            if(tagValue.value !== "")
            {
                getFlickrImage(tagValue.value, randomNum);
            }
            else{
                getFlickrImage(getTimeOfDay(hours), randomNum);
            }
            
            break;

    }
}

async function getUnplashImage(timeOfDay) {
    const img = new Image();
    const link = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay} nature&client_id=-88I6jo64NjMUH-fXi4DIiA0Oc_jxDU03C6s5nBBV1I`;
    const res = await fetch(link);
    const dataImage = await res.json();
    if(dataImage.urls.regular === undefined){
        alert("По запросу ничего не найдено!");
        return;
    }
    img.src = dataImage.urls.regular;
    
    img.onload = () => {
        bodys.style.background = `url(${img.src}) no-repeat center center fixed`;
        bodys.style.backgroundSize = 'cover';
        bodys.style.transition = 'background-image 1s ease-in-out'; 
        bodys.style.minHeight = '100%';   
    }
}

async function getFlickrImage(timeOfDay, numbOfPhoto) {
    const img = new Image();
    const link = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=52cd7d3ae0eb3953f338cec54b5519cf&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
    const res = await fetch(link);
    const dataImage = await res.json();
    img.src = dataImage.photos.photo[numbOfPhoto].url_l;
    if(dataImage.photos.photo[numbOfPhoto].url_l === undefined){
        alert("По запросу ничего не найдено!");
        return;
    }
    img.onload = () => {
        bodys.style.background = `url(${img.src}) no-repeat center center fixed`;
        bodys.style.backgroundSize = 'cover';
        bodys.style.transition = 'background-image 1s ease-in-out';   
        bodys.style.minHeight = '100%'; 
    }
}

function showGreeting(timeOfDay) {
    switch(timeOfDay){
        case `night`:
            timeOfDay = currentLanguage[3];
            break;
        case `morning`:
            timeOfDay = currentLanguage[0];
            break;
        case `afternoon`:
            timeOfDay = currentLanguage[1];
            break;
        case `evening`:
            timeOfDay = currentLanguage[2];
            break;
    }

    greet.textContent = timeOfDay;
}

function getTimeOfDay(hours){
    if(hours >= 0 && hours < 6){
        return `night`;
    } else if(hours >= 6 && hours < 12){
        return `morning`;
    } else if(hours >= 12 && hours < 18){
        return `afternoon`;
    } else {
        return 'evening';
    }
}

showTime();

function showTime(){
    date = new Date();
    localTime = date.toLocaleTimeString();
    hours = date.getHours();
    showGreeting(getTimeOfDay(hours));
    time.textContent = localTime;
    showDate(date);
    setTimeout(showTime, 100);
}

function showDate(date) {
    const localDate = date.toLocaleDateString(chooseLang[langArray[languageCounter]][6], options);
    day.textContent = localDate;
}

const nameSettings = document.querySelector('.nameSettings');
const playerSettings = document.querySelector('.playerSettings');
const weatherSettings = document.querySelector('.weatherSettings');
const quoteSettings = document.querySelector('.quoteSettings');
const greetingSettings = document.querySelector('.greetingSettings');
const dateSettings = document.querySelector('.dateSettings');
const toDoSettings = document.querySelector('.toDoSettings');
const timeSettings = document.querySelector('.timeSettings');

const metresPerSeconds = document.querySelector('.metresPerSeconds');

function changeLang() {
    languageCounter = languageCounter === 2 ? 0 : languageCounter + 1;

    state.language = langArray[languageCounter];
    languageChanger.textContent = langArray[languageCounter];
    currentLanguage = chooseLang[langArray[languageCounter]];
    placeHolder.placeholder = currentLanguage[4];
    writeArea.placeholder = currentLanguage[5];

    temperature.textContent = currentLanguage[7];
    humidity.textContent = currentLanguage[8];
    wind.textContent = currentLanguage[9];
    
    nameSettings.textContent = currentLanguage[17];
    playerSettings.textContent = currentLanguage[11];
    weatherSettings.textContent = currentLanguage[12];
    quoteSettings.textContent = currentLanguage[13];
    greetingSettings.textContent = currentLanguage[14];
    dateSettings.textContent = currentLanguage[15];
    timeSettings.textContent = currentLanguage[16];
    toDoSettings.textContent = currentLanguage[10];
    
    metresPerSeconds.textContent = currentLanguage[18];

    getWeather();
    callQuoteChanges(prevInd);
}

/* Quotes */

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

let prevInd;
let data;
getQuotes();

const refresher = document.querySelector('.refresh');
refresher.addEventListener('click', changeQuote);

async function getQuotes() {
    const quotes = 'https://rolling-scopes-school.github.io/alexeiisprogrammer-JSFEPRESCHOOL2022Q2/momentum/quotes.json';
    const res = await fetch(quotes);
    data = await res.json();
    
}

setTimeout(changeQuote, 100);

function changeQuote() {
    const randomNum = Math.floor(Math.random() * (data[langArray[languageCounter]].length));
    if(randomNum === prevInd)
        return changeQuote();
    else
        prevInd = randomNum;
    
    callQuoteChanges(randomNum);
}

function callQuoteChanges(quoteCount){
    quote.textContent = data[langArray[languageCounter]][quoteCount].quote;
    author.textContent = data[langArray[languageCounter]][quoteCount].author;
}

/* Settings */

const setting = document.querySelector('.settings');
const settingsMenu = document.querySelector('.settings-menu');

const radioButtons = document.getElementsByName('img');
const checkButtons = document.getElementsByName('vision');
const tagValue = document.querySelector('.tagValue');

let isHide = true;

checkButtons.forEach(el => el.addEventListener('click', checkCheckbutton));
radioButtons.forEach(el => el.addEventListener('click', checkRadiobutton));

setting.addEventListener('click', () => {
    if(isHide) {
        settingsMenu.classList.remove('menu-hide');
        settingsMenu.classList.add('menu-show');

        isHide = false;
    }
    else {
        settingsMenu.classList.remove('menu-show');
        settingsMenu.classList.add('menu-hide');

        isHide = true;
    }
    
});

export let checkLocalItems = () => {

    for(let i = 0; i< checkButtons.length; i++){
        const el = checkButtons[i];
        
        if(state[el.value] === '1') {
            el.checked = true;  
            setShow(el.value);
        }
        else if(state[el.value] === '0'){
            el.checked = false;
            setHide(el.value);
        }
    }

    radioButtons.forEach(el => {
        if(state.photoSource === el.value){
            if(el.value !== 'github'){
                tagValue.classList.remove('menu-hide');
                tagValue.classList.add('menu-show');
            }
            else{
                tagValue.classList.remove('menu-show');
                tagValue.classList.add('menu-hide');
            }
            el.checked = true;
        }
        else
            el.checked = false;
    });

    switch(state.language){
        case "en":
            languageCounter = 2;
            changeLang();
            break;
        case "ru":
            languageCounter = 0;
            changeLang();
            break;
        case "be":
            languageCounter = 1;
            changeLang();
            break; 
    }
}

function checkCheckbutton(){

        if(this.checked) {
            state[this.value] = '1';

            setShow(this.value);
        }
        else {
            state[this.value] = '0';

            setHide(this.value);
        }
}

function setHide(value){
    document.querySelector(`.${value}`).classList.remove('menu-show');
    document.querySelector(`.${value}`).classList.add('menu-hide');
}

function setShow(value){
    document.querySelector(`.${value}`).classList.remove('menu-hide');
    document.querySelector(`.${value}`).classList.add('menu-show');
}

function checkRadiobutton() {
    radioButtons.forEach(el => {
        if(el.checked){
            if(el.value !== 'github'){
                tagValue.classList.remove('menu-hide');
                tagValue.classList.add('menu-show');
            }
            else{
                tagValue.classList.remove('menu-show');
                tagValue.classList.add('menu-hide');
            }
            state.photoSource = el.value;
            return;
        }
            
    });
}

/* toDoList */

const list = document.querySelector('.toDoTasks');
const writeArea = document.querySelector('.inputTask');

writeArea.addEventListener('keydown', function(e) {
    if (e.keyCode === 13 && this.value != "" && this.value.length <= 20) {
        const labl = document.createElement('label');
        const checkBox = document.createElement('input');

        checkBox.type = 'checkbox';
        checkBox.checked = false;
        checkBox.id = `${taskCounter}`;

        labl.id = 'labl' + taskCounter;

        setEventToTask(checkBox);

        taskCounter++;
        labl.classList.add('unCompleteTask');
        labl.textContent = this.value;

        state.taskArray.push({
            id: checkBox.id,
            checker: checkBox.checked,
            descript: labl.textContent
        });

        labl.appendChild(checkBox);
        list.appendChild(labl);
        this.value = "";
    }
  });

export function loadTasks(){
        
    taskCounter = 0;

    for(let i = 0; i< state.taskArray.length; i++){
        const labl = document.createElement('label');
        const checkBox = document.createElement('input');

        checkBox.type = 'checkbox';
        checkBox.checked = state.taskArray[i].checker;
        checkBox.id = state.taskArray[i].id;

        setEventToTask(checkBox);

        labl.id = 'labl' + checkBox.id;

        taskCounter++;
        if(state.taskArray[i].checker){
            labl.classList.add('completeTask');
        } else {
            labl.classList.add('unCompleteTask');
        }
        
        labl.textContent = state.taskArray[i].descript;

        labl.appendChild(checkBox);
        list.appendChild(labl);
    }
        
}

function setEventToTask(checkBox){
    checkBox.addEventListener('click', function() {
        const idLabel = `labl${this.id}`;
        const labelChecker = document.getElementById(idLabel);

        state.taskArray[this.id].checker = this.checked;
        
        if(this.checked) {
            labelChecker.classList.remove('unCompleteTask');
            labelChecker.classList.add('completeTask');
        }
        else {  
            labelChecker.classList.remove('completeTask');
            labelChecker.classList.add('unCompleteTask');
        }
    });
}