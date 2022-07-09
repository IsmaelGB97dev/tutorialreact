import React from 'react';
import ReactDOM from 'react-dom/client';

function Saludo() {
  return <h1>Hola a todos!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Saludo/>);