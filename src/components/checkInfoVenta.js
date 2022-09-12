import { useSelector, useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import Panel from './panel';
import { useEffect } from 'react';
import { setFormaPago, setRecargo } from '../features/venta/ventaSlice';
import {useNavigate} from 'react-router-dom';


const CheckInfoVenta = () => {

    const venta = useSelector(state => state.venta);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(venta);
    }, []);

    const MostrarPrecios = (e) => {
        dispatch(setFormaPago(parseInt(e.target.value)));
        dispatch(setRecargo());
        console.log(venta)      
    }

    const ConfirmarVenta = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        });
        const requestOpciones = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(venta)
        }
        const nuevaVenta = await fetch('http://localhost:3000/api/ventas/nuevaVenta', requestOpciones);
        const response = await nuevaVenta.json();
        console.log(response);
        if (response.venta) {
            alert("La venta fue realiza con exito");   
            navigate('/nuevaVenta');   
            window.location.reload(false);
            
        }
        if (response.error) {
            alert("Ocurrio un problema al registrar la venta");
        }
    }
    

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Panel />
                    </Col>
                    <Col xs={10}>
                        <Row className="espacio-superior4">
                            <h3>FORMULARIO DE INFORMACION DE VENTA</h3>
                        </Row>
                        <Row className="espacio-superior4 resaltar-borde-inferior">
                            <Col xs={10}>

                                <Table striped bordered hover>
                                    <thead>

                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>DNI Cliente: {venta.dniCliente}</td>
                                        </tr>
                                        {venta.articulos.map(articulo => (
                                            <tr key={articulo.articulo}>
                                                <td>Cod. Articulo: {articulo.articulo}</td>
                                                <td>Cantidad: {articulo.cantidad}</td>
                                                <td>Precio: ${articulo.precioUnitario}</td>
                                                <td>Subtotal Art.: ${articulo.subTotalProducto}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="negrita">Subtotal: ${venta.subTotal}</td>
                                        </tr>
                                        <tr>
                                            <td className="negrita">Forma de Pago: {
                                                venta.formaPago === 1 ? "Efectivo" : "Tarjeta"
                                                }</td>
                                        </tr>
                                        <tr>
                                            <td className="negrita">Recargo: ${parseFloat(venta.total - venta.subTotal).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="negrita">Total: ${parseFloat(venta.total).toFixed(2)}</td>
                                        </tr>
                                    </tbody>

                                </Table>
                            </Col>
                        </Row>
                        <Row className="espacio-superior4">
                            <Col xs={6}>
                                <p className="negrita">Al presionar sobre una de las opciones de pago, se mostrara el monto y los cargos si los hubiere</p>
                                <Row>
                                    <Col xs={6}>
                                        <Button value={1} onClick={MostrarPrecios}>
                                            Mostrar Precio en Efectivo
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="espacio-superior4">
                                    <Col xs={6}>
                                        <Button value={2} onClick={MostrarPrecios}>
                                            Mostrar Precio con Tarjeta
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3} className="espacio-superior3">
                                <Button 
                                    size="lg"  
                                    variant="success"
                                    onClick={ConfirmarVenta}>
                                    Presione En este Boton para Confirmar la Venta
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default CheckInfoVenta;
