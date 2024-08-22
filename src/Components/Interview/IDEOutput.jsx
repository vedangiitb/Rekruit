import React from 'react';

export default function IDEOutput({ output }) {
  return (
    <div className='ideOp'>
      <h4>Output:</h4>
      <div
        style={{
          border: '1px solid #ccc', // Border style
          borderRadius: '5px', // Optional: Border radius for rounded corners
          padding: '10px', // Optional: Padding inside the box
          minHeight: '30vh', // Minimum height of the box
          maxHeight: '80vh',
          width: '40vw',
          overflow: 'auto', // Enable scrolling if content exceeds box height
        }}
        dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
}