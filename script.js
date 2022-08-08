let img = document.getElementById('albumArt');
let title = document.getElementById('title');
let author = document.getElementById('author');
let like = document.getElementById('like');
let seek = document.getElementById('progress');
let seekGrey = document.getElementById('seekbar')
let currTime = document.getElementById('currTime');
let audioDuration = document.getElementById('duration');
let volumeIcon = document.getElementById('volumeIcon');
let previous = document.getElementById('previous');
let play = document.getElementById('playPause');
let playIcon = document.getElementById('playIcon');
let next = document.getElementById('next');
let shuffle = document.getElementById('shuffle');
let volume = document.getElementById('volume');
let audio = document.getElementById('audio');
let isPlaying = false;
let currIndex = 0;
const songs = [
    {
        title: 'Evening Air',
        author: 'Enrize',
        albumArt: 'https://images.pexels.com/photos/7283618/pexels-photo-7283618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        src: "./tunetank.com_734_evening-air_by_enrize.mp3",
        isLiked: false
    },
    {
        title: 'Planet Zero',
        author: 'colinroot',
        albumArt: 'https://images.pexels.com/photos/5187650/pexels-photo-5187650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        src: "./tunetank.com_6202_planet-zero_by_colinroot.mp3",
        isLiked: false
    },
    {
        title: 'Over The Ocean',
        author: 'eenspiry',
        albumArt: 'https://images.pexels.com/photos/10254833/pexels-photo-10254833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        src: "./tunetank.com_649_over-the-ocean_by_eenspiry.mp3",
        isLiked: false
    },
    {
        title: 'Dunkirk',
        author: 'AudioCopper',
        albumArt: 'https://images.pexels.com/photos/11491929/pexels-photo-11491929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        src: "./tunetank.com_3174_dunkirk_by_audiocopper.mp3",
        isLiked: false
    },
    {
        title: 'Alone At Night',
        author: 'MelancholicBird',
        albumArt: 'https://images.pexels.com/photos/5417109/pexels-photo-5417109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        src: "./tunetank.com_5416_alone-at-night_by_melancholicbird.mp3",
        isLiked: false
    },
    {
        title: 'Secular',
        author: 'KOSATKA',
        albumArt: 'https://images.pexels.com/photos/7108768/pexels-photo-7108768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        src: "./tunetank.com_5432_secular_by_kosatka.mp3",
        isLiked: false
    }
];

const playPause = () => {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
        isPlaying = false;
    }
    else {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
        isPlaying = true;
    }
}
const seekUpdate = () => {
    let seekProgress = (100 / audio.duration) * audio.currentTime;
    let currentTimestampMinutes = Math.floor(audio.currentTime / 60);
    let currentTimestampSeconds = Math.floor(audio.currentTime - Math.floor(audio.currentTime / 60) * 60);
    let currentTimestamp;
    if (currentTimestampSeconds <= 9) {
        currentTimestamp = `${currentTimestampMinutes}:0${currentTimestampSeconds}`;
    }
    else {
        currentTimestamp = `${currentTimestampMinutes}:${currentTimestampSeconds}`;
    }
    seek.style.width = `${seekProgress}%`;
    currTime.innerHTML = currentTimestamp;

}

audio.addEventListener("timeupdate", seekUpdate);

const load = () => {
    if (currIndex < 0) {
        currIndex = 0;
    }
    else if (currIndex > songs.length - 1) {
        currIndex = 0;
    }
    title.innerHTML = songs[currIndex].title;
    author.innerHTML = songs[currIndex].author;
    if (songs[currIndex].isLiked) {
        like.style.color = 'var(--red)';
    } else {
        like.style.color = 'var(--black)';
    }
    img.src = songs[currIndex].albumArt;
    audio.src = songs[currIndex].src;
    audio.onloadedmetadata = () => {
        let durationTimestampMinutes = Math.floor(audio.duration / 60);
        let durationTimestampSeconds = Math.floor(audio.duration - Math.floor(audio.duration / 60) * 60);
        let durationTimestamp;
        if (durationTimestampSeconds <= 9) {
            durationTimestamp = `${durationTimestampMinutes}:0${durationTimestampSeconds}`;
        }
        else {
            durationTimestamp = `${durationTimestampMinutes}:${durationTimestampSeconds}`;
        }
        audioDuration.innerHTML = durationTimestamp;
    }
    currTime.innerHTML = '0:00'
    seek.style.width = '0%';
}

const nextSong = () => {
    currIndex++
    load();
    if (isPlaying) {
        audio.play();
    }
    else {
        audio.pause();
    }
}
const previousSong = () => {
    currIndex--
    load();
    if (isPlaying) {
        audio.play();
    }
    else {
        audio.pause();
    }
}

const randomPlay = () => {
    currIndex = Math.floor(Math.random() * songs.length);
    load();
    if (isPlaying) {
        audio.play();
    }
    else {
        audio.pause();
    }
}

const likeSong = () => {
    if (!songs[currIndex].isLiked) {
        songs[currIndex].isLiked = true;
        like.style.color = 'var(--red)';
    } else {
        songs[currIndex].isLiked = false;
        like.style.color = 'var(--black)';
    }
}
let clientWidthGrey
const seekGreyClick = (e) => {
    clientWidthGrey = e.srcElement.clientWidth;
    let clickXGrey = e.offsetX;
    let clickPercentageGrey = Math.floor((clickXGrey / clientWidthGrey) * 100);
    audio.currentTime = (audio.duration * clickPercentageGrey) / 100;
}

const seekClick = (e) => {
    let clickX = e.offsetX;
    let clickPercentage = Math.floor((clickX / clientWidthGrey) * 100);
    audio.currentTime = (audio.duration * clickPercentage) / 100;
}

const volumeChange = () => {
    audio.volume = (volume.value) / 100;
}

volume.addEventListener('input', volumeChange);
play.addEventListener('click', playPause);
next.addEventListener('click', nextSong);
previous.addEventListener('click', previousSong);
shuffle.addEventListener('click', randomPlay);
like.addEventListener('click', likeSong);
seekGrey.addEventListener('click', seekGreyClick);
seek.addEventListener('click', seekClick);
audio.addEventListener("ended", nextSong);
load();