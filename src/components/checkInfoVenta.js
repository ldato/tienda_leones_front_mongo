import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import Panel from './panel';
import { useEffect } from 'react';


const CheckInfoVenta = () => {

    const venta = useSelector(state => state.venta);
    useEffect(() => {
        console.log(venta);
    }, []);

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
                        <Row className="espacio-superior4">
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
                                                <td>Subtotal Art.: ${articulo.subtotalProducto}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>Subtotal: ${venta.subTotal}</td>
                                        </tr>
                                        <tr>
                                            <td>Forma de Pago: {
                                                venta.formaPago === "" ? "Efectivo" : venta.formaPago
                                                }</td>
                                        </tr>
                                        <tr>
                                            <td>Recargo: ${venta.recargo === "" ? 0 : venta.recargo}</td>
                                        </tr>
                                        <tr>
                                            <td>Total: ${venta.subTotal}</td>
                                        </tr>
                                    </tbody>

                                </Table>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default CheckInfoVenta;
