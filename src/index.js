import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './pages/Home/Home.js'
import FormProfessor from './pages/formProfessor/FormProfessor.js'
import FormPeriodo from './pages/formPeriodo/FormPeriodo.js'
import FormSala from './pages/formSala/FormSala.js'
import FormMateria from './pages/formMateria/FormMateria.js'
import FormCurso from './pages/formCurso/FormCurso.js';


const router = createBrowserRouter([
  {path:"/", element:<Home />},
  {path:"/FormCurso", element:<FormCurso/>},
  {path:"/FormProfessor", element:<FormProfessor/>},
  {path:"/FormPeriodo", element:<FormPeriodo/>},
  {path:"/FormSala", element:<FormSala/>},
  {path:"/FormMateria", element:<FormMateria/>},

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
