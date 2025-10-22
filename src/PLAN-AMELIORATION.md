CODE À AJOUTER ICI "src/App.js"


// Import des outils React
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ========== ÉTAT 1 : GESTION DE L'ONBOARDING ==========
  const [onboardingTermine, setOnboardingTermine] = useState(false);
  const [pageOnboarding, setPageOnboarding] = useState(0);

  // ========== ÉTAT 2 : RÉPONSES DU QUESTIONNAIRE ==========
  const [reponses, setReponses] = useState({
    nom: '',
    objectif: '',
    experience: 'debutant'
  });

  // ========== ÉTAT 3 : GESTION DES TÂCHES ==========
  const [taches, setTaches] = useState(() => {
    const saved = localStorage.getItem('mesTaches');
    return saved ? JSON.parse(saved) : [];
  });
  const [nouvelleTache, setNouvelleTache] = useState('');
  const [filtre, setFiltre] = useState('toutes');
  
  // ========== ÉTAT 4 : CATÉGORIES ==========
  const [categorie, setCategorie] = useState('personnel');
  const [filtreCategorie, setFiltreCategorie] = useState('toutes');

  // Catégories disponibles
  const categories = [
    { id: 'personnel', nom: 'Personnel', couleur: '#0000ff' },
    { id: 'travail', nom: 'Travail', couleur: '#008080' },
    { id: 'courses', nom: 'Courses', couleur: '#ff0000' },
    { id: 'sante', nom: 'Santé', couleur: '#0080ff' },
    { id: 'loisirs', nom: 'Loisirs', couleur: '#006400' }
  ];

  // ========== EFFET : SAUVEGARDE AUTOMATIQUE ==========
  useEffect(() => {
    localStorage.setItem('mesTaches', JSON.stringify(taches));
  }, [taches]);

  // ========== FONCTIONS DE L'ONBOARDING ==========
  const pageSuivante = () => {
    if (pageOnboarding < 2) {
      setPageOnboarding(pageOnboarding + 1);
    }
  };

  const pagePrecedente = () => {
    if (pageOnboarding > 0) {
      setPageOnboarding(pageOnboarding - 1);
    }
  };

  const changerReponse = (champ, valeur) => {
    setReponses({
      ...reponses,
      [champ]: valeur
    });
  };

  const terminerOnboarding = () => {
    localStorage.setItem('profilUtilisateur', JSON.stringify(reponses));
    setOnboardingTermine(true);
  };

  // ========== FONCTIONS DES TÂCHES ==========
  const ajouterTache = () => {
    if (nouvelleTache.trim() !== '') {
      const tache = {
        id: Date.now(),
        texte: nouvelleTache,
        terminee: false,
        categorie: categorie
      };
      setTaches([...taches, tache]);
      setNouvelleTache('');
    }
  };

  const toggleTache = (id) => {
    setTaches(taches.map(tache => 
      tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
    ));
  };

  const supprimerTache = (id) => {
    setTaches(taches.filter(tache => tache.id !== id));
  };

  const supprimerTachesTerminees = () => {
    setTaches(taches.filter(tache => !tache.terminee));
  };

  // ========== FILTRAGE DES TÂCHES ==========
  const tachesFiltrees = taches.filter(tache => {
    // Filtre par état
    let filtreEtat = true;
    switch (filtre) {
      case 'actives':
        filtreEtat = !tache.terminee;
        break;
      case 'terminees':
        filtreEtat = tache.terminee;
        break;
      default:
        filtreEtat = true;
    }
    
    // Filtre par catégorie
    let filtreCat = true;
    if (filtreCategorie !== 'toutes') {
      filtreCat = tache.categorie === filtreCategorie;
    }
    
    return filtreEtat && filtreCat;
  });

  // ========== AFFICHAGE : ONBOARDING ==========
  if (!onboardingTermine) {
    return (
      <div className="onboarding">
        {/* PAGE 1 : BIENVENUE */}
        {pageOnboarding === 0 && (
          <div className="page-onboarding">
            <div className="cercle-bienvenue">📝</div>
            <h1>Bienvenue sur votre Todo List</h1>
            <p>Organisez votre vie, une tâche à la fois</p>
            <div className="indicateur-pages">
              <span className="page-active">●</span>
              <span>○</span>
              <span>○</span>
            </div>
            <button className="bouton-primaire" onClick={pageSuivante}>
              Commencer
            </button>
          </div>
        )}

        {/* PAGE 2 : QUESTIONNAIRE - NOM */}
        {pageOnboarding === 1 && (
          <div className="page-onboarding">
            <h2>Comment vous appelez-vous ?</h2>
            <input
              type="text"
              value={reponses.nom}
              onChange={(e) => changerReponse('nom', e.target.value)}
              placeholder="Votre nom..."
              className="champ-texte"
            />
            <div className="indicateur-pages">
              <span>○</span>
              <span className="page-active">●</span>
              <span>○</span>
            </div>
            <div className="boutons-navigation">
              <button className="bouton-secondaire" onClick={pagePrecedente}>
                Retour
              </button>
              <button 
                className="bouton-primaire" 
                onClick={pageSuivante}
                disabled={!reponses.nom.trim()}
              >
                Suivant
              </button>
            </div>
          </div>
        )}

        {/* PAGE 3 : QUESTIONNAIRE - OBJECTIF ET EXPÉRIENCE */}
        {pageOnboarding === 2 && (
          <div className="page-onboarding">
            <h2>Dernières questions</h2>
            
            <div className="question-groupe">
              <label>Quel est votre objectif principal ?</label>
              <input
                type="text"
                value={reponses.objectif}
                onChange={(e) => changerReponse('objectif', e.target.value)}
                placeholder="Ex: Organiser mon travail..."
                className="champ-texte"
              />
            </div>

            <div className="question-groupe">
              <label>Votre niveau avec les todo lists :</label>
              <select 
                value={reponses.experience}
                onChange={(e) => changerReponse('experience', e.target.value)}
                className="select-option"
              >
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className="indicateur-pages">
              <span>○</span>
              <span>○</span>
              <span className="page-active">●</span>
            </div>
            <div className="boutons-navigation">
              <button className="bouton-secondaire" onClick={pagePrecedente}>
                Retour
              </button>
              <button 
                className="bouton-primaire" 
                onClick={terminerOnboarding}
                disabled={!reponses.objectif.trim()}
              >
                Terminer
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ========== AFFICHAGE : APPLICATION PRINCIPALE ==========
  return (
    <div className="App">
      <div className="container">
        
        {/* EN-TÊTE PERSONNALISÉE */}
        <div className="en-tete-personnalise">
          <h1>📝 Todo List de {reponses.nom}</h1>
          <p className="sous-titre">Objectif : {reponses.objectif}</p>
        </div>

        {/* SÉLECTEUR DE CATÉGORIE */}
        <div className="selection-categorie">
          <label>Catégorie : </label>
          <div className="categories-boutons">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategorie(cat.id)}
                className={`bouton-categorie ${categorie === cat.id ? 'actif' : ''}`}
                style={{ 
                  borderColor: cat.couleur,
                  background: categorie === cat.id ? cat.couleur : 'white'
                }}
              >
                {cat.nom}
              </button>
            ))}
          </div>
        </div>

        {/* ZONE D'AJOUT DE TÂCHES */}
        <div className="ajout-tache">
          <input
            type="text"
            value={nouvelleTache}
            onChange={(e) => setNouvelleTache(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && ajouterTache()}
            placeholder="Nouvelle tâche..."
            className="champ-saisie"
          />
          <button onClick={ajouterTache} className="bouton-ajouter">
            Ajouter
          </button>
        </div>

        {/* FILTRES PAR CATÉGORIE */}
        <div className="filtres-categories">
          <span>Filtrer par catégorie : </span>
          <select 
            value={filtreCategorie} 
            onChange={(e) => setFiltreCategorie(e.target.value)}
            className="select-categorie"
          >
            <option value="toutes">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
        </div>

        {/* FILTRES PAR ÉTAT */}
        <div className="filtres">
          <button 
            onClick={() => setFiltre('toutes')}
            className={`bouton-filtre ${filtre === 'toutes' ? 'actif' : ''}`}
          >
            Toutes ({taches.length})
          </button>
          <button 
            onClick={() => setFiltre('actives')}
            className={`bouton-filtre ${filtre === 'actives' ? 'actif' : ''}`}
          >
            Actives ({taches.filter(t => !t.terminee).length})
          </button>
          <button 
            onClick={() => setFiltre('terminees')}
            className={`bouton-filtre ${filtre === 'terminees' ? 'actif' : ''}`}
          >
            Terminées ({taches.filter(t => t.terminee).length})
          </button>
        </div>

        {/* LISTE DES TÂCHES */}
        <div className="liste-taches">
          {tachesFiltrees.length === 0 ? (
            <div className="message-vide">
              <p>📋 Aucune tâche {filtre !== 'toutes' ? filtre : ''}</p>
              <p className="sous-message">Ajoutez votre première tâche !</p>
            </div>
          ) : (
            tachesFiltrees.map(tache => {
              const cat = categories.find(c => c.id === tache.categorie);
              return (
                <div key={tache.id} className={`tache ${tache.terminee ? 'terminee' : ''}`}>
                  <span 
                    onClick={() => toggleTache(tache.id)}
                    className="texte-tache"
                  >
                    <span 
                      className="badge-categorie"
                      style={{ backgroundColor: cat?.couleur }}
                    >
                      {cat?.nom}
                    </span>
                    {tache.terminee ? '✅' : '⭕'} {tache.texte}
                  </span>
                  <button 
                    onClick={() => supprimerTache(tache.id)}
                    className="bouton-supprimer"
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* BOUTON NETTOYAGE */}
        {taches.some(t => t.terminee) && (
          <div className="actions-globales">
            <button 
              onClick={supprimerTachesTerminees}
              className="bouton-nettoyer"
            >
              🧹 Supprimer les tâches terminées
            </button>
          </div>
        )}

        {/* STATISTIQUES */}
        {taches.length > 0 && (
          <div className="statistiques">
            <p>
              Total: {taches.length} | 
              Actives: {taches.filter(t => !t.terminee).length} | 
              Terminées: {taches.filter(t => t.terminee).length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


---------


CODE À AJOUTER ICI "src/App.css"

/* ===== RÉINITIALISATION ET STYLES DE BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: white;
  color: black;
  line-height: 1.6;
}

/* ===== ONBOARDING ===== */
.onboarding {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
}

.page-onboarding {
  text-align: center;
  max-width: 400px;
  width: 100%;
  padding: 40px 20px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
}

.cercle-bienvenue {
  font-size: 4rem;
  margin-bottom: 20px;
}

.page-onboarding h1 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: black;
}

.page-onboarding h2 {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: black;
}

.page-onboarding p {
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: black;
}

.indicateur-pages {
  margin: 30px 0;
}

.indicateur-pages span {
  font-size: 1.5rem;
  margin: 0 5px;
  color: #ccc;
}

.page-active {
  color: blue !important;
}

.champ-texte {
  width: 100%;
  padding: 12px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 20px;
  background-color: white;
  color: black;
}

.champ-texte:focus {
  outline: none;
  border-color: blue;
}

.question-groupe {
  margin-bottom: 25px;
  text-align: left;
}

.question-groupe label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: black;
}

.select-option {
  width: 100%;
  padding: 12px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
  color: black;
}

.select-option:focus {
  outline: none;
  border-color: blue;
}

.boutons-navigation {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.bouton-primaire {
  background-color: blue;
  color: white;
  border: 2px solid blue;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.bouton-primaire:hover:not(:disabled) {
  background-color: #0000cc;
  border-color: #0000cc;
}

.bouton-primaire:disabled {
  background-color: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

.bouton-secondaire {
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.bouton-secondaire:hover {
  background-color: #f0f0f0;
}

/* ===== APPLICATION PRINCIPALE ===== */
.App {
  min-height: 100vh;
  background-color: white;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.en-tete-personnalise {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
}

.en-tete-personnalise h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: black;
}

.sous-titre {
  color: #666;
  font-size: 1rem;
}

/* ===== CATÉGORIES ===== */
.selection-categorie {
  margin: 20px;
  text-align: center;
}

.selection-categorie label {
  font-weight: bold;
  margin-right: 10px;
  color: black;
}

.categories-boutons {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.bouton-categorie {
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
  color: black;
  background-color: white;
}

.bouton-categorie.actif {
  background-color: blue;
  color: white;
  border-color: blue;
}

.bouton-categorie:hover {
  border-color: blue;
}

.filtres-categories {
  text-align: center;
  margin: 15px;
  color: black;
}

.select-categorie {
  padding: 8px 12px;
  border: 2px solid black;
  border-radius: 8px;
  background: white;
  margin-left: 10px;
  color: black;
}

.select-categorie:focus {
  outline: none;
  border-color: blue;
}

.badge-categorie {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  color: white;
  font-size: 10px;
  margin-right: 8px;
  font-weight: bold;
  background-color: blue;
}

/* ===== ZONE D'AJOUT ===== */
.ajout-tache {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.champ-saisie {
  flex: 1;
  padding: 12px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
}

.champ-saisie:focus {
  outline: none;
  border-color: blue;
}

.bouton-ajouter {
  background-color: blue;
  color: white;
  border: 2px solid blue;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.bouton-ajouter:hover {
  background-color: #0000cc;
  border-color: #0000cc;
}

/* ===== FILTRES ===== */
.filtres {
  display: flex;
  gap: 10px;
  margin: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.bouton-filtre {
  padding: 10px 20px;
  border: 2px solid black;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  color: black;
}

.bouton-filtre:hover {
  border-color: blue;
}

.bouton-filtre.actif {
  background: blue;
  color: white;
  border-color: blue;
}

/* ===== LISTE DES TÂCHES ===== */
.liste-taches {
  margin-bottom: 20px;
}

.message-vide {
  text-align: center;
  padding: 40px 20px;
  border: 2px dashed black;
  border-radius: 10px;
  color: black;
  background-color: white;
}

.sous-message {
  font-size: 0.9rem;
  margin-top: 10px;
  color: #999;
}

.tache {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  border: 2px solid black;
  border-radius: 5px;
  background-color: white;
  transition: all 0.3s;
}

.tache:hover {
  border-color: blue;
}

.tache.terminee {
  opacity: 0.7;
  border-color: #666;
}

.texte-tache {
  flex: 1;
  text-align: left;
  cursor: pointer;
  padding: 5px;
  color: black;
}

.tache.terminee .texte-tache {
  text-decoration: line-through;
  color: #666;
}

.bouton-supprimer {
  background-color: red;
  color: white;
  border: 2px solid red;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.bouton-supprimer:hover {
  background-color: #cc0000;
  border-color: #cc0000;
}

/* ===== ACTIONS GLOBALES ===== */
.actions-globales {
  text-align: center;
  margin: 20px;
}

.bouton-nettoyer {
  background: red;
  color: white;
  border: 2px solid red;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.bouton-nettoyer:hover {
  background: #cc0000;
  border-color: #cc0000;
}

/* ===== STATISTIQUES ===== */
.statistiques {
  text-align: center;
  padding: 15px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: white;
  font-weight: bold;
  color: black;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
  .container {
    padding: 10px;
  }
  
  .ajout-tache {
    flex-direction: column;
  }
  
  .filtres {
    flex-direction: column;
    align-items: center;
  }
  
  .categories-boutons {
    flex-direction: column;
    align-items: center;
  }
  
  .boutons-navigation {
    flex-direction: column;
  }
  
  .page-onboarding {
    margin: 10px;
    padding: 20px 15px;
  }
  
  .selection-categorie {
    margin: 10px;
  }
  
  .filtres-categories {
    margin: 10px;
  }
  
  .en-tete-personnalise {
    padding: 15px;
  }
  
  .en-tete-personnalise h1 {
    font-size: 1.5rem;
  }
}


---------


STRUCTURE DES FICHIERS FINALE

ma-liste-taches/
├── src/
│   ├── App.js          (Le code JavaScript complet)
│   ├── App.css         (Le style CSS complet)
│   └── index.js        (Généré par create-react-app)
├── public/
│   └── index.html      (Généré par create-react-app)
└── package.json        (Généré par create-react-app)

ATTENTION, CETTE STRUCTURE EST NECESSAIRE, À AJOUTER DANS LE README.md !!!


----------


EXPLICATIONS DÉTAILLÉES DU CODE COMPLET


COMPRÉHENSION GLOBALE DE L'APPLICATION


Architecture en 2 Parties :

1. ONBOARDING (Questionnaire) → 2. APPLICATION (Todo List)
     ↓                              ↓
3 pages de questions           Gestion complète des tâches
Sauvegarde du profil           Filtres et catégories

.....
_________


PARTIE 1 : L'ONBOARDING - Explications Détaillées

const [onboardingTermine, setOnboardingTermine] = useState(false);
const [pageOnboarding, setPageOnboarding] = useState(0);

Explication :
onboardingTermine = Un interrupteur qui dit "Est-ce que l'utilisateur a fini le questionnaire ?"
false = Montrer le questionnaire
true = Montrer l'application principale
pageOnboarding = Un compteur de pages (0, 1, 2) pour naviguer dans le questionnaire
.....


.....
Gestion des Réponses :

const [reponses, setReponses] = useState({
  nom: '',
  objectif: '',
  experience: 'debutant'
});

Explication :
C'est comme un formulaire papier avec 3 cases à remplir :
nom : Le prénom de l'utilisateur
objectif : Ce qu'il veut accomplir
experience : Son niveau (débutant/intermédiaire/expert)
.....


.....
Navigation entre les Pages :

const pageSuivante = () => {
  if (pageOnboarding < 2) {
    setPageOnboarding(pageOnboarding + 1);
  }
};

const pagePrecedente = () => {
  if (pageOnboarding > 0) {
    setPageOnboarding(pageOnboarding - 1);
  }
};

Explication :
pageSuivante() = "Tourne la page vers la droite" (sauf si on est à la dernière page)
pagePrecedente() = "Tourne la page vers la gauche" (sauf si on est à la première page)
......


......
Mise à Jour des Réponses :

const changerReponse = (champ, valeur) => {
  setReponses({
    ...reponses,      // Garde toutes les anciennes réponses
    [champ]: valeur   // Met à jour seulement le champ modifié
  });
};

Explication :
C'est comme mettre à jour une seule case d'un formulaire sans effacer les autres
...reponses = "Prends toutes les réponses existantes"
[champ]: valeur = "Change seulement la réponse pour ce champ spécifique"
.......


.......
Affichage Conditionnel de l'Onboarding :

if (!onboardingTermine) {
  return ( ... ); // Affiche le questionnaire
}
// Sinon, affiche l'application principale

Explication :
SI l'onboarding n'est pas terminé → Montre le questionnaire
SINON → Passe à l'application Todo List
........
___________



PARTIE 2 : L'APPLICATION PRINCIPALE - Explications Détaillées

......
Gestion des Tâches avec Sauvegarde :

const [taches, setTaches] = useState(() => {
  const saved = localStorage.getItem('mesTaches');
  return saved ? JSON.parse(saved) : [];
});

Explication :
Au démarrage : Regarde si des tâches sont sauvegardées dans le navigateur
Si oui : Les charge automatiquement
Si non : Commence avec une liste vide
......


......
Sauvegarde Automatique :

useEffect(() => {
  localStorage.setItem('mesTaches', JSON.stringify(taches));
}, [taches]);

Explication :
useEffect = Un "gardien" qui surveille les changements
Quand taches change → Sauvegarde automatiquement dans le navigateur
JSON.stringify(taches) = Transforme le tableau JavaScript en texte pour le stockage
......


......
Système de Catégories :

const categories = [
  { id: 'personnel', nom: 'Personnel', couleur: '#0000ff' },
  { id: 'travail', nom: 'Travail', couleur: '#008080' },
  // ...
];

Explication :
5 catégories prédéfinies comme des étiquettes de couleur
Chaque catégorie a :
id : Identifiant unique (pour le code)
nom : Nom affiché à l'écran
couleur : Code couleur en hexadécimal
......


......
Ajout d'une Tâche :

const ajouterTache = () => {
  if (nouvelleTache.trim() !== '') {
    const tache = {
      id: Date.now(),        // Identifiant unique (timestamp)
      texte: nouvelleTache,  // Le texte saisi
      terminee: false,       // Non terminée au départ
      categorie: categorie   // Catégorie sélectionnée
    };
    setTaches([...taches, tache]);
    setNouvelleTache('');
  }
};

Explication :
Vérifie que le champ n'est pas vide
Crée un objet tâche avec toutes ses propriétés
[...taches, tache] = "Prends toutes les anciennes tâches et ajoute la nouvelle"
Vide le champ de saisie
......


......
Fonction de Filtrage :

const tachesFiltrees = taches.filter(tache => {
  // Filtre par état (terminé/non terminé)
  let filtreEtat = true;
  switch (filtre) {
    case 'actives': return !tache.terminee;
    case 'terminees': return tache.terminee;
    default: return true;
  }
  
  // Filtre par catégorie
  let filtreCat = true;
  if (filtreCategorie !== 'toutes') {
    filtreCat = tache.categorie === filtreCategorie;
  }
  
  return filtreEtat && filtreCat;
});

Explication :
Double filtrage : Par ÉTAT et par CATÉGORIE
filter() = Crée un nouveau tableau avec seulement les éléments qui passent le test
filtreEtat && filtreCat = La tâche doit passer les DEUX filtres
......
_________



PARTIE 3 : LE CSS - Explications Détaillées

.......
Système de Couleurs :

Classes CSS Réutilisables :
css
.bouton-primaire {
  background-color: blue;
  color: white;
  border: 2px solid blue;
}

.bouton-secondaire {
  background-color: white;
  color: black;
  border: 2px solid black;
}

Explication :
Même style pour tous les boutons primaires
Facile à modifier : changer une classe affecte tous les boutons
Cohérence visuelle dans toute l'application
......


......
Système Responsive :
css
@media (max-width: 600px) {
  .ajout-tache {
    flex-direction: column;
  }
  
  .filtres {
    flex-direction: column;
  }
}

Explication :
Sur mobile (< 600px) : Les éléments s'empilent verticalement
Sur desktop : Les éléments s'alignent horizontalement
Adaptation automatique à la taille de l'écran
.......
__________



PARTIE 4 : LE FLUX DE DONNÉES - Comment tout fonctionne ensemble

Cycle de Vie d'une Tâche :
text
1. SAISIE → Utilisateur tape dans l'input → Met à jour `nouvelleTache`
2. AJOUT → Clic sur "Ajouter" → Crée objet tâche → Ajoute à `taches`
3. SAUVEGARDE → useEffect détecte le changement → Sauvegarde dans localStorage
4. AFFICHAGE → Map sur `tachesFiltrees` → Affiche chaque tâche
5. INTERACTION → 
   - Clic sur texte → toggleTache() → Inverse `terminee`
   - Clic sur ✕ → supprimerTache() → Enlève de la liste
6. FILTRAGE → Changement de filtre → Recalcule `tachesFiltrees`


........
Gestion des États Imbriqués :
jsx
// État parent
const [taches, setTaches] = useState([]);

// États enfants
const [filtre, setFiltre] = useState('toutes');
const [filtreCategorie, setFiltreCategorie] = useState('toutes');

// État calculé (dérivé)
const tachesFiltrees = taches.filter(...);

Explication :
État source : taches (la vérité unique)
États de contrôle : filtre, filtreCategorie (comment afficher les données)
État dérivé : tachesFiltrees (calculé à partir des autres états)
.......

__________



PARTIE 5 : LES FONCTIONS CLÉS - Explications Techniques
toggleTache - Marquer comme Terminée/Non Terminée :
jsx
const toggleTache = (id) => {
  setTaches(taches.map(tache => 
    tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
  ));
};

Explication :
taches.map() = Parcourt toutes les tâches
tache.id === id = Trouve la tâche avec le bon ID
{ ...tache, terminee: !tache.terminee } =
Prend toutes les propriétés de la tâche
Inverse la propriété terminee (true→false, false→true)
......


......
supprimerTache - Enlever une Tâche :
jsx
const supprimerTache = (id) => {
  setTaches(taches.filter(tache => tache.id !== id));
};

Explication :
taches.filter() = Garde seulement les tâches qui passent le test
tache.id !== id = "Garder seulement les tâches dont l'ID est DIFFÉRENT de celui à supprimer"
......


......
supprimerTachesTerminees - Nettoyage :
jsx
const supprimerTachesTerminees = () => {
  setTaches(taches.filter(tache => !tache.terminee));
};

Explication :
!tache.terminee = "Garder seulement les tâches qui ne sont PAS terminées"
Supprime toutes les tâches cochées d'un coup
......
---------


RÉSUMÉ À SAVOIR !

* Les 5 Concepts React Maîtrisés :
 - useState → Mémoire des composants
 - useEffect → Actions secondaires (sauvegarde)
 - Props → Communication entre composants
 - Event Handlers → Gestion des clics et saisies
 - Conditional Rendering → Affichage conditionnel
++++++++

* Les 3 Patterns Importants :
 - Lifting State Up → État partagé dans le parent
 - Controlled Components → Inputs contrôlés par React
 - Derived State → État calculé à partir d'autres états
++++++++

* Progression d'Apprentissage :
text
1. État simple → 2. Interaction → 3. Persistance 
   ↓              ↓              ↓
taches[]      toggleTache()   localStorage
++++++++


---------

UN RAPPEL POUR DEMARRER TON APPLICATION
cd ma-liste-taches
npm start


---------



LES FONCTIONNALITÉS INCLUSES DANS NOTRE APPLICATION :

- Onboarding en 3 étapes avec questionnaire

- Filtres (toutes/actives/terminées)

- Catégories avec couleurs

- Sauvegarde automatique dans le navigateur

- Design Noir/Blanc/Bleu/Rouge

- Responsive pour mobile

- Personnalisation avec le nom de l'utilisateur


VOUS AVEZ MAINTENANT UNE COMPRÉHENSION COMPLÈTE DE CETTE APPLICATION REACT !