import { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Attempting login with", { username, password });
        
        try {
            const res = await axios.post('https://game-back-production-a4cf.up.railway.app/api/users/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
            console.log("Server response", res);
            
            if(res.data.code === 400) {
                toast.error(res.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: 'dark',
                });
                return;
            }
            
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            toast.success('Login successful!', {
                position: "top-right",
                theme: 'light',
            });
            setTimeout(() => {
                navigate('/game');  // Programmatic navigation to game page
            }, 2000);
        } catch (error) {
            console.error('Login error', error);
            toast.error('Login failed. Please try again!', {
                position: "top-center",
                autoClose: 3000,
                theme: 'dark',
            });
        }
    };
    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                        required 
                        className="login-input"
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                        className="login-input"
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
             <ToastContainer />
        </div>
    );
}

export default Login;
