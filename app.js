const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const replay = document.querySelector(".replay");
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    // time 
    const timeDisplay = document.querySelector('h3');
    const timeSelect = document.querySelectorAll('.time-selector button');

    // get the length of the outline
    const outlineLength = outline.getTotalLength();


    // Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    // play different sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // replay timer
    replay.addEventListener("click", function () {
        restartSong(song);

    });


    const restartSong = song => {
        // let currentTime = song.currentTime;
        song.currentTime = 0;
        console.log("ciao")

    }


    //play Sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });


    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    // create a function specify to stop and play the sound

    const checkPlaying = song => {
        if (song.paused) {
            video.play();
            song.play();
            play.src = "./svg/pause.svg";
        }
        else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    // we can animate the circle
    song.ontimeupdate = () => {

        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minute = Math.floor(elapsed / 60);


        // Anitmate the circle

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animae the text
        timeDisplay.textContent = `${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }

    }


};

app();