import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Container, Row, ListGroup, Form } from "react-bootstrap";
import Panel from './panel';
import { useState } from 'react';


const ConsultaCliente = () => {

    const [dni, setDni] = useState({dni: ""});
    const [cliente, setCliente] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: ""
    });

    const verCliente = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        })
        const requestOpciones = {
            method: 'GET',
            headers: myHeaders
        }

        const consulta = await fetch('http://localhost:3000/api/clientes/verCLientePorDni/' + dni.dni, requestOpciones);
        const clienteConsultado = await consulta.json();
        console.log(clienteConsultado);
        if (clienteConsultado.dni) {
            setCliente({
                dni: clienteConsultado.dni,
                nombre: clienteConsultado.nombre,
                apellido: clienteConsultado.apellido,
                telefono: clienteConsultado.telefono,
                email: clienteConsultado.email
            })
        }
        if (clienteConsultado.error === 404) {
            alert("No existe un cliente con el DNI consultado");
            window.location.reload(false);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setDni({
            ...dni,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Panel />
                    </Col>
                    <Col xs={2}>
                    </Col>
                    <Col xs={4} className="espacio-superior2">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>DNI del cliente a consultar</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese el DNI"
                                    name="dni"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                onClick={verCliente}
                            >
                                Consultar
                            </Button>
                        </Form>

                        <ListGroup className="espacio-superior4">
                            <ListGroup.Item className="negrita">DNI: {cliente.dni}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Nombre: {cliente.nombre}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Apellido: {cliente.apellido}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Telefono: {cliente.telefono}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Email: {cliente.email}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ConsultaCliente;