import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import Panel from './panel';
import {useNavigate } from 'react-router-dom';
import {useEffect} from 'react';


const Home = () => {

    const navigate = useNavigate();

    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('x-access-token')
    });

    const requestOpciones = {
        method: 'GET',
        headers: myHeaders
    }

    const consultarToken = async () => {
        const consulta = await fetch('http://localhost:3000/api', requestOpciones);
        const response = await consulta.json();
        console.log(response);
        if (response.message === 'Token invalido') {
            navigate('/login');
        }
    }

    useEffect(() => {
        consultarToken();
    })

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