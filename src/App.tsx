import './App.css'
import { useEffect, useState } from 'react';

const shortenUrl = async (longUrl: string) => {
  const manifestData = chrome.runtime.getManifest();
  const token = manifestData.bitly_access_token;

  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      long_url: longUrl
    })
  });

  const data = await response.json();
  console.log('Shortened URL:', data.link);
  return data.link;
};

function App() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  // Button Handler
  const handleUrl = async (longUrl: string) => {
    const shortUrl = await shortenUrl(longUrl)
    setShortUrl(shortUrl)
  }
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
      <h3>Create URL</h3>
      <p>{currentUrl}</p>
      // Button to shorten the URL via Bitly's API
      <button onClick={() => handleUrl(currentUrl)}>Shorten Url</button>
      <p><span>Bitly Link: </span>{shortUrl}</p>
    </div>
  );
}

export default App;
