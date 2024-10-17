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




const API_KEY = 'abedd43cf8d6083e8a33eafb9cc8b3f4';

// Load the YouTube API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '700',
        width: '100%',
        videoId: '', // Will dynamically load
        playerVars: {
            'autoplay': 1,
            'controls': 0, 
            'rel': 0, // No related videos at the end
            'modestbranding': 1, // Minimize YouTube logo
            'iv_load_policy': 3, // No info cards (annotations)
            'cc_load_policy': 0, // No closed captions
            'fs': 0, // Disable fullscreen
            'playsinline': 1 // Ensure inline play on mobile
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    fetchAndDisplayTrailers1980s();
}

let currentTrailerIndex = 0;
let trailers = [];

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        currentTrailerIndex = (currentTrailerIndex + 1) % trailers.length;
        player.loadVideoById(trailers[currentTrailerIndex].key);
    }
}

function fetchAndDisplayTrailers1980s() {
    const urlTV = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&first_air_date.gte=1980-01-01&first_air_date.lte=2010-12-31&language=fr-FR&sort_by=popularity.desc`;

    fetch(urlTV)
        .then(response => response.json())
        .then(data => {
            const tvShows = data.results.slice(0, 10); // Fetch top 10 popular shows
            return Promise.all(tvShows.map(show => 
                fetch(`https://api.themoviedb.org/3/tv/${show.id}/videos?api_key=${API_KEY}&language=fr-FR`)
                    .then(response => response.json())
            ));
        })
        .then(trailerData => {
            trailers = trailerData.flatMap(data => 
                data.results
                    .filter(video => video.type === 'Trailer' && video.site === 'YouTube')
                    .map(video => ({
                        key: video.key,
                        name: video.name
                    }))
            );

            if (trailers.length > 0) {
                player.loadVideoById(trailers[0].key); // Load first trailer
                player.setLoop(true); // Ensure looping
                player.playVideo(); // Start video
            } else {
                console.log('No trailers available');
            }
        })
        .catch(error => console.error('Error fetching trailers:', error));
}

// Call this function to start the process
loadYouTubeAPI();

//Carousel
document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = 'abedd43cf8d6083e8a33eafb9cc8b3f4';
  const seriesContainer = document.getElementById('series-container');

  // Genre map (for later use)
  const genreMap = {
      16: 'Animation',
      35: 'Comédie',
      10759: 'Action & Adventure',
      18: 'Drame',
      10765: 'Science-Fiction & Fantastique',
  };

  const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc&with_genres=16&first_air_date.gte=1970-01-01&first_air_date.lte=2010-12-31`;

  let allSeries = []; // Array to store all fetched series

  // Function to fetch TV shows
  function fetchShows() {
      return fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              allSeries = data.results; // Store fetched series
              showItems(); // Display the first series
              
          })
          .catch(error => console.error('Error fetching series:', error));
  }

  // Function to display series in the container
  function showItems(startIndex = 0) {
    seriesContainer.innerHTML = ''; // Efface le conteneur avant d'ajouter de nouveaux éléments
    const itemsPerView = 5; // Nombre d'éléments à afficher par clic

    for (let i = startIndex; i < startIndex + itemsPerView && i < allSeries.length; i++) {
        const show = allSeries[i];
        const item = document.createElement('div');
        item.classList.add('item');

        // Configure l'image de fond
        item.style.backgroundImage = show.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w500${show.backdrop_path})`
            : 'url(https://via.placeholder.com/500x300?text=No+Image)';

        // Élément de contenu
        const bodyItem = document.createElement('div');
        bodyItem.classList.add('body-item');

        // Élément de corps 1 avec icône de lecture
        const bodyItem1 = document.createElement('div');
        bodyItem1.classList.add('body-item-1');
        bodyItem1.innerHTML = `<div class="play"><i class="fa-solid fa-play" style="color: #fffae0;"></i></div>`;

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('content-wrapper');

        // Titre de la série
        const title = document.createElement('div');
        title.classList.add('title', 'body-item-2');
        title.textContent = show.name;

        // Propriétés de la série (ajout des genres)
        const properties = document.createElement('div');
        properties.classList.add('properties', 'body-item-3');

        const genreNames = show.genre_ids.map(id => genreMap[id] || 'Inconnu').join(', ');

        // **Match** : Utilisez par exemple `vote_average` comme indicateur de "match"
        const match = show.vote_average ? `${Math.round(show.vote_average * 10)}% Match` : 'N/A';

        // **Age Limit** : Si `age_rating` existe dans l'API, utilisez-le, sinon affichez une valeur par défaut
        const ageLimit = show.age_rating || '13+';

        // **Time** : Utilisez `runtime` (durée) s'il est fourni
        let timeOrSeasons = 'N/A';

        if (show.runtime && show.runtime.length > 0 && show.runtime[0] > 0) {
            // Si la durée est disponible, convertissez-la en heures et minutes
            const runtime = show.runtime[0]; // Récupérez le premier élément du tableau `runtime`
            timeOrSeasons = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
        } else if (show.number_of_seasons) {
            // Si la durée n'est pas disponible, affichez le nombre d'épisodes
            timeOrSeasons = `${show.number_of_seasons} saisons`;
        }

        properties.innerHTML = `
            <span class="match">${match}</span>
            <span class="year">${show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A'}</span>
            <span class="age-limit">${ageLimit}</span>
            <span class="time">${timeOrSeasons}</span>
            <span class="genres">${genreNames}</span> <!-- Ajout des genres ici -->
        `;

        // Ajout du titre et des propriétés dans le content-wrapper
        contentWrapper.appendChild(title);
        contentWrapper.appendChild(properties);

        // Ajouter les éléments au body-item
        bodyItem.appendChild(bodyItem1);
        bodyItem.appendChild(contentWrapper);

        // Ajouter le body-item à l'élément principal
        item.appendChild(bodyItem);
        seriesContainer.appendChild(item);
    }
}



// Fonction pour initialiser le carrousel
function initializeCarousel() {
  const prevButton = document.querySelector('.arrow-left');
  const nextButton = document.querySelector('.arrow-right');
  let currentIndex = 0;
  const itemsPerView = 5; // Nombre d'éléments visibles à la fois

  function showCurrentItems() {
      showItems(currentIndex); // Affiche les éléments basés sur currentIndex
  }

  nextButton.addEventListener('click', () => {
      if (currentIndex + itemsPerView < allSeries.length) {
          currentIndex += itemsPerView;
          showCurrentItems();
      }
  });

  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex -= itemsPerView;
          showCurrentItems();
      }
  });

  showCurrentItems(); // Initialise l'affichage
}

// Initialisez votre carrousel après avoir récupéré les séries
async function fetchShows() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  allSeries = data.results; // Assurez-vous que `allSeries` contient vos séries
  initializeCarousel(); // Initialisez le carrousel après la récupération des séries
}

// Appel initial pour récupérer les séries
fetchShows();
})
  








