import UploadPage from './pages/UploadPage.js';
import { Switch, Route } from 'react-router-dom';
import React from 'react';
import VideoViewPage from './pages/VideoViewPage.js';
import UploadedPage from './pages/UploadedPage.js';
import LoadingPage from './pages/LoadingPage.js';
import HomePage from './pages/HomePage.js';
import { initApp, getFirestore } from './firebase_stores/init.js';
import { uploadPost, getPost, getPostTitle, getProgress } from './firebase_stores/posts.js';


const app = initApp();
const firestore = getFirestore(app);

function App() {
  const handleUpload = (title, video, slide) => {
    return uploadPost(firestore, {title, videoURL: '', pdfURL: ''});
  };
  const uploadVideo = (file, onProgress) => {};
  const uploadSlide = (file, onProgress) => {};
  const sendEmail = () => {};
  const copyLink = () => {};
  return(
    <div className='App'>
      <Switch>
        <Route path='/view/:id'>
          <VideoViewPage 
            getPost={(id) => getPost(firestore, id)} 
            sendEmail={sendEmail} 
            copyLink={copyLink}/>
        </Route>
        <Route path='/uploaded/:id'>
          <UploadedPage 
            getPostTitle={(id) => getPostTitle(firestore, id)}
            sendEmail={sendEmail}
            copyLink={copyLink}/>
        </Route>
        <Route path='/loading/:id'>
          <LoadingPage 
            getProgress={(id, onNext) => getProgress(firestore, id, onNext)}/>
        </Route>
        <Route path='/upload'>
          <UploadPage 
            onUpload={handleUpload} 
            uploadVideo={uploadVideo}
            uploadSlide={uploadSlide}/>
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;