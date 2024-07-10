"use client"

// import React, { useState, useEffect } from 'react';

// interface WebsiteData {
//     url: string;
//   html: string;
//   isLoading: boolean;
//   error: Error | null;
// }

// function FetchWebsiteHTML(){

// const [websiteUrl, setUrl] = useState("");
//   const [data, setData] = useState<WebsiteData>({
//     url: '',
//     html: '',
//     isLoading: false,
//     error: null,
//   });
//   const { url, html, isLoading, error } = data;

//   const fetchData = async () => {
//     setData((prevData) => ({ ...prevData, isLoading: true })); // Update state before fetching

//     try {
//       const response = await fetch(url || websiteUrl);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const text = await response.text();
//       setData((prevData) => ({ ...prevData, html: text, isLoading: false }));
//     } catch (error) {
//       setData((prevData) => ({ ...prevData, error: error as Error, isLoading: false }));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   const handleRefetch = () => {
//     setUrl(url); // Trigger a re-render with the same URL to refetch
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter website URL"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//       />
//       <button onClick={fetchData} disabled={isLoading}>
//         {isLoading ? 'Fetching...' : 'Fetch Website'}
//       </button>
//       <button onClick={handleRefetch} disabled={isLoading}>
//         Refetch
//       </button>
//       {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
//       {html && (
//         <div dangerouslySetInnerHTML={{ __html: html }} />
//       )}
//     </div>
//   );
// }

// export default FetchWebsiteHTML;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface HtmlData {
//   data: string; // Holds the fetched HTML content
//   error: string | null; // Stores any error message
// }

// const MyComponent: React.FC = () => {
//   const [htmlData, setHtmlData] = useState<HtmlData>({ data: '', error: null });

//   useEffect(() => {
//     const fetchHtml = async () => {
//       try {
//         const url = 'https://www.example.com'; // Replace with your desired URL
//         const response = await axios.get(url);

//         if (response.status === 200) {
//           setHtmlData({ data: response.data, error: null });
//         } else {
//           setHtmlData({ data: '', error: `Error fetching URL: Status Code: ${response.status}` });
//         }
//       } catch (error) {
//         setHtmlData({ data: '', error: `Error fetching URL: ${error}` });
//       }
//     };

//     fetchHtml();
//   }, []);

//   return (
//     <div>
//       {htmlData.error ? (
//         <p>Error: {htmlData.error}</p>
//       ) : (
//         <pre>{htmlData.data}</pre>
//       )}
//     </div>
//   );
// };

// export default MyComponent;

// import React, { useEffect, useState } from 'react';
// import fetchAndLogHtml from "../../html"

// const targetUrl = 'https://www.example.com'; // Replace with your desired URL
// const htmlData2:any = fetchAndLogHtml(targetUrl);

// interface HtmlData {
//   data: any; // Holds the fetched HTML content
//   error: any; // Stores any error message
// }

// const MyComponent = () => {
//   const [htmlData, setHtmlData] = useState<HtmlData>({ data: '', error: null });

//   useEffect(() => {
//     const fetchHtml = async () => {
//       try {
//         const url = 'https://www.example.com'; // Replace with your desired URL
//         const response = await fetch(url);

//         if (response.ok) { // Check for successful response (status code 200-299)
//           const data = await response.text(); // Parse response as text (HTML)
//           setHtmlData({ data, error: null });
//         } else {
//           setHtmlData({ data: '', error: `Error fetching URL: Status Code: ${response.status}` });
//         }
//       } catch (error) {
//         setHtmlData({ data: '', error: `Error fetching URL: ${error}` });
//       }
//     };

//     fetchHtml();
//   }, []);

//   return (
//     <div>
//       {htmlData.error ? (
//         <p>Error: {htmlData.error}</p>
//       ) : (
//         <pre>{htmlData.data}</pre>
//       )}

//       <pre><code>{htmlData2}</code></pre>
//     </div>
//   );
// };

// export default MyComponent;



import React, { useState } from 'react';

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState('https://source.unsplash.com/random/300x200'); // Initial image size

  const getRandomImage = () => {
    const width = Math.floor(Math.random() * 500) + 200; // Random width between 100 and 1100
    const height = Math.floor(Math.random() * 600) + 300; // Random height between 100 and 700
    setImageUrl(`https://source.unsplash.com/random/${width}x${height}`);
    // setImageUrl(`https://app.leonardo.ai/auth/login`);
  };

  return (
    <div>
      <img src={imageUrl} alt="Random Unsplash Image" />
      <button onClick={getRandomImage}>Get New Image</button>
    </div>
  );
};

export default RandomImage;
