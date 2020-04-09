// les écouteurs d'évènement ne doivent être chargés que lorsque l'arbre DOM est prêt
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("le document est chargé, on peut ajouter des écouteurs");

    // le bouton "submit" provoque l'envoi des données au serveur
    // on va l'en empêcher pour pouvoir vérifier tranquillement le contenu
    document.querySelector("#envoi").addEventListener("click", async function (event) {
        // on bloque l'envoi du formulaire vers le serveur..
        event.preventDefault();
        if (!validerFormulaire()) {
            document.getElementById('resultat').innerHTML = " Il y a des erreurs! *</br>";
        } else {
            document.getElementById('resultat').innerHTML = " Formulaire envoyé! *</br>";
            document.querySelector("#formulaire").submit();
        }

    }, false);
});

// fonction globale de validation du formulaire
function validerFormulaire() {
    if (!validerNom()) {
        return false;
    }

    if (!validerMessage()){
        return false;
    }
    // vous pouvez insérer d'autres éléments de validation ici

    // si aucune erreur n'a été trouvée, on arrive ici
    return true;
}

// fonction de validation du nom
function validerNom() {
    var nom = document.querySelector("#name").value;
    var taille_mini_nom=3
    if (!verifierTaille(nom, taille_mini_nom)){
        document.getElementById('erreurNom').innerHTML = " Votre nom est trop court *</br>";
        return false;
    } else if (!verifierCaracteresInterdits(nom)) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits
        document.getElementById('erreurNom').innerHTML = " Ceci n'est pas un Nom *</br>";
        return false;
    } else {
        return true;
    }
}

// fonction de validation du message
function validerMessage(){
    var message = document.querySelector("#msg").value; 
    if (!verifierCaracteresInterdits(message)) {
        document.getElementById('erreurMes').innerHTML = " Votre message contient des caractères interdits*</br>";
        return false;
    } else {
        return true;
    }
}

// la chaine doivent avoir une taille d'au moins la taille fournie
function verifierTaille(chaine, taille_mini_chaine) {
    if (chaine.length < taille_mini_chaine) {
        return false;
    }else{
        return true;
    }
}

// les chaines ne peuvent contenir que 
// des lettres 
// des chiffres
// des espaces
// des apostrophes
function verifierCaracteresInterdits(chaine){
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    if(/^[a-zA-Z0-9 ']*$/.test(chaine) == false){
        return false;
    }
    return true;
};