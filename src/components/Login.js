// src/Login.js
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'wouter';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useLocation();
  console.log('setUser in Login.js:', setUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem('currentUser'));
    const storedUserEmail = storedUserData.email;
    console.log(storedUserData);
    if (storedUserData) {
      setUser(storedUserData);
    }
    setLocation('/preferences');
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '25rem', height: '12rem' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button type='submit'>Login</Button>
          </Form>
          <a href='/signup' className='btn btn-link mt-3'>
            Sign Up
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
