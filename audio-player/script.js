"use strict";

const player = document.querySelector(".player");
const playButton = document.querySelector(".play");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const cover = document.querySelector(".cover__img");
const title = document.querySelector(".title");
const subTitle = document.querySelector(".sub-title");
const track = document.querySelector(".track");
const progressContainer = document.querySelector(".progress__container");
const progressBar = document.querySelector(".progress__bar");
const timeCurrent = document.querySelector(".time_current");
const timeTotal = document.querySelector(".time_total");
const playPauseSwitch = document.querySelector(".play-pause_switch");

const songs = [
  ["Dusty-blue", " Charles Bradley"],
  ["Unbalanced-pieces", "Mark Lanegan & Soulsavers"],
];

let songIndex = 0;

const loadSong = (song) => {
  title.innerHTML = `${song[0].replace("-", " ")}`;
  subTitle.innerHTML = song[1];
  track.src = `../src/audio/${song[0]}.mp3`;
  cover.src = `../src/img/cover-${songIndex + 1}.jpg`;
};
loadSong(songs[songIndex]);

const playSong = () => {
  player.classList.add("play");
  playPauseSwitch.src = "../src/img/pause.svg";
  track.play();
};

const pauseSong = () => {
  player.classList.remove("play");
  playPauseSwitch.src = "../src/img/play.svg";
  track.pause();
};

playButton.addEventListener("click", () => {
  const isPlaying = player.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};
nextButton.addEventListener("click", nextSong);

const previousSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};
previousButton.addEventListener("click", previousSong);

track.addEventListener("ended", nextSong);

const displaySongDuration = () => {};

const updateProgressBar = (e) => {
  let { duration, currentTime } = e.srcElement;
  const progressBarPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressBarPercent}%`;
};
track.addEventListener("timeupdate", updateProgressBar);

const updateTime = (e) => {
  let { duration, currentTime } = e.srcElement;
  if (duration) {
    timeTotal.innerHTML = `${formatTime(duration)}`;
  } else {
    timeTotal.innerHTML = `${"00:00"}`;
  }
  timeCurrent.innerHTML = `${formatTime(currentTime)}`;
};
track.addEventListener("timeupdate", updateTime);

const setProgressOnclick = function (e) {
  const progressBarWidth = this.clientWidth;
  const clickX = e.offsetX;
  const duration = track.duration;
  track.currentTime = (clickX / progressBarWidth) * duration;
};
progressContainer.addEventListener("click", setProgressOnclick);

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}
