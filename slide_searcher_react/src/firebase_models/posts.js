import { doc, getDoc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "./firebase_wrapper";
const db = firestore();
const cloudStorage = storage();
const newPostRef = () => doc(collection(db, "posts"));
const getPostRef = (postId) => doc(db, "posts", postId);
const getFileRef = (postId, file) => ref(cloudStorage, `${postId}/${file.name}`);

async function replaceFile(
  id,
  oldFile,
  newFile,
  onProgress = (f) => f,
  onComplete = () => {}
) {
  try {
    await removeFile(id, oldFile);
  } catch (message) {
    console.log(message);
  } finally {
    await uploadFile(id, newFile, onProgress, onComplete);
  }
}

async function uploadFile(
  postId,
  file,
  onProgress = (f) => f,
  onComplete = () => {}
) {
  if (!file) return;
  const ref = getFileRef(postId, file);
  const task = uploadBytesResumable(ref, file);
  task.on(
    "state_changed",
    (snapshot) => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      onProgress(progress);
    },
    (error) => console.log(error),
    onComplete
  );
}

async function removeFile(postId, file, onComplete = () => {}) {
  if (!file) return;
  const ref = getFileRef(postId, file);
  await deleteObject(ref).then(onComplete).catch(console.log);
}

function newPostId() {
  const post = newPostRef();
  return post.id;
}

async function uploadPost(postId, { title }) {
  const postRef = getPostRef(postId);
  await setDoc(postRef, { title }, { merge: true });

  return { id: postRef.id };
}

async function getPost(postId) {
  const postRef = getPostRef(postId);
  const doc = await getDoc(postRef);
  const { title, videoURL, timelines } = doc.data();
  const times = timelines.map((timeline) => timeline.time);
  const slideImageURLs = timelines.map((timeline) => timeline.slide_url);

  return { title, videoURL, times, slideImageURLs };
}

async function getPostTitle(postId) {
  const postRef = getPostRef(postId);
  const doc = await getDoc(postRef);
  const { title } = doc.data();

  return title;
}

function getProgress(postId, onNext) {
  const postRef = getPostRef(postId);
  onSnapshot(postRef, (doc) => {
    const { progress, is_progressed } = doc.data();
    onNext({ progress, isProgressed: is_progressed });
  });
}

const postUploader = {
  replaceFile,
  newPostId,
  uploadPost,
};

export default postUploader;

export { replaceFile, uploadPost, getPost, getPostTitle, getProgress };