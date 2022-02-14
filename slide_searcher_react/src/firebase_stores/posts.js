import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore, getStorage } from "./firebase_wrapper";

const firestore = getFirestore();
const storage = getStorage();
// const getNewPostRef = () => doc(collection(firestore, "posts"));
const getPostRef = (postId) => doc(firestore, "posts", postId);
const getFileRef = (postId, file) => ref(storage, `${postId}/${file.name}`);

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

async function uploadPost(postId, { title }) {
  const postRef = getPostRef(postId);
  await setDoc(postRef, { title, videoURL: "", slideURL: "" }, { merge: true });

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

export {
  uploadFile,
  removeFile,
  uploadPost,
  getPost,
  getPostTitle,
  getProgress,
};
