document.addEventListener('DOMContentLoaded', () => {
    // Variable Initialization
    let songIndex = 0;
  
    let masterPlay = document.getElementById('masterPlays');
    let Progress = document.getElementById('myProgress');
    let gif = document.getElementById('gifs');
    let songItems = Array.from(document.getElementsByClassName("songitems"));
    let audioElement = new Audio('./Lewis Capaldi - Someone You Loved (Lyrics).mp3'); // Create audio element
    
    let currentPlaying = null;
  
    let songs = [
      { songName: "Someone You Loved", filePath: "./Lewis Capaldi - Someone You Loved (Lyrics).mp3", coverPath: "download (2).jpg" },
      { songName: "Love Is Gone", filePath: "./Love-Is-Gone(PagalWorld).mp3", coverPath: "love.jpg" },
      { songName: "Happier", filePath: "./Marshmello, Bastille - Happier (Lyrics) (2).mp3", coverPath: "Marshmello_and_Bastille_Happier.png" }
    ];
  
    songItems.forEach((element, i) => {
      element.getElementsByTagName("img")[0].src = songs[i].coverPath;
      element.getElementsByClassName("songtitles")[0].innerText = songs[i].songName;
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
      Array.from(document.getElementsByClassName('songItemPlays')).forEach((element, i) => {
        if (i === songIndex && currentPlaying) {
          element.classList.remove('fa-play-circle');
          element.classList.add('fa-pause-circle');
        } else {
          element.classList.remove('fa-pause-circle');
          element.classList.add('fa-play-circle');
        }
      });
    };
  
    Array.from(document.getElementsByClassName('songItemPlays')).forEach((element, i) => {
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
    document.getElementById("previouss").addEventListener('click', () => {
      songIndex = (songIndex - 1 + songs.length) % songs.length;
      audioElement.src = songs[songIndex].filePath;
      audioElement.currentTime = 0;
      audioElement.play();
      makeAllPlays();
    });
  
    // Handle Next Song Click
    document.getElementById("nexts").addEventListener('click', () => {
      songIndex = (songIndex + 1) % songs.length;
      audioElement.src = songs[songIndex].filePath;
      audioElement.currentTime = 0;
      audioElement.play();
      makeAllPlays();
    });
  });
  