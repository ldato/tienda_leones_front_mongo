import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login';
import Home from './components/home';
import ConsultaArticulo from './components/consultaArticulo';
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/articulo' element={<ConsultaArticulo/>}/> 
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
