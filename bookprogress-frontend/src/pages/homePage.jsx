import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Bem-vindo ao BookProgress</h1>
      <nav>
        <Link to="/cadastro">Cadastrar</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}

export default HomePage;
