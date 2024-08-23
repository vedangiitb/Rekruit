import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import IDEOutput from "./IDEOutput";

export default function IDECompo() {
  const [lang, setLang] = useState("Python");
  const [code, setCode] = useState("print('hello')");
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [compLang, setCompLang] = useState(python());

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleLangChange = (selectedLang) => {
    setLang(selectedLang); // Update the selected language
    switch (selectedLang) {
      case "Python":
        setCode("print('hello')")
        setCompLang(python());
        break;
      case "Javascript":
        setCode("console.log('hello')")
        setCompLang(javascript());
        break;
      case "Java":
        setCompLang(java());
        break;
      case "C++":
        setCompLang(cpp());
        break;
      default:
        setCompLang(python());
    }
  };


  const sendCodeToServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/runcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code, input: text, lang: lang }),
      });

      if (!response.ok) {
        throw new Error('Failed to send code to server');
      }

      const result = await response.json();
      const { error } = result;
      if (error) {
        const formattedOutput = error.replace(/\r\n/g, '<br>');
        console.log(`Error: ${formattedOutput}`)
        setOutput(error)
      }
      else {
        console.log('Server response:', result);
        let formattedOutput = result.output.replace(/\x1B\[[0-9;]*[JKmsu]/g, '');

        if (lang === "Python") {
          formattedOutput = result.output.replace(/\r\n/g, '<br>');
        }

        console.log(formattedOutput);
        setOutput(formattedOutput);
      }


    } catch (error) {
      console.error('Error sending code to server:', error);
    }
  };


  return (
    <div className="ideCompo">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {lang}
        </button>
        <ul className="dropdown-menu dropdown-menu-dark">
          <li><button className={`dropdown-item ${lang === 'Javascript' ? 'active' : ''}`} onClick={() => handleLangChange('Javascript')}>Javascript</button></li>
          <li><button className={`dropdown-item ${lang === 'Java' ? 'active' : ''}`} onClick={() => handleLangChange('Java')}>Java</button></li>
          <li><button className={`dropdown-item ${lang === 'C++' ? 'active' : ''}`} onClick={() => handleLangChange('C++')}>C++</button></li>
          <li><button className={`dropdown-item ${lang === 'Python' ? 'active' : ''}`} onClick={() => handleLangChange('Python')}>Python</button></li>
        </ul>
      </div>


      <CodeMirror
        value={code}
        height="60vh"
        theme="dark"
        extensions={[compLang]}
        onChange={onChange}
      />

      <label htmlFor="textInput">Enter Your inputs:</label>

      <textarea
        id="textInput"
        value={text}
        style={{ height: '20vh', width: '40vw', padding: '5px', boxSizing: 'border-box', resize: 'both', maxWidth: '90vw', maxHeight: '50vh' }}
        onChange={handleInputChange}
        placeholder="Type here..."
      />

      <button onClick={sendCodeToServer} type="button" class="btn btn-outline-primary" style={{ width: '10vw' }}>Run Code</button>

      <IDEOutput output={output} />
    </div>
  );
}
