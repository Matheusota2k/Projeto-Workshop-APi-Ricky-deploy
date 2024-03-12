import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Characters, Episodes, Home, Locations } from './pages/index.ts'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/characters' element={<Characters />}></Route>
        <Route path='/episodes' element={<Episodes />}></Route>
        <Route path='/locations' element={<Locations />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);