import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { login } from "../../store/session";


import './HomeNotLogged.css'

function HomeNotLogged() {

const dispatch = useDispatch()
const history = useHistory()
const sessionUser = useSelector((state) => state.session.user);

//! useStates
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errors, setErrors] = useState([])

if (sessionUser) return <Redirect to="/boards" />;

const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    // console.log(data) *currently undefined

    if (data) {
        setErrors(data);
    } else {
        setErrors(['Testing']);
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
    history.push('/signup');
}

    return (
        <>

        <div className="container">
            <div className="mello-image">
                <img src="/melloimage.png" alt="mello img" />
            </div>

            <div className="title-login-container">
                <div className="title-desc-card">
                    <h1> mello </h1>
                </div>

                <div className="login-form">

                <ul>
                    {console.log(errors)}
                {errors.map((error, idx) => (
                    <div key={idx}>{error}</div>
                ))}
                </ul>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" required id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" required id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>


                        <div className="form-group">
                            <button type="submit">Log In</button>   
                        </div>

                    </form>

                    <div className="signup-button">
                        <button onClick={handleSignUp}> Sign Up </button>
                    </div>

                    <div className="demo-login">
                        <button onClick={handleDemoLogin}>Demo-Login</button>
                    </div>
            </div>

            </div>
        </div>

        </>
    )
}

export default HomeNotLogged
