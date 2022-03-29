import UploadPage from "./pages/UploadPage";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import UploadedPage from "./pages/UploadedPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import VideoViewPage from "./pages/VideoViewPage";
import * as postResultAPI from "./firebase_api/firebase_post_result_api";
import * as postAPI from "./firebase_api/firebase_post_api";
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
              sendEmail={sendEmail}
              copyLink={copyLink}
            />
          </Route>
          <Route path="/loading/:id">
            <LoadingPage
            />
          </Route>
          <Route path="/upload">
            <UploadPage postAPI={postAPI}/>
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
