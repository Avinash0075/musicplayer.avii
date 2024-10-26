var now_playing = document.querySelector(".now-playing");
var track_art = document.querySelector(".track-art");
var track_name = document.querySelector(".track-name");
var track_artist = document.querySelector(".track-artist");

var playpause_btn = document.querySelector(".playpause-track");
var next_btn = document.querySelector(".next-track");
var prev_btn = document.querySelector(".prev-track");

var seek_slider = document.querySelector(".seek_slider");
var volume_range = document.querySelector(".volume_range");
var current_time = document.querySelector(".current-time");
var total_duration = document.querySelector(".total-duration");
var wave = document.getElementById("wave");
var randomIcon = document.querySelector(".random-track i");
var curr_track = document.createElement("audio");

var track_index = 0;
var isplaying = false;
var isRandom = false;
var updateTimer;

const music_list = [
    {
        img: "assets/images/dil.jpeg",
        name: "Dil",
        artist: "Ankit Tiwari",
        music: "assets/musics/Dil(Lyrical)_Ek Villain Returns_ John_Disha_Arjun_Tara_Raghav_Kaushik-Guddu _ Mohit_Ektaa _Bhushan K(MP3_160K).mp3"
    },
    {
        img: "assets/images/sajni.jpeg",
        name: "O Sajni Re",
        artist: "Arijit Singh",
        music: "assets/musics/Sajni (Lyrical Video)_ Arijit Singh_ Ram Sampath _ Laapataa Ladies _  Aamir Khan Productions(MP3_160K).mp3"
    },
    {
        img: "assets/images/sathi.jpeg",
        name: "O Saathi",
        artist: "Atif Aslam",
        music: "assets/musics/O Saathi Lyrical Video _ Baaghi 2 _ Tiger Shroff _ Disha Patani _ Arko _ Ahmed Khan Sajid Nadiadwala(MP3_160K).mp3"
    },
    {
        img: "assets/images/adhuri.jpeg",
        name: "Humari Adhuri Kahani",
        artist: "Arijit Singh",
        music: "assets/musics/Hasi Video - Hamari Adhuri Kahani_Emraan Hashmi_ Vidya Balan_Ami Mishra_Mohit Suri(MP3_160K).mp3"
    },
    {
        img: "assets/images/chal ghar chale.jpeg",
        name: "Chal ghar chale",
        artist: "Arijit Singh",
        music: "assets/musics/CHALE AANA _ De De Pyaar De I Ajay Devgn_ Tabu_ Rakul Preet l Armaan Malik_ Amaal Mallik_ Kunaal V(MP3_160K).mp3"
    }
];

loadTrack(track_index);

function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = music_list[index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[index].img + ")";
    track_name.textContent = music_list[index].name;
    track_artist.textContent = music_list[index].artist;
    now_playing.textContent = `Playing ${index + 1} of ${music_list.length}`;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    isplaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isplaying = true;
    playpause_btn.innerHTML = '<i class="fa-regular fa-circle-pause fa-5x"></i>';
    wave.classList.add("loader");
}

function pauseTrack() {
    curr_track.pause();
    isplaying = false;
    playpause_btn.innerHTML = '<i class="fa-regular fa-circle-play fa-5x"></i>';
    wave.classList.remove("loader");
}

function nextTrack() {
    if (isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        track_index = (track_index + 1) % music_list.length;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = (track_index - 1 + music_list.length) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function randomTrack() {
    isRandom = !isRandom;
    randomIcon.classList.toggle("randomActive");
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_range.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime % 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration % 60);

        if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
        if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

        current_time.textContent = `${currentMinutes}:${currentSeconds}`;
        total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}
