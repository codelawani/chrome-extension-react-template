import "./App.css";
// import { useEffect, useState } from 'react';
import Popup from "./components/popup";

function App() {
  // const [currentUrl, setCurrentUrl] = useState('');
  // // const [shortUrl, setShortUrl] = useState('');
  // // // Button Handler

  // async function getCurrentTabUrl() {
  //   let queryOptions = { active: true, lastFocusedWindow: true };
  //   // `tab` will either be a `tabs.Tab` instance or `undefined`.
  //   let tabs = await chrome.tabs.query(queryOptions);
  //   return tabs[0]?.url ?? "";
  // }
  // useEffect(() => {
  //   const fetchUrl = async () => {
  //     const url = await getCurrentTabUrl(); // Fetch the current tab URL
  //     setCurrentUrl(url);
  //   };

  //   fetchUrl();
  // }, []);

  return <Popup />;
}

export default App;
