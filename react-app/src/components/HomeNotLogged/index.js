import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

import './HomeNotLogged.css'

function HomeNotLogged() {

const dispatch = useDispatch()
const history = useHistory()

//! useStates
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errors, setErrors] = useState([])

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
        setErrors(data);
    }
};

const handleDemoLogin = () => {
    
    const demoCredentials = {
        email: 'demo@aa.io',
        password: 'password',
    };
    
    dispatch(login(demoCredentials.email, demoCredentials.password))
        .then(() => {
        history.push('/boards');
    })
};


const handleSignUp = () => {
    history.push('/signup')
}

    return (
        <>
            <h1> Not Logged In Home Page </h1>

            <div className="title-desc-card">
                <h1> Mello </h1>
                <p> A clone of an organizational Website named Trello but with a Lo-Fi / Calming Twist </p>
            </div>

            <div className="login-form">
                <h2> Log In </h2>
                <form onSubmit = {handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-errors">
                        {errors.map((error, index) => <div key={index}>{error}</div>)}
                    </div>

                    <div className="form-group">
                        <button type="submit">Log In</button>   
                    </div>

                    <div className="signup-button">
                        <button onClick={handleSignUp}> Sign Up </button>
                    </div>

                </form>

                <div className="demo-login">
                    <button onClick={handleDemoLogin}>Demo-Login</button>
                </div>

            </div>

        </>
    )
}

export default HomeNotLogged
