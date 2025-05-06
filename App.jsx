import React, { useState } from 'react';
import './App.css';

function App() {
  const [poem, setPoem] = useState("");

  const generatePoem = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: "anniversary" }),
      });

      const data = await response.json();
      if (data.poem) {
        setPoem(data.poem);
      } else {
        setPoem("Error: " + data.error);
      }
    } catch (err) {
      setPoem("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-box">
          <div className="heart-container">
            <div className="heart"></div>
            <h1 className="heart-message">Happy Anniversary</h1>
          </div>
          <br />
          <section className="swipe-up-section">
            <button className="button" onClick={generatePoem}>
              Here's something special for you...
            </button>
            {poem && (
              <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px', textAlign: 'center' }}>
                <h2>Your Poem</h2>
                <p>{poem}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
