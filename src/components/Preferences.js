// src/Preferences.js
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation } from 'wouter';
import axios from 'axios'; 

function Preferences({ setItineraryPage }) {
  const [formData, setFormData] = useState({
    accompanyingMembers: 1,
    dietaryRestrictions: ''
  });
  const [showActivityOptions, setShowActivityOptions] = useState(false);
  const activities = [
    'wine',
    'wine tasting',
    'wine tours',
    'spa',
    'art & cultural events',
    'nature',
    'painting',
    'hiking',
    'boating',
    'parasailing',
    'swimming',
    'snorkeling',
    'scuba diving',
    'karaoke',
    'dancing',
    'fishing',
    'bbqing'
  ];
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [response, setResponse] = useState(null);
  const [, setLocation] = useLocation();

  // **** OLD, will delete after we get the api calls working
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Mock database: Save user preferences in local storage
  //   const userEmail = JSON.parse(localStorage.getItem('currentUser')).email;
  //   localStorage.setItem(
  //     `preferences_${userEmail}`,
  //     JSON.stringify({
  //       formData,
  //       selectedActivities
  //     })
  //   );

  //   setItineraryPage(true);
  //   setLocation('/itinerary');
  // };

  // Post selections to flask app to be ingested in the model
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to be sent to the server
    const userPrefs = {
      formData,
      selectedActivities
    };
  
    try {
      // Sending the data to the Flask API endpoint
      const response = await axios.post('http://localhost:5001/api/run-script', userPrefs);
      console.log('Server Response: ', response.data.result);
      //setResult(response.data.result);
      setResponse(response);
      console.log('Server Response: ', response.data);
  
      // If successful, proceed to set the itinerary page - we may need to add a timeout here to delay things while model processes
      // TODO - add setTimeout logic later
      localStorage.setItem('itinerary', JSON.stringify(response.data.result));
      setItineraryPage(true);
      setLocation('/itinerary');
  
    } catch (error) {
      console.error('There was an error sending the data', error);
    }
  };

  return (
    // Center the card both vertically and horizontally on the screen
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Capture the number of accompanying members */}
            <Form.Group>
              <Form.Label>Accompanying Members</Form.Label>
              <Form.Control
                type='number'
                value={formData.accompanyingMembers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accompanyingMembers: e.target.value
                  })
                }
                required
              />
            </Form.Group>

            {/* Capture dietary restrictions */}
            <Form.Group>
              <Form.Label>Dietary Restrictions</Form.Label>
              <Form.Control
                type='text'
                value={formData.dietaryRestrictions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dietaryRestrictions: e.target.value
                  })
                }
              />
            </Form.Group>

            {/* Descriptive text for tailoring the itinerary */}
            <p>
              Would you like to customize your interests to generate a
              tailor-made itinerary just for you?
            </p>

            {/* Toggle button to show/hide activity options */}
            <Button
              className='mb-3'
              onClick={() => setShowActivityOptions(!showActivityOptions)}
            >
              {showActivityOptions ? 'Hide Options' : 'Tailor my Itinerary'}
            </Button>

            {/* If user wants a tailored itinerary, show activity options */}
            {showActivityOptions && (
              <div className='mb-3 d-flex flex-wrap justify-content-between'>
                {activities.map((activity) => (
                  <Button
                    key={activity}
                    // If the activity is in selectedActivities, set button style to 'primary', else set to 'secondary'
                    variant={
                      selectedActivities.includes(activity)
                        ? 'primary'
                        : 'secondary'
                    }
                    onClick={() =>
                      setSelectedActivities((prev) =>
                        // Toggle inclusion: if activity is already selected, remove it; otherwise, add it
                        prev.includes(activity)
                          ? prev.filter((a) => a !== activity)
                          : [...prev, activity]
                      )
                    }
                    className='m-1'
                  >
                    {activity}
                  </Button>
                ))}
              </div>
            )}

            <div className='d-flex justify-content-between'>
              <Button type='submit'>Submit Preferences</Button>
              <Button
                variant='secondary'
                onClick={() => setLocation('/itinerary')}
              >
                Skip
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Preferences;
