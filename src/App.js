import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login';
import Home from './components/home';
import ConsultaArticulo from './components/consultaArticulo';
import FormVenta from './components/formVenta'
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/articulo' element={<ConsultaArticulo/>}/> 
        <Route path='/nuevaVenta' element={<FormVenta/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
