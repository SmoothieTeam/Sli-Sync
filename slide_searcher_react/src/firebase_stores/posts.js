import { collection, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const getNewPostRef = (firestore) => doc(collection(firestore, 'posts'));
const getPostRef = (firestore, postId) => doc(firestore, 'posts', postId);

async function uploadPost(firestore, { title, videoURL, pdfURL }) {
    const postRef = getNewPostRef(firestore, 'posts');
    await setDoc(postRef, {title, videoURL,pdfURL}, {merge: true});
    return { id: postRef.id };
}

async function getPost(firestore, postId) {
    const postRef = getPostRef(firestore, postId);
    const doc = await getDoc(postRef);
    const { title, videoURL, timelines } = doc.data();
    const times = timelines.map(t => t.time);
    const slideImageURLs = timelines.map(t => t.slide_url);

    return { title, videoURL, times, slideImageURLs };
}

async function getPostTitle(firestore, postId) {
    const postRef = getPostRef(firestore, postId);
    const doc = await getDoc(postRef);
    const { title } = doc.data();

    return title;
}

function getProgress(firestore, postId, onNext) {
    const postRef = getPostRef(firestore, postId);
    onSnapshot(postRef, (doc) => {
        const { progress, is_progressed } = doc.data();
        onNext({ progress, isProgressed: is_progressed });
    });
}

export { uploadPost, getPost, getPostTitle, getProgress };