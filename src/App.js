import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "@fontsource/sora";

import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";

import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebase/config";

import { FirebaseAuthProvider } from "@react-firebase/auth";
import { FirestoreProvider } from "@react-firebase/firestore";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateBattlePage from "./pages/CreateBattlePage";
import BattlePage from "./pages/BattlePage";

function App() {
  const { providerId, isSignedIn, ...authProviderConfig } = firebaseConfig;
  console.log(firebaseConfig);
  return (
    <>
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <FirestoreProvider firebase={firebase} {...firebaseConfig}>
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
              <Route path="/signup" exact>
                <SignUpPage />
              </Route>
              <Route path="/movie/:id" exact>
                <MoviePage />
              </Route>
              <Route path="/create/battle" exact>
                <CreateBattlePage />
              </Route>
              <Route path="/battle/:bid" exact>
                <BattlePage />
              </Route>
            </Switch>
          </Router>
        </FirestoreProvider>
      </FirebaseAuthProvider>
    </>
  );
}

export default App;
