"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { limit, query, onSnapshot } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
  authDomain: "snap-workspace.firebaseapp.com",
  projectId: "snap-workspace",
  storageBucket: "snap-workspace.appspot.com",
  messagingSenderId: "1092527848130",
  appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
  measurementId: "G-JVEZGJHL8H"
};
const app = initializeApp(firebaseConfig);
const db: any = getFirestore(app);

const Firebase = () => {
    const [docs, setDocs] = useState<any[]>([]);
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchDocs = async () => {
        const q = query(collection(db, "universities"));
        const querySnapshot = await getDocs(q);
        const newDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocs(newDocs);
      };
      fetchDocs();
    }, []);
  
    return (
      <main className="w-full py-5 px-[5%] h-auto mb-10">

        <div className="admin-panel-lists place-content-center">
          {/* {docs.map((items:any) => (

          ))} */}
          {JSON.stringify(docs)}
        </div>

      </main>
    );
  };
  export default Firebase;
  
// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Replace with your actual Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
//     authDomain: "ustudy-96678.firebaseapp.com",
//     projectId: "ustudy-96678",
//     storageBucket: "ustudy-96678.appspot.com",
//     messagingSenderId: "581632635532",
//     appId: "1:581632635532:web:51ccda7d7adce6689a81a9"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const CollectionsPage = () => {
//   const [collectionsData, setCollectionsData] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const collections = await getDocs(collection(db, "__collection__"));

//         const allCollectionsData: any[] = [];

//         await Promise.all(
//           collections.docs.map(async (collectionDoc) => {
//             const collectionName = collectionDoc.id;
//             const collectionRef = collection(db, collectionName);
//             const documents = await getDocs(collectionRef);

//             const collectionData = documents.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));

//             allCollectionsData.push({
//               name: collectionName,
//               data: collectionData,
//             });
//           })
//         );

//         setCollectionsData(allCollectionsData);
//       } catch (error) {
//         console.error("Error fetching collections:", error);
//       }
//     };

//     fetchCollections();
//   }, []);

//   return (
//     <div>
//       <h1>Collections Data</h1>
//       {collectionsData.map((collection) => (
//         <div key={collection.name}>
//           <h2>{collection.name}</h2>
//           <ul>
//             {collection.data.map((item: { id: React.Key | null | undefined; }) => (
//               <li key={item.id}>{JSON.stringify(item)}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CollectionsPage;

// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
//     authDomain: "ustudy-96678.firebaseapp.com",
//     projectId: "ustudy-96678",
//     storageBucket: "ustudy-96678.appspot.com",
//     messagingSenderId: "581632635532",
//     appId: "1:581632635532:web:51ccda7d7adce6689a81a9"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


// const CollectionsPage = () => {
//   const [collections, setCollections] = useState([]);

//   useEffect(() => {
//     const getCollections = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "collections"));
//         const collectionData:any = [];
//         querySnapshot.forEach((doc) => {
//           collectionData.push({ id: doc.id, ...doc.data() });
//         });
//         setCollections(collectionData);
//       } catch (error) {
//         console.error("Error fetching collections: ", error);
//       }
//     };
  
//     getCollections();
//   }, []);
  

//   return (
//     <div>
//       <h1>Collections Details</h1>
//       <ul>
//         {collections.map((collection:any) => (
//           <li key={collection.id}>
//             <h2>{collection.name}</h2>
//             <ul>
//               {collection.items.map((item:any) => (
//                 <li key={item.id}>{item.name}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CollectionsPage;

// import { useEffect, useRef, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, getFirestore, doc, getDoc, startAfter } from "firebase/firestore";
// const firebaseConfig = {
//     apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
//     authDomain: "ustudy-96678.firebaseapp.com",
//     projectId: "ustudy-96678",
//     storageBucket: "ustudy-96678.appspot.com",
//     messagingSenderId: "581632635532",
//     appId: "1:581632635532:web:51ccda7d7adce6689a81a9"
// };

// // Iniialize Firebase
// const app = initializeApp(firebaseConfig);
// // Database
// const db: any = getFirestore(app);

// const getCollections = async () => {
//     const collections = await db.listCollections();
//     const collectionNames = collections.map((collection:any) => collection.id);
//     return collectionNames;
//   };
//   const getDocumentsForCollection = async (collectionName: string) => {
//     const collectionRef = collection(db, collectionName);
//     const snapshot = await getDocs(collectionRef);
//     const documents = snapshot.docs.map((doc) => doc.data());
//     return documents;
//   };
//   const getFieldsForDocument = (document: any) => {
//     const fields = Object.keys(document);
//     return fields;
//   };
//   const getAllData:any = async () => {
//     const collections = await getCollections();
//     const allData = [];
  
//     for (const collectionName of collections) {
//       const documents = await getDocumentsForCollection(collectionName);
  
//       for (const document of documents) {
//         const fields = getFieldsForDocument(document);
//         allData.push({ collectionName, document, fields });
//       }
//     }
  
//     return allData;
//   };
//   const Firebase = () => {
//     const [data, setData] = useState([]);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         const allData = await getAllData();
//         setData(allData);
//       };
  
//       fetchData();
//     }, []);
  
//     return (
//       <div>
//         {data.map((item:any) => (
//           <div key={item.collectionName + item.document.id}>
//             <h2>Collection: {item.collectionName}</h2>
//             <h3>Document ID: {item.document.id}</h3>
//             <ul>
//               {item.fields.map((field:any) => (
//                 <li key={field}>
//                   {field}: {item.document[field]}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     );
//   };
          
// export default Firebase;

// // const getAllData:any = async () => {
// //     const collections = await db.listCollections();
// //     const allData: any[] = [];

// //     for (const collectionName of collections) {
// //         const collectionRef = db.collection(collectionName);
// //         const snapshot = await collectionRef.get();

// //         snapshot.forEach((doc: { data: () => any; id: any; }) => {
// //             const documentData = doc.data();
// //             const fields = Object.keys(documentData);

// //             allData.push({
// //                 collectionName,
// //                 documentId: doc.id,
// //                 fields,
// //                 data: documentData,
// //             });
// //         });
// //     }

// //     return allData;
// // };


// // const Firebase = () => {
// //     const [data, setData] = useState([]);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             const allData = await getAllData();
// //             setData(allData);
// //         };

// //         fetchData();
// //     }, []);

// //     return (
// //         <div>
// //             {data.map((item:any) => (
// //                 <div key={item.collectionName && item.collectionName + item.documentId}>
// //                     <h2>Collection: {item.collectionName}</h2>
// //                     <h3>Document ID: {item.documentId}</h3>
// //                     <ul>
// //                         {item.fields.map((field:any) => (
// //                             <li key={field}>
// //                                 {field}: {item.data[field]}
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default Firebase;