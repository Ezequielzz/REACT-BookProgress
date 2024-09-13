// src/App.jsx
import React from 'react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Home from './components/Home';

function App() {

  


  
  return (
    <div className="App">
      <SidebarLeft />
      <Home />
      <SidebarRight />
    </div>
  );
  
}

export default App;
