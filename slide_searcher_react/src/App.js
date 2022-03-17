import UploadPage from "./pages/UploadPage";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import UploadedPage from "./pages/UploadedPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import VideoViewPage from "./pages/VideoViewPage";
import { getPostTitle, getProgress } from "./firebase_models/posts";
import * as postResultAPI from "./firebase_models/firebase_post_result_api";
import NotFound from "./pages/NotFound";

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
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
