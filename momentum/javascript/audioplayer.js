import playList from "https://rolling-scopes-school.github.io/alexeiisprogrammer-JSFEPRESCHOOL2022Q2/momentum/javascript/playList.js";
const trackContainer = document.querySelector('.track-list');

const prevTrack = document.querySelector('.prev-track');
const startTrack = document.querySelector('.start-track');
const nextTrack = document.querySelector('.next-track');
let numbOfTrack;

const track = {
    trackID: "0"
}

function setLocalStorage() {
    localStorage.setItem('trackID', track.trackID);
}

function getLocalStorage(){
    if(localStorage.getItem('trackID')){
        track.trackID = localStorage.getItem('trackID');
        numbOfTrack = Number(localStorage.getItem('trackID'));

        audio.src = playList[track.trackID].src;
        document.getElementById(`track${track.trackID}`).classList.add("selected-track");
        checkEndOfTrack();
    }
}
const audio = new Audio;
for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('track');
    li.textContent = playList[i].title;
    li.id = `track${i}`;
    trackContainer.append(li);
}

prevTrack.addEventListener('click', playPrevTrack);
nextTrack.addEventListener('click', playNextTrack);
startTrack.addEventListener('click', playAudio);

let isPlay = false;

function playAudio() {
    if(!isPlay) {
    
        audio.play();
        isPlay = true;
        startTrack.classList.remove('pause');
        startTrack.classList.add('play');
    }
    else
    {
        pauseAudio();
        startTrack.classList.remove('play');
        startTrack.classList.add('pause');
        isPlay = false;
    }
    
}

function pauseAudio() {
    audio.pause();
}

function playPrevTrack() {
    document.getElementById(`track${numbOfTrack}`).classList.remove('selected-track');
    numbOfTrack = numbOfTrack === 0 ? playList.length - 1 : numbOfTrack-1;
    audio.src = playList[numbOfTrack].src;
    audio.currentTime = 0;

    document.getElementById(`track${numbOfTrack}`).classList.add('selected-track');
    track.trackID = numbOfTrack.toString();
    isPlay = false;
    playAudio();
}

function playNextTrack() {
    document.getElementById(`track${numbOfTrack}`).classList.remove('selected-track');
    numbOfTrack = numbOfTrack === playList.length - 1 ? 0 : numbOfTrack + 1;
    audio.src = playList[numbOfTrack].src;
    audio.currentTime = 0;

    document.getElementById(`track${numbOfTrack}`).classList.add('selected-track');
    track.trackID = numbOfTrack.toString();
    isPlay = false;
    playAudio();
}

function checkEndOfTrack() {
    if(playList[numbOfTrack].duration === String(Math.floor(audio.currentTime))){
        setTimeout(playNextTrack, 1000);
    }
    setTimeout(checkEndOfTrack, 1000);
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

