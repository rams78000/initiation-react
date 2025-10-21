import logo from './logo.svg';
import './App.css';
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

export default App;
