import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login';
import Home from './components/home';
import ConsultaArticulo from './components/consultaArticulo';
import FormVenta from './components/formVenta'
import IngresoCliente from './components/ingresoCliente';
import IngresoArticulo from './components/ingresoArticulo';
import ConsultaCliente from './components/consultaCliente';
import CheckInfoVenta from './components/checkInfoVenta';
import './App.css';
//import {useSelector} from 'react-redux';

function App() {
  //const ventaState = useSelector(state => state.venta);
  //console.log(ventaState);
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/articulo' element={<ConsultaArticulo/>}/> 
        <Route path='/nuevaVenta' element={<FormVenta/>}/>
        <Route path='/ingresoCliente' element={<IngresoCliente/>} />
        <Route path='/ingresoArticulo' element={<IngresoArticulo/>}/>
        <Route path='/cliente' element={<ConsultaCliente/>}/>
        <Route path='/checkVenta' element={<CheckInfoVenta/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
