// import React, { useState, useEffect } from 'react';
// import { Card, Table, Alert } from 'react-bootstrap';

// function Itinerary() {
//   const [schedule, setSchedule] = useState([]);
//   const [notAllActivities, setNotAllActivities] = useState(false);

//   useEffect(() => {
//     const userEmail = JSON.parse(localStorage.getItem('currentUser')).email;
//     const preferences = JSON.parse(
//       localStorage.getItem(`preferences_${userEmail}`)
//     );

//     if (preferences) {
//       const { selectedActivities } = preferences;

//       const slots = [
//         { time: '8:00 - 9:00', activity: 'Breakfast' },
//         { time: '9:00 - 10:00' },
//         { time: '10:00 - 11:00' },
//         { time: '11:00 - 12:00' },
//         { time: '12:00 - 13:00', activity: 'Lunch' },
//         { time: '13:00 - 14:00' },
//         { time: '14:00 - 15:00' },
//         { time: '15:00 - 16:00', activity: 'Relaxation' },
//         { time: '16:00 - 17:00' }
//       ];

//       slots.forEach((slot) => {
//         if (!slot.activity) {
//           if (selectedActivities.length > 0) {
//             const randomIndex = Math.floor(
//               Math.random() * selectedActivities.length
//             );
//             slot.activity = selectedActivities[randomIndex];
//             selectedActivities.splice(randomIndex, 1);
//           } else {
//             slot.activity = 'Free Time';
//           }
//         }
//       });

//       setSchedule(slots);

//       if (selectedActivities.length > 0) {
//         setNotAllActivities(true);
//       }
//     }
//   }, []);

//   return (
//     <div
//       className='d-flex justify-content-center align-items-center'
//       style={{ height: '100vh' }}
//     >
//       <Card style={{ width: '27rem', borderWidth: '2px' }}>
//         <Card.Body>
//           <Card.Title className='text-center mt-3'>Daily Itinerary</Card.Title>
//           <Table
//             striped
//             bordered
//             hover
//             size='sm'
//             style={{
//               width: '100%',
//               border: '2px solid',
//               backgroundColor: 'lightblue'
//             }}
//           >
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Activity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {schedule.map((event) => (
//                 <tr key={event.time}>
//                   <td>{event.time}</td>
//                   <td>{event.activity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           {notAllActivities && (
//             <Alert variant='warning' style={{ marginTop: '20px' }}>
//               Not all activities were available today.
//             </Alert>
//           )}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default Itinerary;
