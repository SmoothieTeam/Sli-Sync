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

export {
  replaceFile,
  newPostId,
  createPost,
};