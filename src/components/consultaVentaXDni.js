import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Container, Row, Table, Form } from "react-bootstrap";
import Panel from './panel';
import { useState } from 'react';


const ConsultaVentaXDni = () => {

    const [ventas, setVentas] = useState([]);
    let dni;

    const handleChange = (e) => {
        dni = parseInt(e.target.value);
    }

    const getVentas = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        });
        const requestOpciones = {
            method: 'GET',
            headers: myHeaders

        }
        const consulta = await fetch('http://localhost:3000/api/ventas/ventasPorDni/' + dni, requestOpciones);
        const response = await consulta.json();
        console.log(response);
        if (response[0].dniCliente) {
            setVentas(response);
        }
        if (!response[0].dniCliente) {
            alert("No existen ventas para el DNI proporcionado")
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Panel />
                    </Col>
                    <Col xs={1}>
                    </Col>
                    <Col xs={8} className="espacio-superior6">
                        <h2>FORMULARIO DE CONSULTA DE VENTAS POR DNI DE CLIENTE</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>DNI de cliente a consultar</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el DNI del cliente"
                                    name="dni"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                onClick={getVentas}
                            >
                                Consultar
                            </Button>
                        </Form>
                        <Table striped bordered hover className="espacio-superior4">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>DniCliente</th>
                                    <th>FormaPago</th>
                                    <th>Total</th>

                                </tr>
                            </thead>
                            <tbody>
                                {ventas.map((venta, index) => (
                                    <tr key={index}>
                                        <td>{venta.fecha}</td>
                                        <td>{venta.dniCliente}</td>
                                        <td>{venta.formaPago === 1 ? "Efectivo" : "Tarjeta"}</td>
                                        <td>{parseFloat(venta.total).toFixed(2)}</td>
                                    </tr>                                                                     
                                ))}

                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
        </>
    )

}



export default ConsultaVentaXDni;