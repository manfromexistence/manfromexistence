import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, FieldValue, arrayRemove } from "firebase/firestore"; // Import arrayRemove

const firebaseConfig = {
  apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
  authDomain: "snap-workspace.firebaseapp.com",
  projectId: "snap-workspace",
  storageBucket: "snap-workspace.appspot.com",
  messagingSenderId: "1092527848130",
  appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
  measurementId: "G-JVEZGJHL8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Replace these with your actual values
const documentId = '3nlbXPvX0kChHEz2pAah'; // regex value
const arrayField = 'students'; // Name of the array field
const itemToRemove = '2jvOyvXLpJkrfCsDZEb4'; // userId

// Remove the item from the array
const documentRef = doc(db, 'classrooms', documentId); // Replace 'your-collection-name' with your collection name
updateDoc(documentRef, {
  [arrayField]: arrayRemove(itemToRemove) // Use arrayRemove from firebase/firestore
})
  .then(() => {
    console.log('Item removed successfully!');
  })
  .catch((error) => {
    console.error('Error removing item:', error);
  });














































// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc, writeBatch } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
//   authDomain: "snap-workspace.firebaseapp.com",
//   projectId: "snap-workspace",
//   storageBucket: "snap-workspace.appspot.com",
//   messagingSenderId: "1092527848130",
//   appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
//   measurementId: "G-JVEZGJHL8H"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

// db.collection('your-collection-name')
//   .doc(documentId)
//   .update({
//     [arrayField]: FieldValue.arrayRemove('itemToRemove')
//   })
//   .then(() => {
//     console.log('Item removed successfully!');
//   })
//   .catch((error) => {
//     console.error('Error removing item:', error);
//   });






























// const studentData = `Student Username,Password
// std1,pw1
// std2,pw2
// std3,pw3
// std4,pw4
// std5,pw5
// std6,pw6
// std7,pw7
// std8,pw8
// std9,pw9
// std10,pw10
// std11,pw11
// std12,pw12
// std13,pw13
// std14,pw14
// std15,pw15
// std16,pw16`;

// const lines = studentData.split('\n');
// lines.shift(); // Remove the header line

// let processedCount = 0;
// const totalLines = lines.length;

// const usersCollection = collection(db, 'dummy'); // Reference to the 'users' collection

// lines.forEach(async (line, index) => {
//   const [username, password] = line.split(',');

//   // Create a new batch for each iteration
//   const batch = writeBatch(db);

//   // Use await to get the DocumentReference
//   const docRef = await addDoc(usersCollection, {
//     username: username,
//     password: password,
//     role: "student",
//     userId: "",
//     email: "ajju40959@gmail.com"
//   });

//   // Now you have the DocumentReference
//   batch.set(docRef, {
//     username: username,
//     password: password,
//     role: "student",
//     userId: "",
//     email: "ajju40959@gmail.com"
//   });

//   // Commit the batch immediately
//   await batch.commit();

//   // Update progress indicator
//   processedCount++;
//   console.log(`Processed ${processedCount} out of ${totalLines} documents`);
// });

