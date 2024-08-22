
// **********************sous menu
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

// *************************barre de recherche
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

// ****************************carrousel
document.addEventListener('DOMContentLoaded', function() {
    function initializeCarousel(carouselId) {
        const carousel = document.querySelector(`#${carouselId}`);
        
        if (!carousel) {
            console.error(`Carrousel avec l'ID ${carouselId} introuvable.`);
            return;
        }

        const carouselContainer = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const nextButton = carousel.querySelector('.carousel-control.next');
        
        if (!carouselContainer || slides.length === 0) {
            console.error(`Le conteneur ou les slides sont introuvables dans le carrousel ${carouselId}.`);
            return;
        }

        if (!prevButton || !nextButton) {
            console.error(`Les boutons de contrôle sont introuvables dans le carrousel ${carouselId}.`);
            return;
        }

        let index = 0;

        function getSlidesToShow() {
            if (window.innerWidth <= 480) {
                return 1;
            } else if (window.innerWidth <= 767) {
                return 2;
            } else {
                return 5;
            }
        }

        function goToSlide(index) {
            const slidesToShow = getSlidesToShow();
            const slideWidth = slides[0].offsetWidth;
            const offset = index * slideWidth * slidesToShow;
            carouselContainer.style.transform = `translateX(-${offset}px)`;
        }

        function nextSlide() {
            const slidesToShow = getSlidesToShow();
            index = (index + slidesToShow) % Math.ceil(slides.length / slidesToShow);
            goToSlide(index);
        }

        function prevSlide() {
            const slidesToShow = getSlidesToShow();
            index = (index - slidesToShow + Math.ceil(slides.length / slidesToShow)) % Math.ceil(slides.length / slidesToShow);
            goToSlide(index);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        window.addEventListener('resize', () => {
            goToSlide(index);
        });

        goToSlide(index); // Initialisation de la vue
        console.log(`Carrousel ${carouselId} initialisé avec succès.`);
    }

    // Initialisation de tous les carrousels
    document.querySelectorAll('.carousel').forEach(carousel => initializeCarousel(carousel.id));
});








// ***********API TMDB**************
const API_KEY = 'abedd43cf8d6083e8a33eafb9cc8b3f4'; // Clé API pour accéder à l'API de The Movie Database (TMDB)

// ********************* Années 80 *****************
// Fonction pour récupérer et afficher les séries TV animées des années 80
function fetchAndDisplayTVShows1980s() {
    // URL de l'API pour découvrir les séries TV avec les paramètres spécifiés :
    // - Genre : 16 (Animation)
    // - Date de première diffusion : entre le 1er janvier 1980 et le 31 décembre 1989
    // - Langue : français (fr-FR)
    // - Triées par popularité décroissante
    const urlTV = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&first_air_date.gte=1980-01-01&first_air_date.lte=1989-12-31&language=fr-FR&sort_by=popularity.desc`;

    // Appel à l'API pour récupérer les données des séries TV
    fetch(urlTV)
      .then(response => response.json()) // Conversion de la réponse en format JSON
      .then(data => {
        // Parcours des résultats pour afficher les 10 premières séries TV animées
        data.results.slice(0, 10).forEach((tvShow, index) => {
            // Vérification si un poster est disponible pour chaque série TV
            const posterPath = tvShow.poster_path 
                ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` // URL complète de l'image du poster
                : 'https://via.placeholder.com/200x300?text=No+Image'; // Image de remplacement si le poster n'est pas disponible
            
            // Mise à jour de l'élément HTML (par exemple, une image) pour afficher le poster
            // `poster-80-${index + 1}` correspond à l'id des éléments HTML où les images doivent être affichées
            document.getElementById(`poster-80-${index + 1}`).src = posterPath;
        });
      })
      .catch(error => console.error('Erreur:', error)); // Gestion des erreurs si l'appel API échoue
}

// Appel de la fonction pour charger les séries animées des années 80 dès que la page est chargée
fetchAndDisplayTVShows1980s();


// ***************90's************
function fetchAndDisplayTVShows1990s() {
    const urlTV = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&first_air_date.gte=1990-01-01&first_air_date.lte=1999-12-31&language=fr-FR&sort_by=popularity.desc`;

    fetch(urlTV)
      .then(response => response.json())
      .then(data => {
        data.results.slice(0, 10).forEach((tvShow, index) => {
            const posterPath = tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
            document.getElementById(`poster-90-${index + 1}`).src = posterPath;
        });
      })
      .catch(error => console.error('Erreur:', error));
}

// Appel de la fonction pour charger les séries animées des années 90
fetchAndDisplayTVShows1990s();

//**********************************00's********************** */
function fetchAndDisplayTVShows2000s() {
    const urlTV = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&first_air_date.gte=2000-01-01&first_air_date.lte=2009-12-31&language=fr-FR&sort_by=popularity.desc`;

    fetch(urlTV)
      .then(response => response.json())
      .then(data => {
        data.results.slice(0, 10).forEach((tvShow, index) => {
            const posterPath = tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
            document.getElementById(`poster-2000-${index + 1}`).src = posterPath;
        });
      })
      .catch(error => console.error('Erreur:', error));
}

// Appel de la fonction pour charger les séries animées des années 90
fetchAndDisplayTVShows2000s();


// tableau code lyoko
document.addEventListener('DOMContentLoaded', function() {
    const codeLyoko = {
        title: "Code Lyoko",
        year: 2003,
        description: "Code Lyoko est une série animée française qui suit un groupe d'adolescents qui luttent contre des monstres d'un monde virtuel, tout en gérant leur vie quotidienne.",
        affiche: "/assets/images/code-lyoko.jpg",
        originalLanguage: "fr",
        numberOfSeasons: 4,
        numberOfEpisodes: 97,
        genre: ["Animation", "Action", "Aventure"],
        tmdbId: 4682
    };

    // Met à jour l'URL de l'affiche dans l'élément HTML avec l'ID 'poster-90-9'
    document.getElementById(`poster-2000-${index + 8}`).src = codeLyoko.affiche;
});

//******************tableau d'objet pour 70's***********************
const container = document.querySelector('.grid-container');

const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&first_air_date.gte=1970-01-01&first_air_date.lte=1979-12-31&language=fr-FR&sort_by=popularity.desc`;

const cartoons = [
    {
        title: "Lady Oscar",
        year: 1979,
        description: "L'histoire d'Oscar François de Jarjayes, une femme élevée comme un homme au XVIIIe siècle en France.",
        affiche: "/assets/images/lady_oscar.jpg",
        genre: ["Drame", "Historique"],
        tmdbId: 23389
    },
    {
        title: "Il était une fois... l'Homme",
        year: 1978,
        description: "Une série éducative qui raconte l'histoire de l'humanité, depuis la Préhistoire jusqu'à nos jours.",
        affiche: "/assets/images/Il-etait-une-fois.jpg",
        genre: ["Éducation", "Histoire"],
        tmdbId: 43487
    },
    {
        title: "Albator 78",
        year: 1978,
        description: "Le capitaine Albator, un pirate de l'espace, lutte contre les envahisseurs de la planète Mazone.",
        affiche: "/assets/images/albator_78.jpg",
        genre: ["Science-Fiction", "Aventure"],
        tmdbId: 1726
    },
    {
        title: "Barbapapa",
        year: 1974,
        description: "Les aventures de la famille Barbapapa, des créatures capables de se transformer à volonté.",
        affiche: "/assets/images/barbapapa.jpg",
        genre: ["Famille", "Fantastique"],
        tmdbId: 35007
    },
    {
        title: "Scooby-Doo, où es-tu ?",
        year: 1969,
        description: "Scooby-Doo et ses amis résolvent des mystères impliquant des fantômes et des monstres.",
        affiche: "/assets/images/scooby_doo_ou_es_tu.jpg",
        genre: ["Comédie", "Aventure"],
        tmdbId: 12282
    },
    {
        title: "Maya l'Abeille",
        year: 1975,
        description: "Les aventures de Maya, une jeune abeille qui décide de quitter sa ruche pour découvrir le monde par elle-même.",
        affiche: "/assets/images/maya_l_abeille.jpg",
        genre: ["Aventure", "Famille"],
        tmdbId: 16991
    },
    {
        title: "La Panthère Rose (The Pink Panther Show)",
        year: 1970,
        affiche: "/assets/images/la_panthere_rose.jpg",
        genre: ["Comédie"],
        tmdbId: 1786
    },
    {
        title: "Caliméro",
        year: 1974,
        affiche: "/assets/images/calimero.jpg",
        genre: ["Aventure"],
        tmdbId: 13749
    },
    {
        title: "Capitaine Flam",
        year: 1978,
        affiche: "/assets/images/capitaine-flam.jpg",
        genre: ["Science-Fiction"],
        tmdbId: 4601
    }
];

// Fonction pour obtenir les séries animées des années 70
async function fetchSeries() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();

        // Vérifiez s'il y a des résultats
        const apiSeries = data.results.map(serie => ({
            title: serie.name,
            year: serie.first_air_date ? serie.first_air_date.split('-')[0] : 'N/A',
            description: serie.overview || 'Pas de description disponible',
            affiche: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
            genre: serie.genre_ids.map(id => genreMap[id] || 'Inconnu').join(', '),
            tmdbId: serie.id
        }));

        // Fusionner les deux tableaux
        const combinedSeries = [...cartoons, ...apiSeries];

        // Trier les séries par titre (ordre alphabétique)
        const sortedSeries = combinedSeries.sort((a, b) => a.title.localeCompare(b.title));

        // Construire les cartes pour chaque série
        container.innerHTML = ''; // Vider le conteneur avant d'ajouter les nouvelles cartes
        sortedSeries.forEach(serie => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${serie.affiche}" alt="${serie.title}">
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        container.innerHTML = '<p>Erreur lors de la récupération des données.</p>';
    }
}

// Mapping des genres, à adapter selon vos besoins
const genreMap = {
    16: 'Animation',
    35: 'Comédie',
    18: 'Drame',
    80: 'Crime',
    99: 'Documentaire',
    10402: 'Musique',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science-Fiction',
    10770: 'Téléfilm',
    53: 'Thriller',
    10752: 'Guerre',
    37: 'Western'
};

// Appeler la fonction pour charger les séries au chargement de la page
fetchSeries();

// **************Mode enfant
function modeEnfant() {
    // Basculer entre le mode Enfant et Adulte en ajoutant ou supprimant la classe 'mode-enfant'
    document.body.classList.toggle('mode-enfant');
}


// *************************Pages séries par genres
document.addEventListener('DOMContentLoaded', function() {

    // Configuration des carrousels pour les genres
    const carousels = [
        { id: 'carousel5', queryParams: '&with_genres=16,35' },   // Animation + Comédie
        { id: 'carousel6', queryParams: '&with_genres=16,10759' }, // Animation + Action & Adventure
        { id: 'carousel7', queryParams: '&with_genres=16,10765' },   // Animation + Science-Fiction
        { id: 'carousel8', queryParams: '&with_genres=16,18' }, // Animation + Drame
    ];

    // Fonction pour récupérer et afficher les séries en fonction des paramètres
    function fetchShowsForCarousel(carouselId, queryParams) {
        const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc&first_air_date.lte=2010-12-31${queryParams}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector(`#${carouselId} .carousel-container`);
                if (!container) {
                    console.error(`Le conteneur pour ${carouselId} est introuvable.`);
                    return;
                }

                container.innerHTML = '';

                data.results.forEach(show => {
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-slide', 'card');

                    const img = document.createElement('img');
                    img.classList.add('poster-comic', 'card-img');
                    img.src = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
                    img.alt = `Affiche de ${show.name}`;
                    img.dataset.title = show.name;
                    img.dataset.description = show.overview || 'Pas de description disponible';
                    img.dataset.year = show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A';
                    img.dataset.genre = show.genre_ids.map(id => genreMap[id] || 'Inconnu').join(', ');

                    slide.appendChild(img);
                    container.appendChild(slide);
                });

                // Initialiser le carrousel après l'ajout des images
                initializeCarousel(carouselId);
            })
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
    }

    // Fonction d'initialisation du carrousel
    function initializeCarousel(carouselId) {
        const carousel = document.querySelector(`#${carouselId}`);
        
        if (!carousel) {
            console.error(`Carrousel avec l'ID ${carouselId} introuvable.`);
            return;
        }

        const carouselContainer = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const nextButton = carousel.querySelector('.carousel-control.next');
        
        if (!carouselContainer || slides.length === 0) {
            console.error(`Le conteneur ou les slides sont introuvables dans le carrousel ${carouselId}.`);
            return;
        }

        if (!prevButton || !nextButton) {
            console.error(`Les boutons de contrôle sont introuvables dans le carrousel ${carouselId}.`);
            return;
        }

        let index = 0;

        function getSlidesToShow() {
            if (window.innerWidth <= 480) {
                return 1;
            } else if (window.innerWidth <= 767) {
                return 2;
            } else {
                return 5;
            }
        }

        function goToSlide(index) {
            const slidesToShow = getSlidesToShow();
            const slideWidth = slides[0].offsetWidth;
            const offset = index * slideWidth * slidesToShow;
            carouselContainer.style.transform = `translateX(-${offset}px)`;
        }

        function nextSlide() {
            const slidesToShow = getSlidesToShow();
            index = (index + slidesToShow) % Math.ceil(slides.length / slidesToShow);
            goToSlide(index);
        }

        function prevSlide() {
            const slidesToShow = getSlidesToShow();
            index = (index - slidesToShow + Math.ceil(slides.length / slidesToShow)) % Math.ceil(slides.length / slidesToShow);
            goToSlide(index);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        window.addEventListener('resize', () => {
            goToSlide(index);
        });

        console.log(`Carrousel ${carouselId} initialisé avec succès.`);
    }

    // Initialiser tous les carrousels
    carousels.forEach(carousel => {
        fetchShowsForCarousel(carousel.id, carousel.queryParams);
    });
});

// ***************************Page films par genres************
document.addEventListener('DOMContentLoaded', function() {
    // Configuration des carrousels pour les genres de films d'animation
    const carousels = [
        { id: 'carousel9', queryParams: '&with_genres=16,35' }, // Animation + Comédie
        { id: 'carousel10', queryParams: '&with_genres=16,28' }, // Animation + Aventure
        { id: 'carousel11', queryParams: '&with_genres=16,14' }, // Animation + Fantastique
        { id: 'carousel12', queryParams: '&with_genres=16,18' }, // Animation + Drame
    ];

    // Fonction pour récupérer et afficher les films d'animation en fonction des paramètres
    function fetchMoviesForCarousel(carouselId, queryParams) {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc&release_date.lte=2010-12-31${queryParams}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector(`#${carouselId} .carousel-container`);
                if (!container) {
                    console.error(`Le conteneur pour ${carouselId} est introuvable.`);
                    return;
                }

                container.innerHTML = '';

                data.results.forEach(movie => {
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-slide', 'card');

                    const img = document.createElement('img');
                    img.classList.add('poster-comic', 'card-img');
                    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
                    img.alt = `Affiche de ${movie.title}`;
                    img.dataset.title = movie.title;
                    img.dataset.description = movie.overview || 'Pas de description disponible';
                    img.dataset.year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
                    img.dataset.genre = movie.genre_ids.map(id => genreMap[id] || 'Inconnu').join(', ');

                    slide.appendChild(img);
                    container.appendChild(slide);
                });

                // Initialiser le carrousel après l'ajout des images
                initializeCarousel(carouselId);
            })
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
    }

    // Fonction d'initialisation du carrousel
    function initializeCarousel(carouselId) {
        const carousel = document.querySelector(`#${carouselId}`);
        
        if (!carousel) {
            console.error(`Carrousel avec l'ID ${carouselId} introuvable.`);
            return;
        }

        const carouselContainer = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const nextButton = carousel.querySelector('.carousel-control.next');
        
        if (!carouselContainer || slides.length === 0) {
            console.error(`Le conteneur ou les slides sont introuvables dans le carrousel ${carouselId}.`);
            return;
        }

        if (!prevButton || !nextButton) {
            console.error(`Les boutons de contrôle sont introuvables dans le carrousel ${carouselId}.`);
            return;
        }

        let index = 0;

        function getSlidesToShow() {
            if (window.innerWidth <= 480) {
                return 1;
            } else if (window.innerWidth <= 767) {
                return 2;
            } else {
                return 5;
            }
        }

        function goToSlide(index) {
            const slidesToShow = getSlidesToShow();
            const slideWidth = slides[0].offsetWidth;
            const offset = index * slideWidth * slidesToShow;
            carouselContainer.style.transform = `translateX(-${offset}px)`;
        }

        function nextSlide() {
            const slidesToShow = getSlidesToShow();
            index = (index + slidesToShow) % Math.ceil(slides.length / slidesToShow);
            goToSlide(index);
        }

        function prevSlide() {
            const slidesToShow = getSlidesToShow();
            index = (index - slidesToShow + Math.ceil(slides.length / slidesToShow)) % Math.ceil(slides.length / slidesToShow);
            goToSlide(index);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        window.addEventListener('resize', () => {
            goToSlide(index);
        });

        console.log(`Carrousel ${carouselId} initialisé avec succès.`);
    }

    // Initialiser tous les carrousels
    carousels.forEach(carousel => {
        fetchMoviesForCarousel(carousel.id, carousel.queryParams);
    });
});









 main
