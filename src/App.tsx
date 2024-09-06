import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [currentUrl, setCurrentUrl] = useState('');

  async function getCurrentTabUrl() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0]?.url ?? "";
  }
  useEffect(() => {
    const fetchUrl = async () => {
      const url = await getCurrentTabUrl(); // Fetch the current tab URL
      setCurrentUrl(url);
    };

    fetchUrl();
  }, []);

  return (
    <div className='text-blue-500'>
      <h1>Current Tab URL</h1>
      <p>{currentUrl}</p>
    </div>
  );
}

export default App;
