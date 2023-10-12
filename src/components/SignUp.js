// src/SignUp.js
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from "wouter";


function SignUp({ setUser }) {
    const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "" });
    const [location, setLocation] = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Store the user details in local storage as a mock database
        localStorage.setItem('userEmail', JSON.stringify(formData));
        localStorage.setItem('currentUser', JSON.stringify(formData));

        // Automatically log the user in and navigate to preferences
        setUser(formData);
        // Navigate to the preferences page
        setLocation('/preferences');
    };

    return (
        // Use Bootstrap's utility classes to center the card both vertically and horizontally
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={formData.firstname} onChange={e => setFormData({ ...formData, firstname: e.target.value })} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value })} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                        </Form.Group>

                        <Button type="submit">SignUp</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUp;
