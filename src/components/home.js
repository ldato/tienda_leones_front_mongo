import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import Panel from './panel';

const Home = () => {
    return(
        <>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Panel/>
                    </Col>
                </Row>
            </Container>            
        </>
    )
}

export default Home;