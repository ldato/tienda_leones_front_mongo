import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Container, Row, ListGroup, Form } from "react-bootstrap";
import Panel from './panel';
import { useState } from 'react';



const ConsultaArticulo = () => {

    const [codigo, setCodigo] = useState({ codigo: "" });
    const [articulo, setArticulo] = useState({
        codigo: "",
        marca: "",
        precio: "",
        cantidad: "",
        tipo: ""
    });

    const verArticulo = async (codigoArt) => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        })
        const requestOpciones = {
            method: 'GET',
            headers: myHeaders
        }

        const consulta = await fetch('http://localhost:3000/api/articulos/uno/' + codigo.codigo, requestOpciones);
        const articuloConsultado = await consulta.json();
        if (articuloConsultado.codigo) {
            setArticulo({
            codigo: articuloConsultado.codigo,
            marca: articuloConsultado.marca,
            precio: articuloConsultado.precioVenta,
            cantidad: articuloConsultado.cantidad,
            tipo: articuloConsultado.tipo
        })
        } 
        if (articuloConsultado.error=== "null") {
           alert("No existe un artículo con el codigo provisto en la consulta");
           window.location.reload(false);
        }
       
    }

    const handleChange = (e) => {
        e.preventDefault();
        setCodigo({
            ...codigo,
            [e.target.name]: e.target.value
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
                                <Form.Label>Código de producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el código"
                                    name="codigo"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                // type="submit" 
                                onClick={verArticulo}>
                                Consultar
                            </Button>
                        </Form>

                        <ListGroup className="espacio-superior4">
                            <ListGroup.Item className="negrita">Código: {articulo.codigo}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Marca: {articulo.marca.nombre}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Precio: ${articulo.precio}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Cantidad: {articulo.cantidad}</ListGroup.Item>
                            <ListGroup.Item className="negrita">Tipo de Artículo: {articulo.tipo}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ConsultaArticulo;