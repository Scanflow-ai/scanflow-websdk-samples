/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Home from "./Home";
const App = () => {
  const reload = () => window.location.reload();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route exact path="/docs" />
          <Route
            path="/docs"
            render={() => (
              <Navigate
                to={{
                  pathname: "https://demo.scanflow.ai/docs/",
                }}
              />
            )}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
