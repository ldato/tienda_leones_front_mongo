import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import {useNavigate } from 'react-router-dom'
import {useEffect} from 'react';


const Panel = () => {

    const navigate = useNavigate();

    const tieneToken = () => {
        if (!localStorage.getItem('x-access-token')) {
            navigate('/login')
        } 
    }
    useEffect(() => {
        tieneToken();
    }, []);

    const irConsultaArticulo = () => {
        navigate('/articulo');
    }

    const irNuevaVenta = () => {
        navigate('/nuevaVenta');
    }

    const irIngresoCliente = () => {
        navigate('/ingresoCliente');
    }

    const irIngresoArticulo = () => {
        navigate('/ingresoArticulo');
    }

    const irConsultaCliente = () => {
        navigate('/cliente');
    }

    return(
        <>
            <Container fluid>
                <Row className="espacio-superior4">
                    <Col xs={12} className="resaltar-borde">
                        <p className="negrita">{localStorage.getItem('nombre')}</p>
                        <Row>
                            <Col xs={12} className="espacio-superior4">
                                <Button 
                                    variant="outline-dark"  
                                    className="tamanio-boton"
                                    onClick={irNuevaVenta}>
                                    Nueva Venta
                                    </Button>
                            </Col>
                            <Col xs={12} className="espacio-boton-home">
                                <Button 
                                    variant="outline-dark" 
                                    className="tamanio-boton"
                                    onClick={irConsultaArticulo}>
                                    Consultar Producto
                                    </Button>
                            </Col>
                            <Col xs={12} className="espacio-boton-home">
                                <Button 
                                    variant="outline-dark" 
                                    className="tamanio-boton"
                                    onClick={irIngresoCliente}>
                                    Ingresar Nuevo Cliente
                                    </Button>
                            </Col>
                            <Col xs={12} className="espacio-boton-home">
                                <Button 
                                    variant="outline-dark"  
                                    className="tamanio-boton">
                                    Actulizar Stock Por Articulo
                                    </Button>
                            </Col>
                            <Col xs={12} className="espacio-boton-home">
                                <Button 
                                    variant="outline-dark"  
                                    className="tamanio-boton"
                                    onClick={irIngresoArticulo}>
                                    Ingresar Nuevo Producto
                                    </Button>
                            </Col>   
                            <Col xs={12} className="espacio-boton-home">
                                <Button 
                                    variant="outline-dark" 
                                    className="tamanio-boton">
                                    Consultar Venta por DNI
                                    </Button>
                            </Col>
                            <Col xs={12} className="espacio-boton-home">
                                <Button 
                                    variant="outline-dark"  
                                    className="tamanio-boton">
                                    Consultar Venta por Producto
                                    </Button>
                            </Col>
                            <Col xs={12} className="espacio-boton-home">
                                <Button 
                                    variant="outline-dark"  
                                    className="tamanio-boton"
                                    onClick={irConsultaCliente}>
                                    Consultar Datos Cliente
                                    </Button>
                            </Col>                                                    
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Panel;