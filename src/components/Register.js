// import { useState } from 'react';
// import axios from 'axios';

// function Register() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/users/register', { username, password });
//             alert('User registered successfully!');
//         } catch (error) {
//             console.error('Registration error', error);
//         }
//     };

//     return (
//         <form onSubmit={handleRegister}>
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//             <button type="submit">Register</button>
//         </form>
//     );
// }

// export default Register;
import { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:5000/api/users/register', { username, password });
            if(res.data.code===400){
                toast.error(res.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: 'dark',
                });
                return;
            }
            toast.success('User registered successfully', {
                position: "top-center",
                autoClose: 3000,
                theme: 'dark',
            });
            setTimeout(() => {
                navigate('/game');  // Programmatic navigation to game page
            }, 2000);

        } catch (error) {
            console.error('Registration error', error);
            toast.error('Registration error', {
                position: "top-center",
                autoClose: 3000,
                theme: 'dark',
            });
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                        required 
                        className="register-input"
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                        className="register-input"
                    />
                    <button type="submit" className="register-btn">Register</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
