import React, { useState } from 'react';
import axios from 'axios';
import './AddSnippetForm.css';

function AddSnippetForm({ fetchSnippets }) {
  const [formData, setFormData] = useState({
    username: '',
    language: '',
    stdin: '',
    code: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit', formData);
      setFormData({
        username: '',
        language: '',
        stdin: '',
        code: ''
      });
      fetchSnippets(); 
    } catch (error) {
      console.error('Error submitting snippet:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-snippet-form">
      <h2>Add Code Snippet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <input type="text" id="language" name="language" value={formData.language} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="stdin">Standard Input:</label>
          <input type="text" id="stdin" name="stdin" value={formData.stdin} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <textarea id="code" name="code" value={formData.code} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddSnippetForm;
