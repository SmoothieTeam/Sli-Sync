import UploadPage from "./pages/UploadPage";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import UploadedPage from "./pages/UploadedPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import VideoViewPage from "./pages/VideoViewPage";
import * as postResultAPI from "./firebase_api/firebase_post_result_api";
import * as postCreateAPI from "./firebase_api/firebase_post_create_api";
import * as postStatusAPI from "./firebase_api/firebase_post_status_api";

function App() {
  const sendEmail = () => {};
  const copyLink = () => {};
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/view/:id">
            <VideoViewPage
              postResultAPI={postResultAPI}
              sendEmail={sendEmail}
              copyLink={copyLink}
            />
          </Route>
          <Route path="/uploaded/:id">
            <UploadedPage
              postStatusAPI={postStatusAPI}
              sendEmail={sendEmail}
              copyLink={copyLink}
            />
          </Route>
          <Route path="/loading/:id">
            <LoadingPage postStatusAPI={postStatusAPI}/>
          </Route>
          <Route path="/upload">
            <UploadPage postCreateAPI={postCreateAPI}/>
          </Route>
          <Route path="*" exact>
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
