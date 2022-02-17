import UploadPage from "./pages/UploadPage";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { HashRouter } from "react-router-dom";
import UploadedPage from "./pages/UploadedPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import { getPostTitle, getProgress } from "./firebase_models/posts";

function App() {
  const sendEmail = () => {};
  const copyLink = () => {};
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/uploaded/:id">
            <UploadedPage
              getPostTitle={(id) => getPostTitle(id)}
              sendEmail={sendEmail}
              copyLink={copyLink}
            />
          </Route>
          <Route path="/loading/:id">
            <LoadingPage
              getProgress={(id, onNext) => getProgress(id, onNext)}
            />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
