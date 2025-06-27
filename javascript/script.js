document.addEventListener("DOMContentLoaded", function () {
  const songs = [
    {
      title: "Drive breakbeat",
      duration: "1:49",
      thumbnail: "./assets/icons/music-icon.svg",
      src: "./data/track1.mp3",
      artist: "Rockot",
      year: 2023,
    },
    {
      title: "Titanium",
      duration: "1:46",
      thumbnail: "./assets/icons/music-icon.svg",
      src: "./data/track2.mp3",
      artist: "AlisiaBeats",
      year: 2023,
    },
    {
      title: "Science Documentory",
      duration: "2:07",
      thumbnail: "./assets/icons/music-icon.svg",
      src: "./data/track3.mp3",
      artist: "Lexin_Music",
      year: 2023,
    },
    {
      title: "Once In Paris",
      duration: "2:12",
      thumbnail: "./assets/icons/music-icon.svg",
      src: "./data/track4.mp3",
      artist: "Pumpupthemind",
      year: 2023,
    },
  ];

  // get all the access to the elements
  const songlist = document.getElementById("song-list");
  const thumbnail = document.getElementById("thumbnail");
  const playpauseBtn = document.getElementById("play-pause");
  const restartBtn = document.getElementById("restart");
  const stopBtn = document.getElementById("stop");
  const progress = document.getElementById("progress");
  const currTime = document.getElementById("current-time");
  const leftTime = document.getElementById("time-left");
  const volumeControl = document.getElementById("volume");
  const trackTitle = document.getElementById("player-title");
  const trackDescription = document.getElementById("player-description");

  // to store index of track being played
  let currentSongIndex = 0;

  // constructor
  let audio = new Audio();
  console.log(audio);
  loadSong(currentSongIndex); //no hoisitng

  const updatePlayPauseButton = (paused) => {
    playpauseBtn.innerHTML = paused
      ? `<img src="./assets/icons/play-button.svg"/>`
      : `<img src="./assets/icons/pause-button.svg"/>`;
  };

  // to play pasue the track
  function playPause() {
    if (audio.paused) {
      audio.play();
      updatePlayPauseButton(true);
    } else {
      audio.pause();
      updatePlayPauseButton(false);
    }
  }

  function updateCurrentSongHighlight(index) {
    // remove the current song classname
    const titleElements = document.querySelectorAll(".track-title");
    titleElements.forEach((element) => {
      console.log(element);
      element.classList.remove("current-song");
    });

    // add current song class name
    const currentSongtitleElement = document.querySelector(
      `.item-container[data-index="${index}"] .track-title`
    );

    if (currentSongtitleElement) {
      currentSongtitleElement.classList.add("current-song");
    }
  }

  // to restart the track
  function restart() {
    audio.currentTime = 0;
    progress.value = 0;
  }

  // stop track
  function stop() {
    audio.pause();
    audio.currentTime = 0;
    progress.value = 0;
  }

  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}: ${padZero(seconds)}`;
  }

  function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    // calculate the time remaining
    const remainingTime = duration - currentTime;
    progress.value = currentTime;
    currTime.textContent = `${formatTime(currentTime)}`;
    leftTime.textContent = `${
      "-" + (remainingTime >= 0 ? formatTime(remainingTime) : "00:00")
    }`;
  }

  //   update volume
  function updateVolume() {
    audio.volume = volumeControl.value;
  }
  
  // to play a track using audio
  function loadSong(index) {
    const currentSong = songs[index];
    audio.src = currentSong.src;
    thumbnail.src = currentSong.thumbnail;
    trackTitle.innerText = currentSong.title;
    trackDescription.innerText = currentSong.artist;
    leftTime.textContent = "00:00";
    audio.addEventListener("loadeddata", () => {
      progress.max = audio.duration;
    });
    updateCurrentSongHighlight(index);
  }

  function renderSongList() {
    // clear our exisiting list
    songlist.innerHTML = " ";

    // render songs dynamically
    songs.forEach((song, index) => {
      console.log(song);

      // create elements for each song
      const itemContainer = document.createElement("div");
      const itemImg = document.createElement("div");
      const imgElement = document.createElement("img");
      const trackDataContainer = document.createElement("div");
      const trackTitle = document.createElement("p");
      const trackArtist = document.createElement("p");
      const trackDurationContainer = document.createElement("div");
      const trackDuration = document.createElement("p");
      const trackYear = document.createElement("p");

      // add classes

      itemContainer.classList.add("item-container");
      itemContainer.setAttribute("data-index", index);
      itemImg.classList.add("item-img");
      trackDataContainer.classList.add("track-data-container");
      trackTitle.classList.add("track-title");
      trackArtist.classList.add("track-artist");
      trackDurationContainer.classList.add("track-duration-container");
      trackDuration.classList.add("track-duration");
      trackYear.classList.add("track-year");

      // add content and structure the list
      itemContainer.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
        updatePlayPauseButton(true);
      });

      // add content and structure the list

      imgElement.src = "./assets/icons/outline.svg";
      trackTitle.textContent = song.title;
      trackArtist.textContent = song.artist;
      trackDuration.textContent = song.duration;
      trackYear.textContent = song.year;

      // append elements to the container
      itemImg.appendChild(imgElement);
      trackDataContainer.appendChild(trackTitle);
      trackDataContainer.appendChild(trackArtist);
      trackDurationContainer.appendChild(trackDuration);
      trackDurationContainer.appendChild(trackYear);

      itemContainer.appendChild(itemImg);
      itemContainer.appendChild(trackDataContainer);
      itemContainer.appendChild(trackDurationContainer);

      songlist.appendChild(itemContainer);

      updateCurrentSongHighlight(currentSongIndex);
    });
  }

  renderSongList();

  // attached eventlistener to DOM elements
  playpauseBtn.addEventListener("click", playPause);
  restartBtn.addEventListener("click", restart);
  stopBtn.addEventListener("click", stop);

  audio.addEventListener("timeupdate", updateProgress);

  audio.addEventListener("play", () => updatePlayPauseButton(true));
  audio.addEventListener("pause", () => updatePlayPauseButton(false));
  volumeControl.addEventListener("input", updateVolume);
});
