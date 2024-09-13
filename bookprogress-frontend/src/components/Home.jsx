// src/pages/Home.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import SidebarRight from '../components/SidebarRight';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <main className="content">
        <h1>Bem-vindo à Home Page</h1>
        {/* Conteúdo da página Home */}
      </main>
      <SidebarRight />
    </div>
  );
};

export default Home;
