import UploadPage from "./pages/UploadPage";
import { Switch, Route } from "react-router-dom";
import React from "react";
import VideoViewPage from "./pages/VideoViewPage";
import UploadedPage from "./pages/UploadedPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import {
  getPost,
  getPostTitle,
  getProgress,
} from "./firebase_stores/posts";

function App() {
  const sendEmail = () => {};
  const copyLink = () => {};
  return (
    <div className="App">
      <Switch>
        <Route path="/view/:id">
          <VideoViewPage
            getPost={(id) => getPost(id)}
            sendEmail={sendEmail}
            copyLink={copyLink}
          />
        </Route>
        <Route path="/uploaded/:id">
          <UploadedPage
            getPostTitle={(id) => getPostTitle(id)}
            sendEmail={sendEmail}
            copyLink={copyLink}
          />
        </Route>
        <Route path="/loading/:id">
          <LoadingPage getProgress={(id, onNext) => getProgress(id, onNext)} />
        </Route>
        <Route path="/upload">
          <UploadPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
