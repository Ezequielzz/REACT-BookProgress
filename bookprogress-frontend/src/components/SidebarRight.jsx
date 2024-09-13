// src/components/SidebarRight.jsx
import React, { useEffect, useState } from 'react';
import './SidebarRight.css';

const SidebarRight = () => {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    // Função para buscar livros do backend
    const fetchLivros = async () => {
      try {
        const response = await fetch('/api/livros');
        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchLivros();
  }, []);

  return (
    <aside className="sidebar-right">
      <h2>Livros Cadastrados</h2>
      <ul>
        {livros.map((livro) => (
          <li key={livro._id}>
            <h3>{livro.titulo}</h3>
            <p><strong>Autor:</strong> {livro.autor}</p>
            <p><strong>Gênero:</strong> {livro.genero}</p>
            <p><strong>Páginas:</strong> {livro.paginas}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarRight;
