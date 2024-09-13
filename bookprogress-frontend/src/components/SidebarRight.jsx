import React, { useEffect, useState } from 'react';
import './SidebarRight.css';

const SidebarRight = ({ usuarioId }) => {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch(`/api/${usuarioId}/livros`); // Use a URL correta para a API
        if (!response.ok) {
          throw new Error('Erro ao buscar livros: ' + response.statusText);
        }
        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (usuarioId) {
      fetchLivros();
    }
  }, [usuarioId]);

  return (
    <aside className="sidebar-right">
      <h2>Livros Cadastrados</h2>
      <ul>
        {livros.length > 0 ? (
          livros.map((livro) => (
            <li key={livro._id}>
              <h3>{livro.titulo}</h3>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>Gênero:</strong> {livro.genero}</p>
              <p><strong>Páginas:</strong> {livro.paginas}</p>
            </li>
          ))
        ) : (
          <p>Sem livros cadastrados.</p>
        )}
      </ul>
    </aside>
  );
};

export default SidebarRight;
