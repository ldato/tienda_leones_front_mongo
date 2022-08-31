import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value,
        })
        //console.log(userLogin)
    }

   

    const enviarCredenciales = async (e) => {
        e.preventDefault();
        console.log(userLogin);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userLogin)
        };
        const response = await fetch('http://localhost:3000/api/auth/login', requestOptions);
        const user = await response.json();
        console.log(user);
        if (user.token) {
            localStorage.setItem('x-access-token', user.token);
            localStorage.setItem('nombre', user.user.nombre);
            navigate('/Home')
        } else {
            alert(user.message);
        }
    }

    return (
        <>
            <Container>
                <Row className='espacio-superior3'>
                    <h3>Formulario de ingreso al sistema</h3>
                </Row>
                <Row className='espacio-superior4'>  
                    <Col xs={3}>

                    </Col>                  
                    <Col xs={6}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Dirección de email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Ingrese el email registrado"
                                    name="email" 
                                    onChange={handleChange}    
                                    />                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Ingrese su contraseña"
                                    name="password" 
                                    onChange={handleChange}
                                    />
                            </Form.Group>                           
                            <Button variant="primary" type="submit" onClick={enviarCredenciales}>
                                Ingresar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login