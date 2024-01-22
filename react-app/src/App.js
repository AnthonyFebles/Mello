import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllBoards from "./components/AllBoards"
import List from "./components/Lists";
import ListDetails from "./components/Lists/ListDetails";
import CurrentBoard from "./components/BoardDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route exact path="/boards">
						<AllBoards />
					</Route>
					<Route exact path='/boards/:id'>
						<CurrentBoard />
				  </Route>
                	<Route exact path='/lists/:id'>
                    <ListDetails />
                </Route>
				</Switch>
			)}
		</>
	);
}

export default App;
