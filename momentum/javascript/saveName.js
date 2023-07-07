import {state, checkLocalItems, loadTasks} from "https://rolling-scopes-school.github.io/alexeiisprogrammer-JSFEPRESCHOOL2022Q2/momentum/javascript/time.js";

function setLocalStorage() {
    localStorage.setItem('person', document.querySelector('.name').value);

    localStorage.setItem('language', state.language);
    localStorage.setItem('image', state.photoSource);

    localStorage.setItem('time', state.time);
    localStorage.setItem('day', state.day);
    localStorage.setItem('greeting', state.greeting);
    localStorage.setItem('quoteSystem', state.quoteSystem);
    localStorage.setItem('weather', state.weather);
    localStorage.setItem('audio-player', state["audio-player"]);
    localStorage.setItem('toDoList', state.toDoList);

    localStorage.setItem('tasks', JSON.stringify(state.taskArray)); 

    //localStorage.clear();
}

function getLocalStorage(){
    if(localStorage.getItem('person')){
        document.querySelector('.name').value = localStorage.getItem('person');
    }
    if(localStorage.getItem('language')){
        state.language = (localStorage.getItem('language'));
    }
    if(localStorage.getItem('image')){
        state.photoSource = (localStorage.getItem('image'));
    }
    if(localStorage.getItem('time')){
        state.time = (localStorage.getItem('time'));
    }
    if(localStorage.getItem('day')){
        state.day = (localStorage.getItem('day'));
    }
    if(localStorage.getItem('greeting')){
        state.greeting = (localStorage.getItem('greeting'));
    }
    if(localStorage.getItem('quoteSystem')){
        state.quoteSystem = (localStorage.getItem('quoteSystem'));
    }
    if(localStorage.getItem('weather')){
        state.weather = (localStorage.getItem('weather'));
    }
    if(localStorage.getItem('audio-player')){
        state["audio-player"] = (localStorage.getItem('audio-player'));
    }
    if(localStorage.getItem('toDoList')){
        state.toDoList = (localStorage.getItem('toDoList'));
    }

    if(localStorage.getItem('tasks')){
        state.taskArray = JSON.parse( localStorage.tasks );
    }

    setTimeout(checkLocalItems, 100);
    loadTasks();
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);