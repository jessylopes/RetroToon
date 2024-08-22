//NAV BAR LOUISIANE
// **sous menu
document.addEventListener('DOMContentLoaded', () => {
    const accountToggle = document.getElementById('accountToggle');
    const accountSubMenu = document.getElementById('accountSubMenu');

    accountToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le lien de naviguer
        accountSubMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        // Cacher le sous-menu si on clique en dehors de l'élément ou du sous-menu
        if (!accountToggle.contains(e.target) && !accountSubMenu.contains(e.target)) {
            accountSubMenu.classList.remove('active');
        }
    });
});

// *barre de recherche
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.getElementById('search-box');

    searchIcon.addEventListener('click', () => {
        searchBox.classList.toggle('active'); // Ajoute ou supprime la classe active
        searchBox.focus(); // Focalise la barre de recherche pour permettre la saisie de texte
    });

    searchBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Ajoute ici la logique pour envoyer la recherche, par exemple en soumettant un formulaire
            console.log('Recherche soumise :', searchBox.value);
        }
    });
});

//LECTEUR VIDÉO  MORGANE
//initialisation des valeurs 
const video = document.getElementById('my-video');
const playPauseButton = document.getElementById('play-pause-btn');
const forwardButton = document.getElementById('btn-en-avant');
const rewindButton = document.getElementById('btn-en-arriere');
const progressBar = document.getElementById('progress-bar');
const videoCurrentTime = document.getElementById('current-time');
const videoDuration = document.getElementById('duration-time');
const fullScreenButton = document.getElementById('full-screen');
const muteButton = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
const videoContainer = document.getElementById('video-player-box');
const videoControlsContainer = document.getElementById('video-controls-container');

//fonction pour initialiser le player 
document.addEventListener('DOMContentLoaded', () => {
    playPauseButton.addEventListener('click', playPause);
    progressBar.addEventListener('change', updateProgress);
    video.addEventListener('timeupdate', videoTimeUpdate);
    fullScreenButton.addEventListener('click', openFullScreen);
    muteButton.addEventListener('click', muteUnmute);
    volumeSlider.addEventListener('change', setVolume);
})

//BOUTON PAUSE ET PLAY 
function playPause() {
    if (video.paused) {
        video.play();
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        video.pause();
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}


//BOUTON 10SEC EN AVANT 
forwardButton.addEventListener('click', function () {
    video.currentTime += 10;
});

//BOUTON 10SEC EN ARRIÈRE
rewindButton.addEventListener('click', function () {
    video.currentTime -= 10;
});

//BARRE DE PROGRESSION QUE LE USER PEUT MANIPULER AVEC SA SOURIS
function updateProgress() {
    const progressPercentage = video.duration * (progressBar.value / 100);
    video.currentTime = progressPercentage;
    console.log(video.duration);
    console.log(progressBar.value);


}

//BAR DE PROGRESSION
function videoTimeUpdate() {
    //BAR DE PROGRESSION QUI SUIT LA VIDEO
    let newTime = video.currentTime * (100 / video.duration);
    progressBar.value = newTime;

    //CURRENT PLAY TIME 
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);
    if (currentSeconds < 10) { currentSeconds = `0${currentSeconds}`; }
    if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`; }
    if (currentMinutes < 10) { currentMinutes = `0${currentMinutes}`; }
    if (durationMinutes < 10) { durationMinutes = `0${durationMinutes}`; }

    videoCurrentTime.innerHTML = currentMinutes + " : " + currentSeconds;
    videoDuration.innerHTML = durationMinutes + " : " + durationSeconds;

}


// VIDEO EN PLEIN ECRAN OU EN PETIT ECRAN: 
function openFullScreen() {
    if (fullScreenButton.innerHTML == '<i class="fa-solid fa-expand"></i>') {
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) { /*Pour Safari*/
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { /*Pour internet explorer*/
            videoContainer.msRequestFullscreen();
        }
        fullScreenButton.innerHTML = '<i class="fa-solid fa-compress"></i>';
    }
    else if (fullScreenButton.innerHTML == '<i class="fa-solid fa-compress"></i>') {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscren) {
            document.webkitExitFullscren();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullScreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
}

//VIDEO EN PLEIN ECRAN OU EN PETIT ECRAN
// function openFullScreen() {
//     if (!document.fullscreenElement) {
//         if (videoContainer.requestFullscreen) {
//             videoContainer.requestFullscreen();
//         } else if (videoContainer.webkitRequestFullscreen) { /* Pour Safari */
//             videoContainer.webkitRequestFullscreen();
//         } else if (videoContainer.msRequestFullscreen) { /* Pour Internet Explorer/Edge */
//             videoContainer.msRequestFullscreen();
//         }
//         fullScreenButton.innerHTML = '<i class="fa-solid fa-compress"></i>';
//     } else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         } else if (document.webkitExitFullscreen) { /* Pour Safari */
//             document.webkitExitFullscreen();
//         } else if (document.msExitFullscreen) { /* Pour Internet Explorer/Edge */
//             document.msExitFullscreen();
//         }
//         fullScreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
//     }
// }



//MUTE ET UNMUTE
function muteUnmute() {
    if (video.muted) {
        video.muted = false;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; /*= volume activé */

    } else {
        video.muted = true;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; /* = volume coupé*/

    }
}

//REGLAGE DU VOLUME
function setVolume() {
    video.volume = volumeSlider.value / 100;

    if (volumeSlider.value == 0) {
        video.muted = true; // Mute si le volume est à zéro
        muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; /*= unmute*/
    } else if (volumeSlider.value > 0) {
        video.muted = false; // Unmute si le volume est supérieur à zéro
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; /*= mute*/
    }

}

//CONTROLS CACHÉS LORS DU PASSAGE DE LA SOURIS
videoControlsContainer.addEventListener('mouseover', ()=> {
    videoControlsContainer.style.opacity = 1;
})

videoControlsContainer.addEventListener('mouseleave', ()=> {
    videoControlsContainer.style.opacity = 0;
})

//COMMENTAIRES
//envoi des commentaires
const inputUser = document.getElementById('input-user');
const containerGeneralComment = document.getElementById('comment-container')
const submitButton = document.getElementById('submit');
let userCommentRow = document.getElementById('user-comment-row');

/************ AJOUT D'UN COMMENTAIRE A LA BOITE DE COMMENTAIRES + VERIFICATION ************/

function addComment() {

    let comment = document.createElement('p');
    comment.classList.add('commentaire');

    if (inputUser.value.trim() == "" || inputUser.value == null) {
        alert("Laissez un commentaire !");
        return false;
    } else {

        comment.innerHTML = inputUser.value;

        containerGeneralComment.appendChild(userCommentRow);
        containerGeneralComment.appendChild(comment);


        /************ BOUTON QUI SUPPRIME INDIVIDUELLEMENT LES TACHES ************/

        let aSupprimer = document.createElement('span');
        aSupprimer.classList.add('btn-a-supprimer');

        aSupprimer.innerHTML = '<i class="fa-solid fa-trash"></i>';

        aSupprimer.style = 'color: #FACA78; font-size: 20px; cursor: pointer; margin-left: 10px;';

        comment.appendChild(aSupprimer);

        aSupprimer.addEventListener("click", function (event) {
            event.stopPropagation();
            userCommentRow.remove();
            comment.remove();
        });
    }
}

submitButton.addEventListener("click", addComment);


