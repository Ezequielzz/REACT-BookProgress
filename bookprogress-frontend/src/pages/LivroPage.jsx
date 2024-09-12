import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LivroPage() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/livros/${id}`);
        setLivro(response.data);
      } catch (error) {
        console.error("Erro ao buscar livro:", error);
      }
    };

    fetchLivro();
  }, [id]);

  if (!livro) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{livro.titulo}</h1>
      <p>{livro.autor}</p>
      <p>{livro.descricao}</p>
      {/* Adicione mais funcionalidades conforme necessário */}
    </div>
  );
}

export default LivroPage;
