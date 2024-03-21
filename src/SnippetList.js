import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SnippetList.css'; 

function SnippetList() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/snippets');
      setSnippets(response.data);

      
      const snippetsWithOutput = await Promise.all(response.data.map(async (snippet) => {
        const outputResponse = await axios.get('https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10' + snippet.id, {
          headers: {
            'X-RapidAPI-Key': '40c7d0ec-a6c1-49c1-ba1b-fe1ce9c78b7d',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        });
        return { ...snippet, stdout: outputResponse.data.stdout };
      }));

      setSnippets(snippetsWithOutput);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    }
  };

  return (
    <div className="snippet-container">
      <h2>Code Snippets</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Standard Input</th>
            <th>Code</th>
            {/* <th>Stdout</th>  */}
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map(snippet => (
            <tr key={snippet.id}>
              <td>{snippet.username}</td>
              <td>{snippet.language}</td>
              <td>{snippet.stdin}</td>
              <td>{snippet.code.substring(0, 100)}</td>
              {/* <td>{snippet.stdout}</td>  */}
              <td>{snippet.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SnippetList;
