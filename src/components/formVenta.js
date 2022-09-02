import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import Panel from './panel';

const FormVenta = () => {
    
    return(
        <>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Panel/>
                    </Col>
                    <Col>
                        <h1>NUEVA VENTA FORM</h1>
                    </Col>
                </Row>
            </Container>            
        </>
    )
}

export default FormVenta;

