import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import  AllBoards  from "./components/AllBoards"
import { Comments } from "./components"
import HomeNotLogged from "./components/HomeNotLogged";
import List from "./components/Lists";
import ListDetails from "./components/Lists/ListDetails";
import CurrentBoard from "./components/BoardDetails";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

const showNavbar = !["/", "/signup"].includes(location.pathname);

  return (
		<>
			{showNavbar && <Navigation isLoaded={isLoaded} />}
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
					<Route path="/cards/:cardId/comments" component={Comments} />
					<Route exact path="/">
						<HomeNotLogged />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
