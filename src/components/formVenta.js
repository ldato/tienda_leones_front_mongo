import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row, ListGroup, Form, Button, Table } from "react-bootstrap";
import Panel from './panel';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addArticulo, addCliente, deleteArticulo, setSubtotal, setTotal } from '../features/venta/ventaSlice';

const FormVenta = () => {

    const navigate = useNavigate();
    const venta = useSelector(state => state.venta);
    console.log(venta)
    let total = 0;
    let cantProd = 0;
    for (let i = 0; i < venta.articulos.length; i++) {
        total = total + venta.articulos[i].subTotalProducto;
        cantProd = cantProd + venta.articulos[i].cantidad;
    }
    //console.log(venta.articulos)
    let dni;
    let codigo;
    let cantidadArt;

    const dispatch = useDispatch();

    const [cliente, setCliente] = useState({
        dni: "",
        nombre: "",
        apellido: ""
    });

    const [articulo, setArticulo] = useState({
        id: "",
        codigo: "",
        marca: "",
        tipo: "",
        precio: ""
    });

    const clienteVenta = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        })
        const requestOpciones = {
            method: 'GET',
            headers: myHeaders
        }
        const clienteConsulta = await fetch('http://localhost:3000/api/clientes/verCLientePorDni/' + dni, requestOpciones);
        const response = await clienteConsulta.json();
        if (response.dni === dni) {
            dispatch(addCliente(response.dni));
            setCliente({
                dni: response.dni,
                nombre: response.nombre,
                apellido: response.apellido
            }
            )

        }
        if (response.error === 404) {
            alert("Debe ingresar el cliente al sistema antes de realizar la venta");
            navigate('/ingresoCliente');
        }

        console.log(response)
    }

    const articuloVenta = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        })
        const requestOpciones = {
            method: 'GET',
            headers: myHeaders
        }
        const articuloConsulta = await fetch('http://localhost:3000/api/articulos/uno/' + codigo, requestOpciones);
        const response = await articuloConsulta.json();
        console.log(response);
        if (response.codigo === codigo) {
            setArticulo({
                id: response._id,
                codigo: response.codigo,
                marca: response.marca.nombre,
                tipo: response.tipo,
                precio: response.precioVenta
            }
            )
        }
        if (response.error === 404) {
            alert("No existe un articulo con el código ingresado");
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        dni = parseInt(e.target.value);
    }

    const handleChange2 = (e) => {
        e.preventDefault();
        codigo = e.target.value;
        console.log(codigo)
    }

    const handleCantidad = (e) => {
        e.preventDefault();
        cantidadArt = parseInt(e.target.value);
    }

    const borrarArticulo = (key) => {
        dispatch(deleteArticulo(key))
    }


    const agregarAVenta = (e) => {
        e.preventDefault()
        console.log(venta)
        let artAdd = {
            articulo: articulo.id,
            cantidad: cantidadArt === undefined || isNaN(cantidadArt) ? 1 : cantidadArt,
            precioUnitario: articulo.precio,
            subTotalProducto: (cantidadArt === undefined || isNaN(cantidadArt) ? 1 : cantidadArt) * articulo.precio
        }
        console.log(artAdd);
        dispatch(addArticulo(artAdd));
    }

    const irCheckInfoVenta = () => {
        dispatch(setSubtotal(total));
        dispatch(setTotal(total));
        navigate('/checkVenta')
    }

    const limpiarPagina = () => {
        window.location.reload(false);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Panel />
                    </Col>
                    <Col xs={10}>
                        <Row className="espacio-superior4 resaltar-borde-inferior">
                            <Col xs={4}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Ingrese el DNI del cliente</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese DNI"
                                            name="dni"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={2} className="espacio-superior5">
                                <Button
                                    variant="primary"
                                    onClick={clienteVenta}>
                                    Consultar Cliente
                                </Button>
                            </Col>
                            <Col xs={3}>
                                <ListGroup >
                                    <ListGroup.Item className="negrita">DNI: {venta.dniCliente}</ListGroup.Item>
                                    <ListGroup.Item className="negrita">Nombre: {cliente.nombre + " " + cliente.apellido}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col xs={3}>
                                <ListGroup >
                                    <ListGroup.Item className="negrita">Productos: {cantProd}</ListGroup.Item>
                                    <ListGroup.Item className="negrita">Total: ${parseFloat(total).toFixed(2)} </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row className="espacio-superior4 resaltar-borde-inferior">
                            <Col xs={2}>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Ingrese el Código de articulo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese código de articulo"
                                            name="dni"
                                            onChange={handleChange2}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={2} className="espacio-superior5">
                                <Button
                                    variant="primary"
                                    onClick={articuloVenta}>
                                    Consultar Articulo
                                </Button>
                            </Col>
                            <Col xs={5}>
                                <Row>
                                    <Col xs={6}>
                                        <ListGroup >
                                            <ListGroup.Item className="negrita">Código: {articulo.codigo}</ListGroup.Item>
                                            <ListGroup.Item className="negrita">Marca: {articulo.marca}</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <ListGroup >
                                            <ListGroup.Item className="negrita">Tipo: {articulo.tipo}</ListGroup.Item>
                                            <ListGroup.Item className="negrita">Precio: ${articulo.precio}</ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>

                            </Col>

                            <Col xs={3} className="espacio-superior6">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ingrese la cantidad: Si no se ingresa una cantidad, se tomará 1</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese Cantidad"
                                            name="dni"
                                            onChange={handleCantidad}
                                        />
                                    </Form.Group>
                                </Form>
                                <Button
                                    variant="success"
                                    onClick={agregarAVenta}
                                >
                                    Agregar a Venta
                                </Button>
                            </Col>
                        </Row>
                        <Row className="espacio-superior6">
                            <h3>Detalle de Venta</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>

                                        <th>Codigo Interno</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal Art.</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venta.articulos.map((articulo, index) => (
                                        <tr key={index}>
                                            <td>{articulo.articulo}</td>
                                            <td>{articulo.cantidad}</td>
                                            <td>${articulo.precioUnitario}</td>
                                            <td>${articulo.precioUnitario * articulo.cantidad}</td>
                                            <td><Button
                                                variant="danger"
                                                onClick={() => borrarArticulo(index)}
                                            >Eliminar</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>  
                        <Row>
                            <Col>
                                <Button onClick={irCheckInfoVenta}>VERIFICAR INFORMACION DE VENTA</Button>
                            </Col>
                        </Row> 
                        <Row className="espacio-superior4">
                            <Col>
                                <Button 
                                    variant="danger"
                                    onClick={limpiarPagina}>LIMPIAR VENTA
                                </Button>
                            </Col>
                        </Row>                     
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default FormVenta;

