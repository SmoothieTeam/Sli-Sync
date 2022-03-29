import { doc, setDoc, collection } from "firebase/firestore";
import { firestore } from "./firebase_wrapper";
import { replaceFile } from "./firebase_file_api";

const db = firestore();
const newPostRef = () => doc(collection(db, "posts"));
const getPostRef = (postId) => doc(db, "posts", postId);

function newPostId() {
  const post = newPostRef();
  return post.id;
}

async function createPost(postId, { title }) {
  const postRef = getPostRef(postId);
  await setDoc(postRef, { title }, { merge: true });

  return { id: postRef.id };
}

// async function getPost(postId) {
//   const postRef = getPostRef(postId);
//   const doc = await getDoc(postRef);
//   const { title, videoURL, timelines } = doc.data();
//   const times = timelines.map((timeline) => timeline.time);
//   const slideImageURLs = timelines.map((timeline) => timeline.slide_url);

//   return { title, videoURL, times, slideImageURLs };
// }

// async function getPostTitle(postId) {
//   const postRef = getPostRef(postId);
//   const doc = await getDoc(postRef);
//   const { title } = doc.data();

//   return title;
// }

// function getProgress(postId, onNext) {
//   const postRef = getPostRef(postId);
//   onSnapshot(postRef, (doc) => {
//     const { progress, is_progressed } = doc.data();
//     onNext({ progress, isProgressed: is_progressed });
//   });
// }


export {
  replaceFile,
  newPostId,
  createPost,
};