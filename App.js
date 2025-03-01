import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import GeneratedUI from './components/GeneratedUI';
import './styles.css';

function App() {
  const [layout, setLayout] = useState(null);

  const handlePromptSubmit = async (prompt) => {
    try {
      const response = await fetch('http://localhost:5000/generate-ui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setLayout(data.layout); // Set the layout
    } catch (error) {
      console.error('Error generating UI:', error);
    }
  };

  return (
    <div className="App">
      <h1>UI Generator</h1>
      <PromptInput onSubmit={handlePromptSubmit} />
      {layout && <GeneratedUI layout={layout} />}
    </div>
  );
}

export default App;