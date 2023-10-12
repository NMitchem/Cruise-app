// src/components/Home.js
import React from 'react';
import { Link } from 'wouter';
import { Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '18rem' }}>
        <Card.Body className='d-flex flex-column align-items-center'>
          <Card.Title>Welcome to NCL</Card.Title>
          <Link href='/signup'>
            <Button className='mb-2' variant='primary'>
              Sign Up
            </Button>
          </Link>
          <Link href='/login'>
            <Button variant='secondary'>Login</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
