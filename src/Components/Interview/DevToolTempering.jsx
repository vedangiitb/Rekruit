import { useState, useEffect } from 'react';

const DevToolTemper = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isTampered, setIsTampered] = useState(false);
  const [isDebuggerDetected, setIsDebuggerDetected] = useState(false);

  useEffect(() => {
    const checkDebugger = () => {
      setInterval(() => {
        const startTime = performance.now();
        debugger;
        const endTime = performance.now();
        if (endTime - startTime > 100) {
          setIsDebuggerDetected(true);
        }
        else {
          setIsDebuggerDetected(false)
        }
      }, 1000);
    };


    const checkDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      if (widthThreshold || heightThreshold) {
        console.log("Dev tools open detected!!")
      }
      setIsDevToolsOpen(widthThreshold || heightThreshold);
    };

    checkDebugger()

    const interval = setInterval(checkDevTools, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const disableContextMenu = (event) => {
      event.preventDefault();
    };

    const disableKeyCombinations = (event) => {
      if (event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.ctrlKey && event.shiftKey && event.key === 'J') ||
        (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('keydown', disableKeyCombinations);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableKeyCombinations);

    };

  })

  useEffect(() => {
    const originalFunction = console.log;

    console.log = function () {
      setIsTampered(true);
      return originalFunction.apply(this, arguments);
    };

    return () => {
      console.log = originalFunction;
    };
  }, []);


  return isTampered || isDevToolsOpen || isDebuggerDetected
}


export default DevToolTemper