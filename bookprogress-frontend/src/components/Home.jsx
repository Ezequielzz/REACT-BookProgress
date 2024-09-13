// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import SidebarRight from '../components/SidebarRight';
import './Home.css';

const Home = () => {
  // Estado para armazenar o ID do usuário
  const [usuarioId, setUsuarioId] = useState(null);

  // Simulação de obtenção do ID do usuário
  useEffect(() => {
    // Simulação de chamada para obter o ID do usuário (pode ser uma chamada API real)
    const fetchUsuarioId = async () => {
      try {
        // Aqui você deve substituir pela lógica real para obter o ID do usuário
        // Exemplo: Obter o ID do usuário a partir da autenticação ou de uma API
        const response = await fetch('/api/usuario/atual'); // Substitua com a URL real
        if (!response.ok) {
          throw new Error('Erro ao obter ID do usuário');
        }
        const data = await response.json();
        setUsuarioId(data.id); // Ajuste conforme a estrutura da resposta
      } catch (error) {
        console.error('Erro ao obter ID do usuário:', error);
      }
    };

    fetchUsuarioId();
  }, []);

  return (
    <div className="home">
      <main className="content">
        <h1>Flamengo campeão copa do brasil 2024</h1>
        {/* Conteúdo da página Home */}
      </main>
      {/* Passar o usuarioId para o SidebarRight */}
      {usuarioId && <SidebarRight usuarioId={usuarioId} />}
    </div>
  );
};

export default Home;
