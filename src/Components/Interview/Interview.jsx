import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import IDEOutput from "./IDEOutput";
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import VideoCall from './VideoCall';
import EditDialog from './EditDialog';
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import TestCaseDialog from './TestCaseDialog';
import { toast } from 'react-toastify';
import RunButtons from './RunButtons';
import useTabVisibility from './useTabvisibility';
import { debounce } from './debounce';
import devToolTemper from './DevToolTempering';


export default function Interview({ user, isInterviewer }) {
  const { id } = useParams();
  const [lang, setLang] = useState("Python");
  const [code, setCode] = useState("");
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [compLang, setCompLang] = useState(python());
  const [theme, setTheme] = useState('dark')
  const [themeName, setThemeName] = useState('light')
  const [hascodePair, setHasCodePair] = useState(true)
  const [testinputs, settestInputs] = useState([]);
  const [testoutputs, settestOutputs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTCModal, setTCModal] = useState(false);
  const [convertedContent, setConvertedContent] = useState(null);
  const isVisible = useTabVisibility();
  const isTempered = devToolTemper();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);  // Use ref instead of state for WebSocket
  const [isLoading, setisLoading] = useState(true)


  useEffect(() => {
    if (id) {
      fetchAndSetInterviewData(id)
    }
  }, []);

  useEffect(() => {
    // Check if id is present to establish a WebSocket connection
    if (id != null) {
      // Check if there's an existing WebSocket connection
      if (socketRef.current) {
        // If there is an existing connection, close it
        socketRef.current.close();
      }

      // Create a new WebSocket connection
      const WEBSOCKET_API_ENDPOINT = 'wss://s3up3t3jxd.execute-api.us-east-1.amazonaws.com/production/';
      const ws = new WebSocket(WEBSOCKET_API_ENDPOINT);

      ws.onopen = () => {
        console.log('WebSocket connection established!!');
        // Send the register message to the server
        ws.send(JSON.stringify({ action: 'register', id }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Message received:', data);

        switch (data.event) {
          case 'codeUpdate':
            setCode(data.newCode);
            break;
          case 'textUpdate':
            setText(data.newText);
            break;
          case 'outputUpdate':
            setOutput(data.newOutput);
            break;
          case 'change-question':
            setConvertedContent(data.newHTML);
            setEditorState(convertToEditorState(data.newHTML));
            break;
          case 'changedTab':
            if (isInterviewer) {
              toast.warn("Potential Cheating Detected: Interviewee has changed his tab or opened the developer tools!");
            }
            break;
          default:
            console.log(data.event);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed.');
        // ws.send(JSON.stringify({ action: 'delId', id }));
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // Save the WebSocket instance in a ref
      socketRef.current = ws;

      // Cleanup on component unmount or when id changes
      return () => {
        if (ws) {
          console.log("closing web socket..")
          ws.close();
          socketRef.current = null;
        }
      };
    }
  }, [id]);

  // useEffect(() => {
  //   socket.on('change-question', (convertedContent) => {
  //     setConvertedContent(convertedContent);
  //     setEditorState(convertToEditorState(convertedContent));
  //   });
  // }, []);

  // const socket = io('http://localhost:5000', {
  //   query: { sessionId: id },
  // });

  // useEffect(() => {
  //   socket.on('codeUpdate', (newCode) => {
  //     setCode(newCode);
  //   });

  //   socket.on('textUpdate', (newText) => {
  //     setText(newText)
  //   });

  //   socket.on('outputUpdate', (newOutput) => {
  //     setOutput(newOutput)
  //   })
  // }, []);

  const sendCodeToServer = async () => {
    try {
      setOutput("Running....");
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ action: 'updateOutput', newOutput: 'Running....', id }));
      }

      const response = await fetch('https://3bt5y0d6be.execute-api.us-east-1.amazonaws.com/dev/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          tests: [{
            "id": "1",
            "testcase": text,
          }],
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send code to server');
      }

      const result = await response.json();
      const { errors } = result;

      if (errors) {
        const formattedOutput = errors.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
        const errorForm = `Error: ${formattedOutput.slice(98)}`;
        setOutput(errorForm);
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ action: 'updateOutput', newOutput: errorForm, id }));
        }
      } else {
        let formattedOutput = result.output.replace(/\x1B\[[0-9;]*[JKmsu]/g, '').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
        setOutput(formattedOutput);
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ action: 'updateOutput', newOutput: formattedOutput, id }));
        }
      }

    } catch (error) {
      console.error('Error sending code to server:', error);
    }
  };

  const runTests = async () => {
    setOutput("Running Tests...")
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'updateOutput', newOutput: "Running Tests...", id }));
    }
    // socket.emit('updateOutput', "Running Tests...")

    const response = await fetch('https://3bt5y0d6be.execute-api.us-east-1.amazonaws.com/dev/run-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tests: testinputs, code: code, language: lang }),
    });
    const { errors, output } = await response.json();
    if (errors) {
      const formattedOutput = errors.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ action: 'updateOutput', newOutput: formattedOutput, id }));
      }
      // socket.emit('updateOutput', formattedOutput)
      setOutput(formattedOutput)
    }
    else {
      let formattedOutput = output.replace(/\x1B\[[0-9;]*[JKmsu]/g, '').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ action: 'updateOutput', newOutput: formattedOutput, id }));
      }
      // socket.emit('updateOutput', formattedOutput)
      setOutput(formattedOutput)
    }

  };

  const updateInterviewData = async (id) => {
    try {
      const response = await fetch('https://2ur410rhci.execute-api.us-east-1.amazonaws.com/dev/update-interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          code: code,
          question: convertedContent,
          tests: testinputs,
        })
      })
      toast.success('Successfully updated interview data!')
    } catch (e) {
      console.log(e)
    }
  };

  const fetchAndSetInterviewData = async (id) => {
    try {
      const response = await fetch(`https://2ur410rhci.execute-api.us-east-1.amazonaws.com/dev/get-interview?id=${id}`)
      const { Items } = await response.json()
      if (Items) {
        const { code, tests, question, isIDEPresent } = Items[0]
        if (code != null) {
          setCode(code)
        }
        if (question != null) {
          setConvertedContent(question)
          setEditorState(convertToEditorState(question))
        }
        if (tests != null) {
          settestInputs(tests)
        }
        if (isIDEPresent != null) {
          setHasCodePair(isIDEPresent)
        }
      }
      setisLoading(false)
    } catch (e) {
      console.log(e)
      setisLoading(false)
    }
  };

  const emitTabChanged = debounce(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'tabChanged', changed: true }));
    }
    // socket.emit('tabChanged', true);
    console.log("Tab changed");
  }, 700);

  useEffect(() => {
    if (!isInterviewer && (!isVisible || isTempered)) {
      emitTabChanged();
    }

    // if (isInterviewer) {
    //   socket.on('changedTab', (changed) => {
    //     toast.warn("Potential Cheating Detected: Interviewee has changed his tab or opened the developer tools!");
    //   });
    // }

    // return () => {
    //   socket.off('changedTab');
    // };
  }, [isVisible, user]);

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log(value)
      socketRef.current.send(JSON.stringify({ action: 'updateCode', newCode: value, id }));
    }
    else {
      console.log("Socket not open")
    }


  }, []);

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'updateText', newText: e.target.value, id }));
    }
    // socket.emit('updateText', e.target.value)
  };

  const handleLangChange = (selectedLang) => {
    setLang(selectedLang);
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

  const convertToEditorState = (htmlContent) => {
    const contentState = convertFromHTML(htmlContent);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      setThemeName('light')
    }
    else {
      setTheme('light')
      setThemeName('dark')
    }
  }

  const createMarkup = (content) => {
    return {
      __html: DOMPurify.sanitize(content)
    }
  }

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'question-change', newHTML: convertedContent, id }));
    }
    // socket.emit('question-change', convertedContent, editorState)
    updateInterviewData(id)
    setShowModal(false)
  };

  const removeElement = (indexToRemove) => {
    console.log(indexToRemove)
    if (indexToRemove >= 0 && indexToRemove < testinputs.length) {
      // Create a copy of the current array

      const newOpArray = [...testoutputs];

      // Remove the element at indexToRemove
      newOpArray.splice(indexToRemove, 1);

      // Update state with the new array
      settestOutputs(newOpArray);

      const newInpArray = [...testinputs];

      // Remove the element at indexToRemove
      newInpArray.splice(indexToRemove, 1);

      // Update state with the new array
      settestInputs(newInpArray);

    } else {
      console.error('Invalid index');
    }
  };

  const closeTCModal = () => {
    updateInterviewData(id)
    setTCModal(false)
  }

  const changeCodePairState = () => {
    if (hascodePair) {
      setHasCodePair(false)
    }
    else {
      setHasCodePair(true)
    }
  }

  const changeTCInpts = (e) => {
    settestInputs([...testinputs, e])
  }

  const changeTCOuputs = (e) => {
    settestOutputs([...testoutputs, e])
  }

  const configTests = () => {
    setTCModal(true)
  }

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  if (isLoading) {
    return (
      <div>Loading....</div>
    )
  }

  else {
    return (
      <div style={{ display: "flex", flexDirection: "row", padding: "2%", minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', flexDirection: "column", width: hascodePair ? "43%" : "100%", marginRight: "20px" }}>
          <button onClick={changeCodePairState} className='btn btn-outline-dark mb-3' style={{ width: "10vw" }}>Turn on/off IDE</button>
          <VideoCall roomId={id} full={!hascodePair} />
        </div>

        {hascodePair && (
          <div className="ideCompo" style={{ width: "55%", backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div dangerouslySetInnerHTML={createMarkup(convertedContent)} style={{ marginBottom: '20px' }} />

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {lang}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {['Javascript', 'Java', 'C++', 'Python'].map(language => (
                    <li key={language}>
                      <button className={`dropdown-item ${lang === language ? 'active' : ''}`} onClick={() => handleLangChange(language)}>
                        {language}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`btn btn-${themeName}`} onClick={changeTheme}>Change theme to {themeName}</button>
              <button className='btn btn-outline-warning' onClick={openModal}>Edit Question</button>
              <button className='btn btn-outline-success' onClick={() => updateInterviewData(id)}>{saving ? 'Saving...' : 'Save Code'}</button>
              {isInterviewer && (
                <button className='btn btn-outline-info' onClick={() => configTests(id, code)}>Configure Tests</button>
              )}
            </div>

            <EditDialog show={showModal} handleClose={closeModal}>
              <div className="editor-container">
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  editorStyle={{ width: "100%", height: "100%", minHeight: "300px" }}
                />
              </div>
            </EditDialog>

            <TestCaseDialog show={showTCModal} handleClose={closeTCModal} setinputTests={changeTCInpts} setoutputTests={changeTCOuputs} tstInps={testinputs} removeTc={(index) => removeElement(index)} />

            <CodeMirror
              value={code}
              height="60vh"
              theme={theme}
              extensions={[compLang]}
              onChange={onChange}
              style={{ marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
            />

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="textInput" style={{ display: 'block', marginBottom: '5px' }}>Enter Your inputs:</label>
              <textarea
                id="textInput"
                value={text}
                style={{ height: '20vh', width: '100%', padding: '10px', boxSizing: 'border-box', resize: 'both', maxWidth: '100%', maxHeight: '50vh', borderRadius: '5px', border: '1px solid #ccc' }}
                onChange={handleInputChange}
                placeholder="Enter the inputs..."
              />
            </div>

            <RunButtons sendCodeToServer={sendCodeToServer} runTests={runTests} />

            <IDEOutput output={output} />
          </div>
        )}
      </div>

    );
  }
}