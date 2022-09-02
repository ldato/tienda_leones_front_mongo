import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Panel from './panel';
import { useState } from 'react';



const IngresoCliente = () => {

    const [cliente, setCliente] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
        //console.log(cliente)
    }

    const enviarCliente = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        });
        const requestOpciones = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(cliente)
        }
        const nuevoCliente = await fetch('http://localhost:3000/api/clientes/crearCliente', requestOpciones);
        const response = await nuevoCliente.json();
        console.log(response);
        if (response.cliente) {
            alert(response.message);
            window.location.reload(false);
        } else {
            alert(response.message)
            console.log(response)
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
                    <Col xs={4} className="espacio-superior3">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ingrese el DNI del nuevo cliente</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese el DNI"
                                    name="dni"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ingrese el nombre del nuevo cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre"
                                    name="nombre"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ingrese el apellido del nuevo cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el apellido"
                                    name="apellido"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ingrese el telefono del nuevo cliente</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese el telefono"
                                    name="telefono"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ingrese el email del nuevo cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el email"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button 
                            variant="primary"
                            onClick={enviarCliente}>
                                Click aquí para ingresar Nuevo Cliente
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )

}

export default IngresoCliente;


