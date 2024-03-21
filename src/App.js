import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddSnippetForm from './AddSnippetForm';
import SnippetList from './SnippetList';
import './App.css'; 


function App() {
  return (
    <Router>
      <div className="app-container">
       
        <header className="header">
          
          <img src="https://i.pinimg.com/originals/f4/cf/ec/f4cfec4f3b4bbf24798b26aa4a5508f2.png" alt="Company Logo" className="logo" />
          
          <h1 className="heading">TakeUforward (SDE Intern) Hiring Task</h1>
        </header>
<br></br>
   
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/" className="nav-link">Add Snippet</Link>
            </li>
            <li>
              <Link to="/snippets" className="nav-link">View Snippets</Link>
            </li>
          </ul>
        </nav>

    
        <div className="content">
          <Routes>
            <Route path="/snippets" element={<SnippetList />} />
            <Route path="/" element={<AddSnippetForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
