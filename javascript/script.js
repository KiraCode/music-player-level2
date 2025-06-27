const songs = [
  {
    title: "Drive breakbeat",
    duration: "1:49",
    thumbnail: "./data/preview-img-1.jpg",
    src: "./data/track1.mp3",
    artist: "Rockot",
    year: 2023,
    isVerfied: true,
    followers: 1371245,
    monthlyListner: 12346313,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Titanium",
    duration: "1:46",
    thumbnail: "./data/preview-img-2.jpg",
    src: "./data/track2.mp3",
    artist: "AlisiaBeats",
    year: 2023,
    isVerfied: true,
    followers: 50,
    monthlyListner: 20,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Science Documentory",
    duration: "2:07",
    thumbnail: "./data/preview-img-3.jpg",
    src: "./data/track3.mp3",
    artist: "Lexin_Music",
    year: 2023,
    isVerfied: false,
    followers: 80,
    monthlyListner: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Once In Paris",
    duration: "2:12",
    thumbnail: "./data/preview-img-4.jpg",
    src: "./data/track4.mp3",
    artist: "Pumpupthemind",
    year: 2023,
    isVerfied: false,
    followers: 12,
    monthlyListner: 45,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

// get all access to dom elements
const songlist = document.getElementById("song-list");
const thumbnailContainer = document.getElementById("thumbnail-container");
const thumbnail = document.getElementById("thumbnail");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currTime = document.getElementById("current-time");
const leftTime = document.getElementById("time-left");
const volumeControl = document.getElementById("volume");
const trackTitle = document.getElementById("player-title");
const trackDescription = document.getElementById("player-description");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const customDropDown = document.getElementById("custom-dropdown");
const dropDownItems = document.querySelectorAll(".custom-dropdown-item");
const shuffleImg = document.getElementById("shuffle-img");
const loopImg = document.getElementById("loop-img");

//  initialize my current song
let currentSongIndex = 0;

let isShuffleMode = true;
let isRepeatMode = false;

let audio = new Audio();

// to play and pause the song
function playPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = `<img src="./assets/icons/play-button.svg"/>`;
  } else {
    audio.pause();
    playPauseBtn.innerHTML = `<img src="./assets/icons/pause-button.svg"/>`;
  }
}

function updateCurrentSongHighlight(index) {
  let titleElements = document.querySelectorAll(".track-title");
  titleElements.forEach((element) => {
    element.classList.remove("current-song");
  });

  const currentSongTitleElement = document.querySelector(
    `.item-container[data-index="${index}"] .track-title`
  );

  if (currentSongTitleElement) {
    currentSongTitleElement.classList.add("current-song");
  }
}

function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const remainingTime = duration - currentTime;
  progress.value = currentTime;
  currTime.textContent = `${formatTime(currentTime)}`;
  leftTime.textContent = `${
    remainingTime >= 0 ? "-" + formatTime(remainingTime) : "00:00"
  }`;
}

// to load the song
function loadSong(index) {
  const currentSong = songs[index];
  audio.src = currentSong.src;
  thumbnail.src = currentSong.thumbnail;
  trackTitle.innerText = currentSong.title;
  trackDescription.innerText = currentSong.artist;
  leftTime.textContent = "00:00";
  audio.addEventListener("loadedmetadata", function () {
    progress.max = audio.duration;
  });
}

loadSong(currentSongIndex);

// add selected playback value to audio
dropDownItems.forEach(function (items) {
  items.addEventListener("click", function () {
    audio.playbackRate = parseFloat(this.dataset.value);

    // remove class selected
    dropDownItems.forEach(function (i) {
      i.classList.remove("selected-speed");
    });
    this.classList.add("selected-speed");
  });
});

// render the song list
function renderSongList() {
  // clear out existing list
  songlist.innerHTML = " ";

  // create element for each song
  songs.forEach((song, index) => {
    const itemContainer = document.createElement("div");
    const itemImg = document.createElement("div");
    const imgElement = document.createElement("img");
    const thumbnailImg = document.createElement("img");
    const trackDataContainer = document.createElement("div");
    const trackTitle = document.createElement("p");
    const trackArtist = document.createElement("p");
    const trackDurationContainer = document.createElement("div");
    const trackDuration = document.createElement("p");
    const trackYear = document.createElement("p");

    // add classname and attribute
    itemContainer.classList.add("item-container");
    thumbnailImg.classList.add("list-thumbnail");
    itemContainer.setAttribute("data-index", index);
    itemImg.classList.add("item-img");
    trackDataContainer.classList.add("track-data-container");
    trackTitle.classList.add("track-title");
    trackArtist.classList.add("track-artist");
    trackDurationContainer.classList.add("track-duration-container");
    trackDuration.classList.add("track-duration");
    trackYear.classList.add("track-year");

    // add content
    imgElement.src = "./assets/icons/outline.svg";
    thumbnailImg.src = song.thumbnail;
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    trackDuration.textContent = song.duration;
    trackYear.textContent = song.year;

    // append elements to the container
    itemImg.appendChild(imgElement);
    itemImg.appendChild(thumbnailImg);
    trackDataContainer.appendChild(trackTitle);
    trackDataContainer.appendChild(trackArtist);
    trackDataContainer.appendChild(trackYear);

    itemContainer.appendChild(itemImg);
    itemContainer.appendChild(trackDataContainer);
    songlist.appendChild(itemContainer);

    itemContainer.addEventListener("click", function () {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playPause();
      updateCurrentSongHighlight(currentSongIndex);
    });

    updateCurrentSongHighlight(currentSongIndex);
  });
}
renderSongList();

// modal javascript
const previewModal = document.getElementById("preview-modal");
const closeModal = document.getElementById("close-modal");
const previewImg = document.getElementById("preview-image");
const previewDescription = document.getElementById("preview-description");

const previewArtist = document.getElementById("preview-artist");
const followerCount = document.getElementById("follower-count");
const listenerCount = document.getElementById("listener-count");

function openModalView() {
  const currentTrack = songs[currentSongIndex];
  previewModal.style.display = "block";
  previewImg.src = currentTrack.thumbnail;
  previewArtist.innerText = currentTrack.artist;
  followerCount.innerText = currentTrack.followers;
  listenerCount.innerText = currentTrack.monthlyListner;
  previewDescription.innerText = currentTrack.description;

  if (!currentTrack.isVerfied) {
    document.getElementById("verfied").style.display = "none";
  } else {
    document.getElementById("verfied").style.display = "flex";
  }
}

function closeModalWindow() {
  previewModal.style.display = "none";
}

// event listener to close the
closeModal.addEventListener("click", closeModalWindow);

// event listener to close the preview modal when clicked outside the modal
window.addEventListener("mouseup", function (event) {
  if (event.target === previewModal) {
    closeModalWindow();
  }
});
playPauseBtn.addEventListener("click", playPause);
audio.addEventListener("timeupdate", updateProgress);
nextBtn.addEventListener("click", () => {
  nextSong(true);
});
audio.addEventListener("ended", () => {
  nextSong(false);
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

function nextSong(isClicked) {
  // if shuffle mode is on
  if (isShuffleMode) {
    // random select song
    currentSongIndex = getRandomIndex();
    loadSong(currentSongIndex);
  } else if (isClicked) {
    currentSongIndex++;
    if (currentSongIndex >= 0 && currentSongIndex <= songs.length - 1) {
      loadSong(currentSongIndex);
      playPause();
    } else {
      currentSongIndex = 0;
      loadSong(currentSongIndex);
    }
  } else {
    audio.currentTime = 0;
    progress.value = 0;
  }
  playPause();
  updateCurrentSongHighlight(currentSongIndex);
}

// turn on shuffle mode
function toggleShuffleMode() {
  isShuffleMode = true;
  isRepeatMode = false;
  shuffleImg.src = "./assets/icons/shuffle-highlighted.svg";
  loopImg.src = "./assets/icons/loop.svg";
}

// turn on repeatmode
function toggleRepeatMode() {
  isShuffleMode = false;
  isRepeatMode = true;
  shuffleImg.src = "./assets/icons/shuffle.svg";
  loopImg.src = "./assets/icons/loop-highlighted.svg";
}

function toggleDropDown() {
  if (
    document.getElementById("dropdown-list-items").style.display === "block"
  ) {
    document.getElementById("dropdown-list-items").style.display = "none";
    document.getElementById("dropdown-arrow").classList.remove("rotate-270");
  } else {
    document.getElementById("dropdown-list-items").style.display = "block";
    document.getElementById("dropdown-arrow").classList.add("rotate-270");
  }
}

function getRandomIndex() {
  return Math.floor(Math.random() * songs.length);
}

prevBtn.addEventListener("click", prevSong);
function prevSong() {
  if (isShuffleMode) {
    // random select song
    currentSongIndex = getRandomIndex();
    loadSong(currentSongIndex);
  } else {
    currentSongIndex--;
    loadSong(currentSongIndex);
  }
  playPause();
  updateCurrentSongHighlight(currentSongIndex);
}

shuffleBtn.addEventListener("click", toggleShuffleMode);
repeatBtn.addEventListener("click", toggleRepeatMode);
document
  .getElementById("selectedValue")
  .addEventListener("click", toggleDropDown);
  
thumbnailContainer.addEventListener("click", openModalView);

window.addEventListener("mouseup", function (event) {
  if (!event.target.matches(".custom-dropdown-selected")) {
    const itemsContainer = customDropDown.querySelector(
      ".custom-dropdown-items"
    );
    itemsContainer.style.display = "none";
    this.document
      .getElementById("dropdown-arrow")
      .classList.remove("rotate-270");
  }
});
