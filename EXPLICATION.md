Débuter avec React

Cours Express : Débuter avec React.js

L'idée principale de React est de construire des interfaces utilisateur avec des morceaux de code réutilisables appelés composants. Imaginez que vous construisez une maison avec des blocs Lego ; chaque bloc est un composant.

---

Étape 1 : Mise en place de l'environnement

Code :

```bash
npx create-react-app mon-premier-projet
cd mon-premier-projet
npm start
```

Explication en langage humain :
Au lieu de tout configurer manuellement (ce qui est long et compliqué), on utilise un outil magique appelé create-react-app. Cette commande télécharge et installe tout ce dont React a besoin pour fonctionner dans un nouveau dossier (mon-premier-projet). Ensuite, npm start allume le moteur de notre application et l'ouvre dans notre navigateur. C'est notre terrain de jeu pour apprendre.

---

Étape 2 : Le cœur d'un composant React

Ouvrez le fichier src/App.js. Vous verrez quelque chose comme ça :

Code :

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

Explication en langage humain :

· function App() { ... } : C'est la définition de notre premier "bloc Lego", un composant nommé App. En React, un composant est simplement une fonction qui retourne ce qui doit être affiché à l'écran.
· return ( ... ) : À l'intérieur du return, nous écrivons du JSX. Le JSX ressemble à du HTML, mais c'est en réalité du JavaScript. Cela nous permet de décrire facilement à quoi notre interface doit ressembler.
· <h1>Bonjour le monde !</h1> : C'est du JSX classique, qui affiche un gros titre.
· export default App; : Cette ligne signifie "Hé, le reste de l'application, vous pouvez utiliser le composant App !". C'est comme mettre une étiquette sur notre bloc Lego pour le retrouver.

---

Étape 3 : Afficher des données dynamiquement (Les "props")

Imaginons que vous vouliez créer un composant "Bonjour" qui salue une personne différente. On utilise les props (propriétés) pour cela.

Code :

```jsx
// Dans App.js
function App() {
  return (
    <div>
      <Bonjour prenom="Marie" />
      <Bonjour prenom="Pierre" />
    </div>
  );
}

// Un nouveau composant
function Bonjour(props) {
  return <h2>Salut, {props.prenom} !</h2>;
}
```

Explication en langage humain :

· Nous avons créé un nouveau composant Bonjour.
· Dans App, nous utilisons ce composant comme une balise HTML : <Bonjour />.
· Nous lui passons une "propriété" (prenom), comme un argument à une fonction. Ici, on dit au premier composant "Ton prenom est Marie", et au second "Ton prenom est Pierre".
· Dans le composant Bonjour, nous recevons toutes ces propriétés dans un objet appelé props.
· {props.prenom} : Les accolades {} en JSX sont une instruction qui dit "À cet endroit, je veux afficher la valeur de cette variable JavaScript". C'est comme une fenêtre où on peut mettre du code JS.

Résultat à l'écran :

```
Salut, Marie !
Salut, Pierre !
```

---

Étape 4 : Gérer l'état (Le "state") et l'interactivité

Les props sont pour les données qui viennent de l'extérieur. Le state (état) est la mémoire interne du composant. C'est ce qui lui permet de se souvenir de choses et de réagir aux actions de l'utilisateur (comme un clic).

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

Explication en langage humain :

· useState(0) : C'est un "Hook" de React. On lui donne la valeur de départ (ici, 0). Il nous rend deux choses :
  1. La valeur actuelle (nombre).
  2. Une fonction pour changer cette valeur (setNombre).
· const [nombre, setNombre] = ... : C'est une syntaxe pour récupérer les deux éléments d'un coup. nombre est la variable, setNombre est la fonction pour la modifier.
· onClick={incrementer} : Ici, on dit au bouton "Quand l'utilisateur te clique dessus (onClick), exécute la fonction incrementer".
· incrementer() : Cette fonction appelle setNombre(nombre + 1). Elle dit à React : "La nouvelle valeur de nombre est l'ancienne valeur + 1".
· Magie de React : Dès que l'état (nombre) change avec setNombre, React re-dessine automatiquement le composant à l'écran. C'est pour ça que le texte se met à jour tout seul !

---

Résumé des Concepts Clés

1. Composants : Des fonctions JavaScript qui retournent du JSX. Ce sont les briques de votre application.
2. JSX : Une syntaxe qui ressemble à du HTML, mais qui est du JavaScript. Permet de décrire l'interface.
3. Props : Des arguments que vous passez à un composant (de parent à enfant). Elles sont en lecture seule.
4. State (État) : La mémoire interne d'un composant. Il est modifiable et, quand il change, le composant se met à jour.
5. Gestion d'événements : Comme onClick, qui vous permet de déclencher des fonctions quand l'utilisateur interagit.





