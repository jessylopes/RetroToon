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
    const form = document.getElementById('searchForm');
    let filterType = 'all'; // Type de filtre par défaut

    // Ajoute un événement au clic sur l'icône de recherche
    searchIcon.addEventListener('click', () => {
        searchBox.classList.toggle('active'); // Ajoute ou supprime la classe active
        searchBox.focus(); // Focalise la barre de recherche pour permettre la saisie de texte
    });

    // Gestion de l'événement "keydown" sur la barre de recherche
    searchBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchQuery = searchBox.value.trim();
            if (searchQuery) {
                // Redirige vers la page des résultats avec la requête de recherche et le filtre
                window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
            }
        }
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        const searchQuery = searchBox.value.trim();
        if (searchQuery) {
            // Redirige vers la page des résultats avec la requête de recherche et le filtre
            window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
        }
    });
});

/************************         FONCTION DE MAIN PAGE PARAMETRE       ********************/

// Fonction pour cacher tous les pages et afficher que la page demandée
function afficherPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const pageActive = document.getElementById(pageId);
    if (pageActive) {
        pageActive.classList.add('active');
    }
}
//les boutons de retour
document.querySelectorAll('.choixParametre').forEach(element => {
    element.addEventListener('click', () => {
        const targetPage = element.getAttribute('data-page');
        afficherPage(targetPage);
    });
});
document.querySelectorAll('.retourPage').forEach(element => {
    element.addEventListener('click', () => {
        const targetPage = element.getAttribute('data-page');
        afficherPage(targetPage);
    });
});

document.getElementById('saveCodeButton').addEventListener('click', function () {
    const codeInput = document.getElementById('code').value;
    const messageElement = document.getElementById('message');

    // Vérification que le code est composé de quatre chiffres uniquement
    if (/^\d{4}$/.test(codeInput)) {
        // Enregistrer le code parental dans le stockage local (ou toute autre méthode de stockage)
        localStorage.setItem('parentalCode', codeInput);
        messageElement.textContent = 'Code parental enregistré avec succès !';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'Veuillez entrer un code à 4 chiffres uniquement.';
        messageElement.style.color = 'red';
    }
});

const logOut = document.querySelector('.choixParametre[data-page="page-gestion-compte-6"]');
logOut.addEventListener('click', function () {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    window.location.href = '/html/index.html';
})