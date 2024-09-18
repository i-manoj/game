// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function Leaderboard() {
//     const [topPlayers, setTopPlayers] = useState([]);

//     useEffect(() => {
//         const fetchLeaderboard = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/users/leaderboard');
//                 setTopPlayers(res.data);
//             } catch (error) {
//                 console.error('Error fetching leaderboard', error);
//             }
//         };

//         fetchLeaderboard();
//     }, []);

//     return (
//         <div>
//             <h2>Leaderboard</h2>
//             <ul>
//                 {topPlayers.map((player, index) => (
//                     <li key={index}>
//                         {player.username}: {player.highScore}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Leaderboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'; // Import the CSS for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Leaderboard() {
    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get('game-back-production-a4cf.up.railway.app/api/users/getHighScores');
                console.log("Leaderboard response", res);
        
                if(res.data.code === 400) {
                    toast.error(res.data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        theme: 'dark',
                    });
                    return;
                }
        
                if(res.data.code === 200) {
                    setTopPlayers(res.data.topUsers);  // Corrected to use 'topUsers'
                    toast.success('Leaderboard fetched successfully!', {
                        position: "top-right",
                        theme: 'light',
                    });
                }
        
            } catch (error) {
                console.error('Error fetching leaderboard', error);
                toast.error('Failed to fetch leaderboard. Please try again.', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: 'dark',
                });
            }
        };
        

        fetchLeaderboard();
    }, []);

    return (
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                <h2>Leaderboard</h2>
                <ul className="leaderboard-list">
                    {topPlayers.map((player, index) => (
                        <li key={index} className="leaderboard-item">
                            <span className="player-rank">#{index + 1}</span> 
                            <span className="player-name">{player.username}</span> 
                            <span className="player-score">{player.highScore}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Leaderboard;
