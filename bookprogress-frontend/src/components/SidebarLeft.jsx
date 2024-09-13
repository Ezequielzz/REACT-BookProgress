import React from 'react';
import './SidebarLeft.css';
import bookprogress from '../assets/bookprogress.png'; // caminho da imagem
import resenha from '../assets/resenha.png'; // caminho da imagem
import livro from '../assets/livro.png'; // caminho da imagem
import usuario1 from '../assets/usuario1.png'; // caminho da imagem

const Sidebar = () => {
  return (
    <div className="sidebarL">
      <div className="logo">
        <img src={bookprogress} alt="Book Progress" />
      </div>
      <ul>
        <li>
          <a href="/perfil">
            <img src={usuario1} alt="" className="icons"/> Seu Perfil
          </a>
        </li>
        <li>
          <a href="/livros">
          <img src={livro} alt="" className="icons"/> Seus Livros
          </a>
        </li>
        <li>
          <a href="/resenhas">
          <img src={resenha} alt="" className="icons"/> Suas Resenhas
          </a>
        </li>
      </ul>
      <button className="logout-btn">Sair</button>
    </div>
  );
};

export default Sidebar;
