document.addEventListener('DOMContentLoaded', () => {
  // Variable Initialization
  let songIndex = 0;

  let masterPlay = document.getElementById('masterPlay');
  let Progress = document.getElementById('Progress');
  let gif = document.getElementById('gif');
  let songItems = Array.from(document.getElementsByClassName("songitem"));
  let audioElement = new Audio('./Marshmello_Halsey_-_BE_KIND_CeeNaija.com_.mp3", coverPath: "./bekind.jpg'); // Create audio element
  let currentPlaying = null;


  let songs = [
    { songName: "Be Kind", filePath: "./Marshmello_Halsey_-_BE_KIND_CeeNaija.com_.mp3", coverPath: "./bekind.jpg" },
    { songName: "UCLA", filePath: "./RL Grime - UCLA ft. 24hrs (Official Audio).mp3", coverPath: "./maxresdefault.jpg" },
    { songName: "Here with me", filePath: "./Marshmello, CHVRCHES - Here With Me (Lyrics).mp3", coverPath: "./download.jpg" }
  ];

  songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songtitle")[0].innerText = songs[i].songName;
  });

  // Handle Play/Pause Click
  masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      gif.style.opacity = 1;
    } else {
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;
    }
  });

  // Listen To Events
  audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // Update Seekbar
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    Progress.value = progress;
  });

  Progress.addEventListener('change', () => {
    audioElement.currentTime = (Progress.value / 100) * audioElement.duration;
  });

  const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
      if (i === songIndex && currentPlaying) {
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
      } else {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
      }
    });
  };
  
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
      if (i === songIndex && !audioElement.paused) {
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
      } else {
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        songIndex = i;
      }
    });
  });

  // Handle Previous Song Click
  document.getElementById("previous").addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
  });

  // Handle Next Song Click
  document.getElementById("next").addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
  });
});
