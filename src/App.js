// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import LandingPage from './components/LandingPage';
import Header from './components/Header';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
             <Header /> 
            <Routes>
                <Route path="/" element={<LandingPage />} />   {/* Landing page route */}
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/game" element={user ? <Game user={user} /> : <Login setUser={setUser} />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </Router>
    );
}

export default App;

