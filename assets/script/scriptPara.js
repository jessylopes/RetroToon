// sous menu
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
/************************         FONCTION DE MAIN PAGE PARAMETRE       ********************/
//menu deroulant
function toggleContent(contentId) {
    // Récupère tous les éléments de contenu caché
    const allContent = document.querySelectorAll('.panel');

    // Boucle pour cacher tous les contenus
    allContent.forEach(content => {
        content.style.display = "none"; // Cache tout le contenu
    });

    // Affiche le contenu correspondant au bouton cliqué
    const selectedContent = document.getElementById(contentId);
    selectedContent.style.display = "block"; // Affiche le contenu cliqué
}


// Fonction pour initialiser l'affichage au chargement de la page
function init() {
    // Ouvre le premier panel par défaut
    const firstPanel = document.querySelector('.panel'); // Sélectionne le premier panel
    if (firstPanel) {
        firstPanel.style.display = "block"; // Affiche le premier panel
    }
}

function getSlidesToShow() {
    if (window.innerWidth <= 480) {
        window.removeEventListener('resize', getSlidesToShow);
    } else {
        window.onload = init
    }
}
getSlidesToShow()

window.addEventListener('resize', getSlidesToShow)



const acc = document.getElementsByClassName("gestion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");

        let contenuCache = this.nextElementSibling;
        if (contenuCache.style.display === "block") {
            contenuCache.style.display = "none";
        } else {
            contenuCache.style.display = "block";
        }
    });
}

/* function modeEnfant() {
    // Basculer entre le mode Enfant et Adulte en ajoutant ou supprimant la classe 'mode-enfant'
    document.body.classList.toggle('mode-enfant');
} */
