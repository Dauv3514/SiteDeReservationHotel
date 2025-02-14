import { AuthContext } from "../../context/AuthContext";
import "./login.css"
import { useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })
    const {loading, error, dispatch } = useContext(AuthContext);
    
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCredentials((prev)=> ({ ...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        navigate("/")
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
        } catch(err) {
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }
    }

    return <div className="login">
        <div className="lContainer">
            <input 
                type="text" 
                className="lInput"
                id="username"
                placeholder="username"
                onChange={handleChange}
            />
            <input 
                type="password" 
                className="lInput"
                id="password"
                placeholder="password"
                onChange={handleChange}
            />
            <button disabled={loading} onClick={handleClick} className="lButton">
                Login
            </button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
};

export default Login;