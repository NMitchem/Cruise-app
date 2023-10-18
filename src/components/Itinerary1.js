import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Card, Table, Alert } from 'react-bootstrap';

//delete this after we get api call working
let mockData = [
  {
    '9:00-10:00':
      'Eat breakfast on Deck 11 at the Garden Cafe, featuring a variety of options for all ages, including made-to-order omelets and pancakes for the kids.',
    '10:00-11:00':
      'Head to the Splash Academy on Deck 12 for age-appropriate activities for your 11-year-old daughter, such as arts and crafts, games, and scavenger hunts.',
    '11:00-12:00':
      'Take a family shore excursion to the nearby beach or water park, offering a fun-filled morning of swimming, sunbathing, and relaxation for all.',
    '12:00-1:00':
      'Enjoy a family lunch at the buffet on Deck 11, featuring a diverse selection of international cuisine, including vegetarian and gluten-free options for the adults and a variety of kid-friendly choices for your daughter.',
    '1:00-2:00':
      'Attend a family-friendly show or entertainment event on Deck 7, such as a magic show, comedy act, or musical performance, sure to delight all ages.',
    '2:00-3:00':
      'Take a break and relax in your cabin or by the pool, offering a chance for your daughter to recharge and for you and your husband to enjoy some quiet time together.',
    '3:00-4:00':
      'Participate in a family-friendly activity or game on Deck 12, such as mini-golf, basketball, or a scavenger hunt, providing a fun and active way to spend time together.',
    '4:00-5:00':
      'Enjoy a family cocktail hour on Deck 11, featuring a variety of non-alcoholic drinks and snacks for your daughter and signature cocktails and appetizers for you and your husband.',
    '5:00-6:00':
      "Have dinner at a specialty restaurant on Deck 12, such as Cagney's Steakhouse or Le Bistro, offering a range of delicious options for all ages and tastes, including vegetarian and gluten-free choices.",
    '6:00-7:00':
      'End the evening with a family-friendly movie night or live show on Deck 7, providing a fun and memorable way to cap off your day.'
  }
];

function Itinerary1() {
  const [schedule, setSchedule] = useState([]);
  const [notAllActivities, setNotAllActivities] = useState(false);

  useEffect(() => {
    // Fetch the itinerary from the Flask backend
    const fetchItinerary = async () => {
      try {
        //This would be the api call - but the endpoint is wrong
        // const response = await axios.get('http://localhost:5000/api/get-itinerary');
        // const itineraryData = response.data;

        //delete this after we get api call working
        let itineraryData = mockData;

        console.log('Fetched itinerary:', itineraryData);

        const slots = [
          { time: '8:00-9:00', activity: 'Breakfast' },
          { time: '12:00-13:00', activity: 'Lunch' },
          { time: '15:00-16:00', activity: 'Relaxation' }
        ];

        // Merge special slots and fetched itinerary
        itineraryData.forEach((item) => {
          Object.entries(item).forEach(([time, activity]) => {
            if (!slots.some((slot) => slot.time === time)) {
              slots.push({ time, activity });
            }
          });
        });

        // Sort by time for better readability
        slots.sort((a, b) => a.time.localeCompare(b.time));

        setSchedule(slots);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      }
    };

    fetchItinerary();
  }, []);

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Card style={{ width: '40rem', borderWidth: '2px' }}>
        <Card.Body>
          <Card.Title className='text-center mt-3'>Daily Itinerary</Card.Title>
          <Table
            striped
            bordered
            hover
            size='sm'
            style={{
              width: '100%',
              border: '2px solid',
              backgroundColor: 'lightblue'
            }}
          >
            <thead>
              <tr>
                <th>Time</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {/* Iterate through the schedule arr, create row for each slot, with time and activity and display */}
              {schedule.map(({ time, activity }) => (
                <tr key={time}>
                  <td>{time}</td>
                  <td>{activity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {notAllActivities && (
            <Alert variant='warning' style={{ marginTop: '20px' }}>
              Not all activities were available today.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Itinerary1;
