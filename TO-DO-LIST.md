DEBUT PROJET (To-Do List)

Guide Pédagogique : Créer une TO-DO LIST React - Explications Humaines

📚 Introduction pour vous les Stagiaires

Vous êtes futurs développeurs React ! 👋

Nous allons créer ensemble votre première application React : une liste de tâches (To-Do List). Nous allons comprendre chaque concept comme si nous construisions une maison avec des LEGOs !

---

🏗️ ÉTAPE 1 : Préparer le Terrain

Le Cœur d'un Composant React

Code de départ dans src/App.js :

```jsx
function App() {
  return (
    <div className="App">
      <h1>Bonjour le monde !</h1>
    </div>
  );
}

export default App;
```

🎯 Explication en Langage Humain :

Imaginez que vous êtes un architecte :

· function App() { ... } → C'est comme si vous créiez un plan de maison. Vous donnez un nom à votre plan : "App" (Application).
· return ( ... ) → À l'intérieur, vous dessinez ce que votre maison va contenir. C'est votre plan détaillé.
· <h1>Bonjour le monde !</h1> → C'est un gros titre dans votre maison, comme une enseigne sur la façade.
· export default App; → Vous dites aux ouvriers : "Voici le plan principal, utilisez-le pour construire !"

📝 Analogie :

· Composant = Plan de construction
· JSX = Langage de dessin pour décrire la maison
· Export = Donner le plan aux ouvriers

---

🔄 ÉTAPE 2 : Les Données Dynamiques (Les "Props")

Créons un Composant Réutilisable

Code :

```jsx
// Dans App.js
function App() {
  return (
    <div>
      <Bonjour prenom="Marie" />
      <Bonjour prenom="Pierre" />
      <Bonjour prenom="Sophie" />
    </div>
  );
}

// Un nouveau composant
function Bonjour(props) {
  return <h2>Salut, {props.prenom} !</h2>;
}
```

🎯 Explication en Langage Humain :

Maintenant, créons des pièces modulaires :

· <Bonjour prenom="Marie" /> → Comme si vous commandiez une pièce préfabriquée en disant : "Je veux une pièce 'Bonjour' avec la propriété 'prenom' égale à 'Marie'".
· function Bonjour(props) → Le fabricant de la pièce reçoit toutes les commandes dans une boîte appelée props.
· {props.prenom} → Le fabricant ouvre la boîte, prend la propriété prenom et l'utilise pour personnaliser la pièce.

📝 Analogie :

· Props = Instructions de personnalisation qu'on envoie à un composant
· Composant réutilisable = Pièce modulaire qu'on peut utiliser plusieurs fois avec des personnalisations différentes

🔄 Ce qui se passe :

```
Instruction → "Crée Bonjour avec prenom=Marie"
              ↓
Composant → "Je reçois props = {prenom: 'Marie'}"
              ↓
Affichage → "Salut, Marie !"
```

---

💾 ÉTAPE 3 : La Mémoire du Composant (Le "State")

Ajoutons de l'Interactivité avec un Compteur

Code :

```jsx
import { useState } from 'react';

function Compteur() {
  const [nombre, setNombre] = useState(0);

  function incrementer() {
    setNombre(nombre + 1);
  }

  return (
    <div>
      <p>Vous avez cliqué {nombre} fois</p>
      <button onClick={incrementer}>Cliquez ici</button>
    </div>
  );
}
```

🎯 Explication en Langage Humain :

Maintenant, donnons de la mémoire à notre composant :

· import { useState } from 'react'; → Nous allons au magasin React chercher un outil spécial : "useState". C'est un bloc-note magique qui se souvient des choses.
· const [nombre, setNombre] = useState(0); →
  · useState(0) → "Je crée un bloc-note avec la valeur de départ 0"
  · [nombre, setNombre] → "Je donne deux noms à ce bloc-note :
    · nombre → Pour LIRE la valeur actuelle
    · setNombre → Pour ÉCRIRE une nouvelle valeur"
· function incrementer() { ... } → Quand on clique, cette fonction dit : "Prends la valeur actuelle de nombre et ajoute 1"
· onClick={incrementer} → "Quand on clique sur le bouton, exécute la fonction incrementer"

📝 Analogie :

· State = Mémoire du composant
· useState = Outil pour créer cette mémoire
· setNombre = Fonction pour changer la mémoire

🔄 Cycle de vie :

```
Départ → nombre = 0
Clic → incrementer() → setNombre(0 + 1) → nombre = 1
Affichage → "Vous avez cliqué 1 fois"
```

---

🎯 ÉTAPE 4 : Application à Notre TO-DO LIST

Créons Notre Liste de Tâches

Code complet avec explications intégrées :

```jsx
// Étape 1 : Importer nos outils
import { useState } from 'react';
import './App.css';

// Étape 2 : Créer notre composant principal
function App() {
  // Étape 3 : Créer la MÉMOIRE de notre application
  
  // Mémoire 1 : La liste des tâches (tableau vide au départ)
  const [taches, setTaches] = useState([]);
  
  // Mémoire 2 : Le texte de la nouvelle tâche (vide au départ)
  const [nouvelleTache, setNouvelleTache] = useState('');

  // Étape 4 : Fonction pour AJOUTER une tâche
  const ajouterTache = () => {
    // Vérifier que le champ n'est pas vide
    if (nouvelleTache.trim() !== '') {
      // Créer un nouvel objet "tâche" avec :
      const tache = {
        id: Date.now(),        // Un identifiant unique (timestamp)
        texte: nouvelleTache,  // Le texte saisi
        terminee: false        // Non terminée au départ
      };
      
      // Ajouter la nouvelle tâche à la liste existante
      // ...taches = "prends toutes les anciennes tâches"
      // tache = "et ajoute la nouvelle"
      setTaches([...taches, tache]);
      
      // Vider le champ de saisie
      setNouvelleTache('');
    }
  };

  // Étape 5 : Fonction pour MARQUER une tâche comme terminée
  const toggleTache = (id) => {
    // Pour chaque tâche dans la liste :
    setTaches(taches.map(tache => 
      // Si c'est la tâche qu'on a cliquée, inverse son état "terminee"
      // Sinon, laisse-la telle quelle
      tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
    ));
  };

  // Étape 6 : Fonction pour SUPPRIMER une tâche
  const supprimerTache = (id) => {
    // Garde seulement les tâches dont l'id est DIFFÉRENT de celui à supprimer
    setTaches(taches.filter(tache => tache.id !== id));
  };

  // Étape 7 : Ce qui s'affiche à l'écran
  return (
    <div className="App">
      <div className="container">
        {/* Titre de l'application */}
        <h1>📝 Ma Liste de Tâches</h1>
        
        {/* Zone de saisie */}
        <div className="ajout-tache">
          <input
            type="text"
            value={nouvelleTache}  // Lie le champ à notre mémoire
            onChange={(e) => setNouvelleTache(e.target.value)} // Quand on tape, met à jour la mémoire
            placeholder="Quelle est votre prochaine tâche ?"
            className="champ-saisie"
          />
          <button onClick={ajouterTache} className="bouton-ajouter">
            Ajouter
          </button>
        </div>

        {/* Liste des tâches */}
        <div className="liste-taches">
          {/* Si la liste est vide */}
          {taches.length === 0 ? (
            <p className="message-vide">Aucune tâche pour le moment. Ajoutez-en une !</p>
          ) : (
            /* Si la liste a des tâches, les afficher une par une */
            taches.map(tache => (
              <div key={tache.id} className={`tache ${tache.terminee ? 'terminee' : ''}`}>
                <span 
                  onClick={() => toggleTache(tache.id)} // Clic pour marquer terminée
                  className="texte-tache"
                >
                  {tache.texte}
                </span>
                <button 
                  onClick={() => supprimerTache(tache.id)} // Clic pour supprimer
                  className="bouton-supprimer"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Statistiques (seulement si il y a des tâches) */}
        {taches.length > 0 && (
          <div className="statistiques">
            <p>Total: {taches.length} | 
               Terminées: {taches.filter(t => t.terminee).length} | 
               Restantes: {taches.filter(t => !t.terminee).length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

---

🎓 RÉCAPITULATIF DES CONCEPTS POUR LES STAGIAIRES

🧩 Les 3 Concepts Fondamentaux :

1. COMPOSANTS → Plans de construction réutilisables
2. PROPS → Instructions de personnalisation qu'on envoie aux composants
3. STATE → Mémoire interne du composant

🔄 Le Cycle de Vie d'une Tâche :

```
1. SAISIE → Tape dans input → Met à jour `nouvelleTache`
2. AJOUT → Clic sur "Ajouter" → Crée objet → Ajoute à `taches`
3. AFFICHAGE → Map sur `taches` → Affiche chaque tâche
4. INTERACTION → 
   - Clic texte → toggleTache() → Inverse `terminee`
   - Clic poubelle → supprimerTache() → Filtre la liste
```

💡 Conseils pour les Stagiaires :

· Un State = Une Chose : Chaque state doit représenter une seule information
· Props vers le Bas : Les données vont du parent vers les enfants
· Événements vers le Haut : Les interactions remontent des enfants vers le parent
· Immuabilité : On ne modifie jamais le state directement, on utilise les fonctions set
