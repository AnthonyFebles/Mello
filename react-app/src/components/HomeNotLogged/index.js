import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

import './HomeNotLogged.css'

function HomeNotLogged() {

const dispatch = useDispatch()
const history = useHistory()

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

    return (
        <>
            <h1> Not Logged In Home Page </h1>

            <div className="title-desc-card">
                <h1> Mello </h1>
                <p> A clone of an organizational Website named Trello but with a Lo-Fi / Calming Twist </p>
            </div>

            <div className="login-form">
                <h2> Log In </h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email or phone number</label>
                        <input type="text" id="email" name="email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>

                    <div className="form-group">
                        <button type="submit">Log In</button>   
                    </div>

                    <div className="signup-button">
                        <button> Sign Up </button>
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
