import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Panel from './panel';
import { useState, useEffect } from 'react';
import Select from "react-select";



const IngresoArticulo = () => {

    const [articulo, setArticulo] = useState({
        codigo: "",
        marca: "",
        proveedor: "",
        precioVenta: "",
        precioCosto: "",
        cantidad: "",
        tipo: ""
    });

    let marcas = [];
    let proveedor = [];

    const traerMarcas = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        });
        const requestOpciones2 = {
            method: 'GET',
            headers: myHeaders
        }
        const response = await fetch("http://localhost:3000/api/marcas/verMarcas", requestOpciones2);
        const data = await response.json();
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            let objetoMarca = { value: "", label: "", name: "" };
            objetoMarca.label = data[i].nombre;
            objetoMarca.value = data[i]._id;
            objetoMarca.name = "marca";
            marcas.push(objetoMarca);
        }
    }

    const traerProveedores = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        });
        const requestOpciones3 = {
            method: 'GET',
            headers: myHeaders
        }
        const response = await fetch("http://localhost:3000/api/proveedores/todos", requestOpciones3);
        const data = await response.json();
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            let objetoProveedor = { value: "", label: "", name: "" };
            objetoProveedor.label = data[i].nombre;
            objetoProveedor.value = data[i]._id;
            objetoProveedor.name = "proveedor";
            proveedor.push(objetoProveedor);
        }
    }

    const handleChange = (e) => {
        //e.preventDefault();
        setArticulo({
            ...articulo,
            [e.name]: e.value
        })
    }

    const handleChange2 = (e) => {
        e.preventDefault();
        setArticulo({
            ...articulo,
            [e.target.name]: e.target.value
        })
        //console.log(cliente)
    }

    const handleChangeInt = (e) => {
        e.preventDefault();
        setArticulo({
            ...articulo,
            [e.target.name]: parseFloat(e.target.value)
        })
    }

    const enviarArticulo = async () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token')
        });
        const requestOpciones = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(articulo)
        }
        const nuevoArticulo = await fetch('http://localhost:3000/api/articulos/crearArticulo', requestOpciones);
        const response = await nuevoArticulo.json();
        if (response.articulo) {
            alert(response.message);
            window.location.reload(false);
        } else {
            alert(response.message);
        }   
    }

    useEffect(() => {
        traerMarcas();
        traerProveedores();
    })

    // const mostrarArticulo = () => {
    //     console.log(articulo)
    // }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Panel />
                    </Col>
                    <Col xs={1}>

                    </Col>
                    <Col xs={9} className="espacio-superior3">
                    <h2>FORMULARIO DE INGRESO DE NUEVO ARTICULO</h2>
                        <Row className="espacio-superior4">
                            
                            <Col xs={5} >
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Ingrese el Código del nuevo articulo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Código"
                                            name="codigo"
                                            onChange={handleChange2}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Elija una marca de la lista despleglable</Form.Label>
                                        <Select options={marcas} onChange={handleChange} name="marca" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Elija un proveedor de la lista desplegable</Form.Label>
                                        <Select options={proveedor} onChange={handleChange} name="marca" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Ingrese el precio de VENTA del articulo</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el Precio de VENTA"
                                            name="precioVenta"
                                            onChange={handleChangeInt}
                                        />
                                    </Form.Group>


                                </Form>
                            </Col>
                            <Col xs={5} >
                                <Form>


                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Ingrese el precio de COSTO del articulo</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el precio de COSTO"
                                            name="precioCosto"
                                            onChange={handleChangeInt}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Ingrese la CANTIDAD del articulo</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese la CANTIDAD"
                                            name="cantidad"
                                            onChange={handleChangeInt}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Ingrese una DESCRIPCION del articulo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Por ejemplo Remera Marca X"
                                            name="tipo"
                                            onChange={handleChange2}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={9}>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={enviarArticulo}
                                    className="espacio-superior3">
                                    Click aquí para ingresar nuevo articulo
                                </Button>
                            </Col>
                        </Row>
                    </Col>


                </Row>
            </Container>

        </>
    )

}

export default IngresoArticulo;