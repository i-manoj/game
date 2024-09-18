// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Confetti from 'react-confetti';

// function Game({ user }) {
//     const [score, setScore] = useState(0);
//     const [highScore, setHighScore] = useState(user.highScore || 0);
//     const [scores, setScores] = useState([]);
//     const [guess, setGuess] = useState('');
//     const [target, setTarget] = useState(Math.floor(Math.random() * 10));
//     const [isConfetti, setIsConfetti] = useState(false);

//     useEffect(() => {
//         // Fetch user data (high score and past scores)
//         const fetchUserData = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/users/${user._id}`);
//                 setHighScore(res.data.highScore);
//                 setScores(res.data.scores);
//             } catch (error) {
//                 console.error('Error fetching user data', error);
//             }
//         };

//         fetchUserData();
//     }, [user]);

//     const handleGuess = async () => {
//         if (parseInt(guess) === target) {
//             const newScore = score + 10;
//             setScore(newScore);

//             // If the new score exceeds the high score, update it and trigger confetti
//             if (newScore > highScore) {
//                 setHighScore(newScore);
//                 setIsConfetti(true);
//                 setTimeout(() => setIsConfetti(false), 5000);  // Confetti for 5 seconds

//                 // Update high score in the backend
//                 await axios.post(`http://localhost:5000/api/users/${user._id}/highscore`, { highScore: newScore });
//             }

//             setTarget(Math.floor(Math.random() * 10));  // New target
//         } else {
//             setScore(score - 5);
//         }

//         // Save the current score in the backend
//         await axios.post(`http://localhost:5000/api/users/${user._id}/score`, { score });
//     };

//     return (
//         <div>
//             {isConfetti && <Confetti />}
//             <h1>Score: {score}</h1>
//             <h2>High Score: {highScore}</h2>
//             <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} />
//             <button onClick={handleGuess}>Submit Guess</button>

//             <h3>Past Scores:</h3>
//             <ul>
//                 {scores.map((s, index) => (
//                     <li key={index}>{s}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Game;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Confetti from 'react-confetti';
// import './Game.css'; // Import the CSS for styling
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Game({ user }) {
//     const [score, setScore] = useState(0);
//     const [highScore, setHighScore] = useState(user.highScore || 0);
//     const [scores, setScores] = useState([]);
//     const [guess, setGuess] = useState('');
//     const [target, setTarget] = useState(Math.floor(Math.random() * 10));
//     const [isConfetti, setIsConfetti] = useState(false);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/users/getScores/${user._id}`);
//                 setHighScore(res.data.highScore);
//                 setScores(res.data.scores);
//             } catch (error) {
//                 console.error('Error fetching user data', error);
//             }
//         };
    
//         if (user?._id) {  // Ensure user is defined before attempting to fetch data
//             fetchUserData();
//         }
//     }, [user]);
    

//     const handleGuess = async () => {
//         if (parseInt(guess) === target) {
//             const newScore = score + 10;
//             setScore(newScore);
    
//             if (newScore > highScore) {
//                 setHighScore(newScore);
//                 setIsConfetti(true);
//                 setTimeout(() => setIsConfetti(false), 5000);  // Confetti for 5 seconds
    
//                 try {
//                     // Update high score in the backend
//                     const res = await axios.put(`http://localhost:5000/api/users/updateHighScore/${user._id}`, 
//                         { highScore: newScore },
//                         { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
//                     );
//                     if (res.data.code === 200) {
//                         toast.success(res.data.message, {
//                             position: "top-right",
//                             autoClose: 5000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             theme: 'light',
//                         });
//                     } else {
//                         toast.error(res.data.message, {
//                             position: "top-center",
//                             autoClose: 3000,
//                             theme: 'dark',
//                         });
//                     }
//                 } catch (error) {
//                     console.error('Error updating high score', error);
//                     toast.error('Failed to update high score. Please try again.', {
//                         position: "top-center",
//                         autoClose: 3000,
//                         theme: 'dark',
//                     });
//                 }
//             }
    
//             // setTarget(Math.floor(Math.random() * 10));  // New target
//             //use static target for testing
//             setTarget(5);
//         } else {
//             setScore(score - 5);
//         }
    
//         try {
//             // Save the current score in the backend
//             await axios.put(`http://localhost:5000/api/users/saveScore/${user._id}`, 
//                 { score },
//                 { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
//             );
//         } catch (error) {
//             console.error('Error saving score', error);
//             toast.error('Failed to save score. Please try again.', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 theme: 'dark',
//             });
//         }
//     };
    
    

//     return (
//         <div className="game-page">
//             {isConfetti && <Confetti />}
//             <div className="game-container">
//                 <h1>Score: {score}</h1>
//                 <h2>High Score: {highScore}</h2>
//                 <input 
//                     type="number" 
//                     value={guess} 
//                     onChange={(e) => setGuess(e.target.value)} 
//                     className="game-input"
//                 />
//                 <button onClick={handleGuess} className="game-btn">Submit Guess</button>

//                 <h3>Past Scores:</h3>
//                 <ul className="past-scores">
//                     {scores.map((s, index) => (
//                         <li key={index}>{s}</li>
//                     ))}
//                 </ul>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }

// export default Game;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Game.css'; // Import CSS for styling
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Confetti from 'react-confetti'; // Make sure to install and import Confetti component

// function Game({ user }) {
//     const [score, setScore] = useState(0);
//     const [highScore, setHighScore] = useState(user.highScore || 0);
//     const [scores, setScores] = useState([]);
//     const [guess, setGuess] = useState('');
//     const [target, setTarget] = useState(Math.floor(Math.random() * 10));
//     const [isConfetti, setIsConfetti] = useState(false);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/api/users/getScores/${user._id}`);
//                 setHighScore(res.data.highScore);
//                 setScores(res.data.scores);
//             } catch (error) {
//                 console.error('Error fetching user data', error);
//             }
//         };

//         if (user?._id) {  // Ensure user is defined before attempting to fetch data
//             fetchUserData();
//         }
//     }, [user]);

//     const handleGuess = async () => {
//         if (parseInt(guess) === parseInt(target)) {
//             const newScore = score + 10;
//             setScore(newScore);

//             if (newScore > highScore) {
//                 setHighScore(newScore);
//                 setIsConfetti(true);
//                 setTimeout(() => setIsConfetti(false), 5000);  // Confetti for 5 seconds

//                 try {
//                     // Update high score in the backend
//                     const res = await axios.put(`http://localhost:5000/api/users/updateHighScore/${user._id}`, 
//                         { highScore: newScore },
//                         { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' } }
//                     );
//                     if (res.data.code === 200) {
//                         toast.success(res.data.message, {
//                             position: "top-right",
//                             autoClose: 5000,
//                             theme: 'light',
//                         });
//                     } else {
//                         toast.error(res.data.message, {
//                             position: "top-center",
//                             autoClose: 3000,
//                             theme: 'dark',
//                         });
//                     }
//                 } catch (error) {
//                     console.error('Error updating high score', error);
//                     toast.error('Failed to update high score. Please try again.', {
//                         position: "top-center",
//                         autoClose: 3000,
//                         theme: 'dark',
//                     });
//                 }
//             }

//             // Set a new target
//             // setTarget(Math.floor(Math.random() * 10));
//             setTarget(5);  // Use a static target for testing
//         } else {
//             setScore(prevScore => prevScore - 5);
//         }

//         try {
//             // Save the current score in the backend
//             const res = await axios.put(`http://localhost:5000/api/users/saveScore/${user._id}`, 
//                 { score },
//                 { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' } }
//             );
//             if (res.data.code === 200) {
//                 toast.success('Score saved successfully!', {
//                     position: "top-right",
//                     autoClose: 3000,
//                     theme: 'light',
//                 });
//             } else {
//                 toast.error('Failed to save score. Please try again.', {
//                     position: "top-center",
//                     autoClose: 3000,
//                     theme: 'dark',
//                 });
//             }
//         } catch (error) {
//             console.error('Error saving score', error);
//             toast.error('Failed to save score. Please try again.', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 theme: 'dark',
//             });
//         }
//     };

//     return (
//         <div className="game-page">
//             {isConfetti && <Confetti />}
//             <div className="game-container">
//                 <h1>Score: {score}</h1>
//                 <h2>High Score: {highScore}</h2>
//                 <input 
//                     type="number" 
//                     value={guess} 
//                     onChange={(e) => setGuess(e.target.value)} 
//                     className="game-input"
//                 />
//                 <button onClick={handleGuess} className="game-btn">Submit Guess</button>

//                 <h3>Past Scores:</h3>
//                 <ul className="past-scores">
//                     {scores.map((s, index) => (
//                         <li key={index}>{s}</li>
//                     ))}
//                 </ul>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }

// export default Game;


import { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css'; // Import CSS for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti'; // Make sure to install and import Confetti component

function Game({ user }) {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(user.highScore || 0);
    const [scores, setScores] = useState([]);
    const [guess, setGuess] = useState('');
    const [target, setTarget] = useState(Math.floor(Math.random() * 10));
    const [isConfetti, setIsConfetti] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/getScores/${user._id}`);
                setHighScore(res.data.highScore);
                setScores(res.data.scores);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        if (user?._id) {
            fetchUserData();
        }
    }, [user]);

    const handleGuess = async () => {
        const currentGuess = parseInt(guess, 10);  // Get the user's guess as a number
        const staticTarget = 5;  // Static target for testing
    
        console.log("Guess: ", currentGuess);
        console.log("Target: ", staticTarget);
    
        // Check if the guess is correct
        if (currentGuess === staticTarget) {
            // Guess is correct, add 10 points
            setScore(prevScore => {
                const newScore = prevScore + 10;
                console.log("New Score (Correct): ", newScore);
    
                // Check if the new score is higher than the high score
                if (newScore > highScore) {
                    setHighScore(newScore);
                    setIsConfetti(true);
                    setTimeout(() => setIsConfetti(false), 5000);  // Show confetti for 5 seconds
    
                    // Update high score on the backend
                    axios.put(`http://localhost:5000/api/users/updateHighScore/${user._id}`, 
                        { highScore: newScore },
                        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' } }
                    ).then(res => {
                        if (res.data.code === 200) {
                            toast.success('High score updated!', {
                                position: "top-right",
                                autoClose: 5000,
                                theme: 'light',
                            });
                        } else {
                            toast.error(res.data.message, {
                                position: "top-center",
                                autoClose: 3000,
                                theme: 'dark',
                            });
                        }
                    }).catch(error => {
                        toast.error('Failed to update high score.', {
                            position: "top-center",
                            autoClose: 3000,
                            theme: 'dark',
                        });
                    });
                }
    
                // Save the new score to the backend
                axios.put(`http://localhost:5000/api/users/saveScore/${user._id}`, 
                    { score: newScore }, 
                    { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' } }
                ).then(res => {
                    if (res.data.code === 200) {
                        toast.success('Score saved successfully!', {
                            position: "top-right",
                            autoClose: 3000,
                            theme: 'light',
                        });
                    } else {
                        toast.error('Failed to save score.', {
                            position: "top-center",
                            autoClose: 3000,
                            theme: 'dark',
                        });
                    }
                }).catch(error => {
                    toast.error('Error saving score.', {
                        position: "top-center",
                        autoClose: 3000,
                        theme: 'dark',
                    });
                });
    
                return newScore;  // Return the updated score
            });
        } else {
            // Guess is incorrect, subtract 5 points
            setScore(prevScore => {
                const newScore = prevScore - 5;
                console.log("New Score (Incorrect): ", newScore);
    
                // Save the new score to the backend
                axios.put(`http://localhost:5000/api/users/saveScore/${user._id}`, 
                    { score: newScore }, 
                    { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' } }
                ).then(res => {
                    if (res.data.code === 200) {
                        toast.success('Score saved successfully!', {
                            position: "top-right",
                            autoClose: 3000,
                            theme: 'light',
                        });
                    } else {
                        toast.error('Failed to save score.', {
                            position: "top-center",
                            autoClose: 3000,
                            theme: 'dark',
                        });
                    }
                }).catch(error => {
                    toast.error('Error saving score.', {
                        position: "top-center",
                        autoClose: 3000,
                        theme: 'dark',
                    });
                });
    
                return newScore;  // Return the updated score
            });
        }
    };
    
    return (
        <div className="game-page">
            {isConfetti && <Confetti />}
            <div className="game-container">
                <h1>Score: {score}</h1>
                <h2>High Score: {highScore}</h2>
                <input 
                    type="number" 
                    value={guess} 
                    onChange={(e) => setGuess(e.target.value)} 
                    className="game-input"
                />
                <button onClick={handleGuess} className="game-btn">Submit Guess</button>

                <h3>Past Scores:</h3>
                <ul className="past-scores">
                    {scores.map((s, index) => (
                        <li key={index}>{s}</li>
                    ))}
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
}



export default Game;
