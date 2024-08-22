/* ///////////////////////// inscription & connexion  //////////////////////////////
// Exécuter ce code une fois que le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner le formulaire d'inscription par son ID
    const signupForm = document.getElementById('signupForm');
    // Sélectionner le formulaire de connexion par son ID
    const loginForm = document.getElementById('loginForm');
    // Sélectionner l'élément pour afficher les messages d'inscription
    const signupMessage = document.getElementById('signupMessage');
    // Sélectionner l'élément pour afficher les messages de connexion
    const loginMessage = document.getElementById('loginMessage');

    // Définir des identifiants fictifs pour tester la connexion
    const validCredentials = {
        email: 'retrotoon@descodeuses.com',
        password: 'password123'
    };

    // Ajouter un écouteur d'événements au formulaire d'inscription
    signupForm.addEventListener('submit', (event) => {
        // Empêcher l'envoi du formulaire par défaut
        event.preventDefault();

        // Récupérer les valeurs des champs d'inscription
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const signupEmail = document.getElementById('signupEmail').value;
        const birthDate = document.getElementById('birthDate').value;
        const signupPassword = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Vérifier si les mots de passe correspondent
        if (signupPassword !== confirmPassword) {
            // Afficher un message d'erreur si les mots de passe ne correspondent pas
            signupMessage.textContent = 'Les mots de passe ne correspondent pas.';
            signupMessage.className = 'error'; // Appliquer une classe pour styliser l'erreur
            return;
        }

        // Vérifier si les conditions générales d'utilisation sont acceptées
        if (!termsAccepted) {
            // Afficher un message d'erreur si les conditions ne sont pas acceptées
            signupMessage.textContent = 'Vous devez accepter les conditions générales.';
            signupMessage.className = 'error'; // Appliquer une classe pour styliser l'erreur
            return;
        }

        // Si tout est correct, afficher un message de succès
        signupMessage.textContent = 'Inscription réussie !';
        signupMessage.className = 'success'; // Appliquer une classe pour styliser le succès
        // Ici, on pourrait rediriger l'utilisateur ou enregistrer les informations
    });

    // Ajouter un écouteur d'événements au formulaire de connexion
    loginForm.addEventListener('submit', (event) => {
        // Empêcher l'envoi du formulaire par défaut
        event.preventDefault();

        // Récupérer les valeurs des champs de connexion
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        // Vérifier si les identifiants correspondent aux identifiants fictifs
        if (loginEmail === validCredentials.email && loginPassword === validCredentials.password) {
            // Afficher un message de succès si les identifiants sont corrects
            loginMessage.textContent = 'Connexion réussie !';
            loginMessage.className = 'success'; // Appliquer une classe pour styliser le succès
            // Ici, on pourrait rediriger l'utilisateur ou faire autre chose après la connexion
        } else {
            // Afficher un message d'erreur si les identifiants sont incorrects
            loginMessage.textContent = 'Identifiant ou mot de passe incorrect.';
            loginMessage.className = 'error'; // Appliquer une classe pour styliser l'erreur
        }
    });
}); */

const signupForm = document.getElementById('signupForm')
const loginForm = document.getElementById('loginForm')
const switchToSignup = document.getElementById('switchToSignup')
const switchToLogin = document.getElementById('switchToLogin')


signupForm.classList.add('active');

  // Basculer vers le formulaire de connexion
  switchToLogin.addEventListener('click', function() {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
  });

  // Basculer vers le formulaire d'inscription
  switchToSignup.addEventListener('click', function() {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
  });


function inscrit(){
    const nom = document.getElementById('lastName').value;
    const prenom = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('birthDate').value;
    const password = document.getElementById('password').value;
    if (nom && prenom && email && date && password) {
        // Stockage les informations dans localStorage
        localStorage.setItem('nom', nom);
        localStorage.setItem('prenom', prenom);
        localStorage.setItem('email', email);
        localStorage.setItem('date', date);
        localStorage.setItem('password', password);
        alert('Inscription réussie !')
        alert('Inscription réussie !')
        window.location.href = 'page_d_accueil.html'
      } else {
        alert('Veuillez remplir tous les champs.');
      }
    }



    
let loginMessage = document.getElementById('LoginMessage')
//declaration de la fonction du bouton de la connexion
function connect( ) {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    //recuperation les donnees qui sont stockes dans le local storage
    const storedNom = localStorage.getItem('nom')
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (email === storedEmail && password === storedPassword) {
        alert('Bienvenue, ' + storedNom + ' !');
      } else {
        alert('Votre email ou mot de passe incorrect.');
      }
    }

