import React from 'react';

const UploadAndReadTextFile = ({ inpfunc, id }) => {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        inpfunc(text);
      };
      reader.onerror = (e) => {
        console.error('Error reading the file', e);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".txt"
        id={`fileInput${id}`}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button className='btn btn-outline-dark' onClick={() => document.getElementById(`fileInput${id}`).click()}>
        Choose File
      </button>
      {/* <pre>{fileContent}</pre> */}
    </div>
  );
};

export default UploadAndReadTextFile;
