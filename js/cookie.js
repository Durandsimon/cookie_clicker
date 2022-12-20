// récupérer le click sur l'arbre 
document.querySelector("#arbre").addEventListener("click", MAJ);

// récupérer le click sur l'asteroide 
document.querySelector("#asteroide").addEventListener("click", MAJ);

// récupérer la touche enter et active la fonction maj
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        MAJ_auto();
    }
});

// easter egg change le sabre laser en rouge
document.querySelector("#laser").addEventListener("click", change_sabre_laser);
document.querySelector("#laser2").addEventListener("click", change_sabre_laser);

// récupère le click de X2
document.querySelector("#X2").addEventListener("click", multiplier);

// récupère le click du bouton auto-click
document.querySelector("#auto").addEventListener("click", auto_click);

// récupère le click du bouton nouveau level
document.querySelector("#level").addEventListener("click", nextlevel);

// récupérer le click sur la pomme/etoile
document.querySelector("#pomme").addEventListener("click", frenesie);
document.querySelector("#etoile").addEventListener("click", frenesie);



// déclaration variable 

let click_incrementeur = 1;
let utilisation_multiplier = 0;
let utilisation_multiplier_lune = 0;
let utilisation_auto = 0;
let vitesse = 1000;
let vitesse_news = 0
let valeur_auto = 40;
let valeur_fois = 20;
let rotation_hache = 0;
let id_objet = '';
let intervalle = undefined;
let valeur_lune = 8000;
let nom_image_monaie = 'charpente';
let utilisation_news_lune = 0;
let nom_obj_frenesie = '#pomme';
let utilisation_intervalle2 = 0;
let nom_pluie = 'apple';
let multiplicateur_frenesie = 12;

const armes = [
    {nom: "baton", cout: 20},
    {nom: "faux", cout: 50},
    {nom: "hache", cout: 250},
    {nom: "massue", cout: 500},
    {nom: "epee", cout: 1000},
    {nom: "kunai", cout: 2000},
    {nom: "katana", cout: 4000},
    {nom: "laser", cout: 8000},
]
const batiment = [
    {nom: "ferme", cout: 40, vitesse : 1000},
    {nom: "silo", cout: 500, vitesse : 700},
    {nom: "tracteur", cout: 1000, vitesse : 500},
    {nom: "moissoneuse", cout: 2000, vitesse : 300},
    {nom: "fusee", cout: 4000, vitesse : 100},
    {nom: "module", cout: 8000, vitesse : 70},
    {nom: "vehicule", cout: 16000, vitesse : 50},
    {nom: "ovni", cout: 30000, vitesse : 30},
]



const phrase_arbre = [
    "Découvre le prochain niveau quand tu aura "+valeur_lune+" buches",
    "Les pommiers sont des arbres du genre botanique Malus et de la famille des Rosacées, dont le fruit est la pomme.",
    "Continue de cliquer tu es encore loin de la fin !!",
    "La pomme est un fruit comestible produit par un pommier. 🙂",
    "Jadis, on utilisait les vertus thérapeutiques de la pomme pour collectionner des onguents d'où le mot pommade."

    
]

const phrase_lune = [
    "Déjà plus de 11 360 buche de bois dépenser 😮",
    "Le 21 juillet 1969, Neil Armstrong est devenu le premier homme à poser un pied sur la Lune au cours de la mission Apollo 11.",
    "Un astéroïde est une planète mineure composée de roches, de métaux et de glaces, et dont les dimensions varient de l'ordre du mètre à plusieurs centaines de kilomètres.",
    "7 journée lunaire dure environ 14 jours terrestres"
]

// fonction qui retourne un chiffre aléatoire entre min et max
function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

// fonction pour faire +1
function MAJ(){
    let n = document.querySelector("#resultat").innerHTML;
    n = Number(n);
    n = n+click_incrementeur;

    document.querySelector("#resultat").innerHTML = n;
    if (n >= (valeur_lune)) {
        document.querySelector("#level").style.display = 'block';
        document.querySelector("#level").innerHTML = 'Lune : '+valeur_lune+' <img class="bois" src="./img/'+nom_image_monaie+'.png">';
    }
    //news de la lune pour quelle soit lu en permanence, elle permet dafficher le message au tier de la valeur de la lune
    if (n >= (valeur_lune/3) && utilisation_news_lune == 0 || document.querySelector('#X2').style.display == "none" && document.querySelector('#auto').style.display == "none" ) {
        document.querySelector('#news').innerHTML = phrase_arbre[0];
        utilisation_news_lune = 1;
    }

    if (document.querySelector("#asteroide").style.display == 'block') {
        document.querySelector("#level").style.display = 'none';
    }

    if (rotation_hache == 0) {
        document.querySelector("#laser2").style.transform = 'rotate('+rotation_hache+'deg)'
        document.querySelector("#"+id_objet+"").style.transform = 'rotate('+rotation_hache+'deg)';
        rotation_hache = 90;
    }
    else if(rotation_hache == 90){
        document.querySelector("#laser2").style.transform = 'rotate('+rotation_hache+'deg)';
        document.querySelector("#"+id_objet+"").style.transform = 'rotate('+rotation_hache+'deg)';
        rotation_hache = 0
    }
    else{

    }
    
}

// fonction pour multiplier sur la terre
function multiplier(){
    let n = document.querySelector("#resultat").innerHTML;
    n = Number(n);


    if (n >= armes[utilisation_multiplier].cout) {
        document.querySelector('#news').innerHTML = phrase_arbre[entierAleatoire(1,phrase_arbre.length-1)];
        if (utilisation_multiplier >= armes.length-1) {
            document.querySelector("#X2").style.filter = "grayscale(100%)";
            document.querySelector("#X2").style.backgroundColor = "grey";
            document.querySelector("#"+armes[utilisation_multiplier-1].nom+"").style.display =  "none";
        }
        else if (utilisation_multiplier == 0) {
            
        }
        else  {
            document.querySelector("#"+armes[utilisation_multiplier-1].nom+"").style.display =  "none";
        }
        click_incrementeur = utilisation_multiplier+2;
        document.querySelector("#resultat").innerHTML = n-armes[utilisation_multiplier].cout;
        document.querySelector("#multiplicateur").innerHTML = "X"+click_incrementeur;
        id_objet = armes[utilisation_multiplier].nom;
        document.querySelector("#"+armes[utilisation_multiplier].nom+"").style.display =  "block";
        utilisation_multiplier += 1;
        document.querySelector("#X2").innerHTML = armes[utilisation_multiplier].nom+' : '+armes[utilisation_multiplier].cout+' <img class="bois" src="./img/'+nom_image_monaie+'.png">';
        
    }

    if (document.querySelector("#katana").style.display == 'block') {
        document.querySelector("#X2").style.display = 'none';
    }
    

}

// fonction pour +1 sans les mvmt de hache
function MAJ_auto() {
    let n = document.querySelector("#resultat").innerHTML;
    n = Number(n);
    n = n+click_incrementeur;
    document.querySelector("#resultat").innerHTML = n;
}

// fonction vitesse 
function Vitesse(vitesse){
    if(intervalle != undefined)
        clearInterval(intervalle);
    intervalle = setInterval(MAJ_auto, vitesse);
}

// fonction auto click 
function auto_click(){
    let n = document.querySelector("#resultat").innerHTML;
    n = Number(n);
    
    if (n >= batiment[utilisation_auto].cout) {
        document.querySelector('#news').innerHTML = phrase_arbre[entierAleatoire(1,phrase_arbre.length-1)];
        if (utilisation_auto >= batiment.length-1) {
            document.querySelector("#auto").style.filter = "grayscale(100%)";
            document.querySelector("#auto").style.backgroundColor = "grey";
        }
        else{}
        document.querySelector("#resultat").innerHTML = n-batiment[utilisation_auto].cout;
        Vitesse(batiment[utilisation_auto].vitesse);
        document.querySelector("#"+batiment[utilisation_auto].nom+"").style.display =  "block"
        utilisation_auto += 1;
        document.querySelector("#auto").innerHTML = batiment[utilisation_auto].nom+' : '+batiment[utilisation_auto].cout+' <img class="bois" src="./img/'+nom_image_monaie+'.png">';
    }

    if (document.querySelector("#moissoneuse").style.display == 'block') {
        document.querySelector("#auto").style.display = 'none';
    }

    
}

// nouveau niveau 
function nextlevel(){
    let n = document.querySelector("#resultat").innerHTML;
    n = Number(n)
    if (document.querySelector("#asteroide").style.display == "block") {
        
    }
    else {
        if (n >= valeur_lune) {
            // enlever le prix de la lune 
            document.querySelector("#resultat").innerHTML = n - valeur_lune

            // changer les décor
            document.querySelector("#background-video-etoile").style.display = "block";
            document.querySelector("#arbre").style.display = "none";
            document.querySelector("#asteroide").style.display = "block";

            // changer la couleur du texte par rapport au décor
            document.querySelector("html").style.color = "white";
            document.querySelector("#X2").style.color = "black";
            document.querySelector("#auto").style.color = "black";
            document.querySelector("#level").style.color = "black";

            // changer bois en asteroide 
            nom_image_monaie = 'asteroide'
            document.querySelector("#auto").innerHTML = batiment[utilisation_auto].nom+' : '+batiment[utilisation_auto].cout+' <img class="bois" src="./img/'+nom_image_monaie+'.png">';
            document.querySelector("#X2").innerHTML = armes[utilisation_multiplier].nom+' : '+armes[utilisation_multiplier].cout+' <img class="bois" src="./img/'+nom_image_monaie+'.png">';


            // enlever les éléments existant sur le background et changer la couleur du background
            document.querySelector('#ferme').style.display = "none" ;
            document.querySelector('#silo').style.display = "none" ;
            document.querySelector('#tracteur').style.display = "none" ;
            document.querySelector('#moissoneuse').style.display = "none" ;
            document.querySelector('#herbe').style.backgroundColor = "grey" ;
            document.querySelector('#pomme').style.display = "none";


            // affichage nouveau bouton 
            document.querySelector('#X2').style.display = "block" ;
            document.querySelector('#auto').style.display = "block" ;
            document.querySelector('#bois_score').style.display = "none" ;
            document.querySelector('#meteor_score').style.display = "block" ;

            // enlever le bouton lune
            document.querySelector('#level').style.display = "none" ;

            //changer la pomme en minerais
            nom_obj_frenesie = '#etoile';
            nom_pluie = 'etoile'

            // changer les phrases de news
            phrase_arbre.length = 0;
            phrase_arbre.push(...phrase_lune);
            document.querySelector('#news').innerHTML = phrase_arbre[0];

            // change la valeur de la frénésie
            multiplicateur_frenesie = 20;

            // relance le timer de l'apparition de la pomme / étoile
            intervalle2 = setInterval(prep_frenesie, entierAleatoire(15000,20000))
        }
    }
    
}

// apparition de la pomme ou de l'étoile pour la frénésie
if (utilisation_intervalle2 == 0) {
    intervalle2 = setInterval(prep_frenesie, entierAleatoire(15000,20000))
    utilisation_intervalle2 = 1;
}



function prep_frenesie() {
    // définit la zone d'apparition de la pomme ou de l'étoile pour lancer la frénésie
    document.querySelector('#pomme').style.right = entierAleatoire(82,120)+"vh";
    document.querySelector('#pomme').style.bottom = entierAleatoire(26,46)+"vh";
    document.querySelector('#etoile').style.left = entierAleatoire(140,190)+"vh";
    document.querySelector('#etoile').style.bottom = entierAleatoire(20,40)+"vh";
    document.querySelector(nom_obj_frenesie).style.display = "block";
    clearInterval(intervalle2);
}

function frenesie(){
    document.querySelector(nom_obj_frenesie).style.display = "none";
    // intervalle d'apparition de la pomme ou de l'étoile
    intervalle2 = setInterval(prep_frenesie, entierAleatoire(15000,35000))
    click_incrementeur_debut = click_incrementeur;
    click_incrementeur = multiplicateur_frenesie;
    document.querySelector("#multiplicateur").innerHTML = "X"+click_incrementeur;
    intervalle3 = setInterval(act_frenesie ,5000)
    const NB_OBJ_FRENESIE = 50;
    // boucle pour faire apparaitre les objets en arrière plan 
    for (let index = 0; index < NB_OBJ_FRENESIE; index++) {
        const element = document.createElement('img');
        element.src = './img/'+nom_pluie+'.png'
        element.className = 'pomme'
        x = Math.round(Math.random() * 95)
        y = Math.round(Math.random() * 100)
        element.style.left = x + 'vw';
        element.style.top = y + 'vh';
        document.querySelector('body').appendChild(element)
    }
}

// effet de la frénésie
function act_frenesie(){
    document.querySelector('#multiplicateur').innerHTML = "X" + click_incrementeur_debut;
    click_incrementeur = click_incrementeur_debut;
    clearInterval(intervalle3);
}

//change le sabre laser
function change_sabre_laser() {
    if (document.querySelector("#laser").style.display == "none") {
        document.querySelector("#laser").style.display = "block";
        document.querySelector("#laser2").style.display = "none";
    }
    else {
        document.querySelector("#laser2").style.display = "block";
        document.querySelector("#laser").style.display = "none";
    }
    
}

