        const documentId = regexClassroomId(params.slug, regex); // regex value
        const arrayField = 'students'; // Name of the array field
        const itemToRemove = userIdentificationLatest; // userId

        // Remove the item from the array
        const documentRef = doc(db, 'classrooms', documentId); // Replace 'your-collection-name' with your collection 

        updateDoc(documentRef, {
            [arrayField]: arrayRemove(itemToRemove) // Use arrayRemove from firebase/firestore
        })
            .then(() => {
                console.log('Item removed successfully!');
            })
            .catch((error: any) => {
                console.error('Error removing item:', error);
            });
            

const scripts = [
    "/src/morphic.js",
    "/src/symbols.js",
    "/src/widgets.js",
    "/src/blocks.js",
    "/src/threads.js",
    "/src/objects.js",
    "/src/scenes.js",
    "/src/gui.js",
    "/src/paint.js",
    "/src/lists.js",
    "/src/byob.js",
    "/src/tables.js",
    "/src/sketch.js",
    "/src/video.js",
    "/src/maps.js",
    "/src/extensions.js",
    "/src/xml.js",
    "/src/store.js",
    "/src/locale.js",
    "/src/cloud.js",
    "/src/api.js",
    "/src/sha512.js",
    "/src/FileSaver.min.js",
    "/sw.js"
];