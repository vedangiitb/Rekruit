import { io } from "socket.io-client";
import { useRef, useEffect, useState } from "react";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
const socket = io("", { transports: ["websocket"] });

let pc;
let localStream;
let startButton;
let hangupButton;
let muteAudButton;
let remoteVideo;
let localVideo;

export default function VideoCall({ roomId, full }) {
  startButton = useRef(null);
  hangupButton = useRef(null);
  muteAudButton = useRef(null);
  localVideo = useRef(null);
  remoteVideo = useRef(null);
  useEffect(() => {
    hangupButton.current.disabled = true;
    muteAudButton.current.disabled = true;
  }, []);

  const [audiostate, setAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(false)

  const startB = async () => {
    try {
      setShowVideo(true)
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true },
      });
      localVideo.current.srcObject = localStream;
      localVideo.current.muted = true
    } catch (err) {
      console.log(err);
    }

    startButton.current.disabled = true;
    hangupButton.current.disabled = false;
    muteAudButton.current.disabled = false;

    socket.emit("message", { type: "ready", roomId }); // Emitting roomId when ready to start
  };

  // To end the call
  const hangB = async () => {
    hangup();
    setShowVideo(false)
    socket.emit("message", { type: "bye", roomId }); // Emitting roomId when hanging up
  };

  // To mute and unmute the audio
  function muteAudio() {
    if (audiostate) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = false;
      });
      setAudio(false);
    } else {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = true;
      });
      setAudio(true);
    }
  }


  useEffect(() => {
    socket.on("message", (e) => {
      if (!localStream) {
        console.log("not ready yet");
        return;
      }
      if (e.roomId !== roomId) {
        // Ignore messages not related to this room
        return;
      }
      switch (e.type) {
        case "offer":
          handleOffer(e);
          break;
        case "answer":
          handleAnswer(e);
          break;
        case "candidate":
          handleCandidate(e);
          break;
        case "ready":
          // A second tab joined. This tab will initiate a call unless in a call already.
          if (pc) {
            console.log("already in call, ignoring");
            return;
          }
          makeCall();
          break;
        case "bye":
          if (pc) {
            hangup();
          }
          break;
        default:
          console.log("unhandled", e);
          break;
      }
    });
  }, [roomId]);

  async function makeCall() {
    try {
      pc = new RTCPeerConnection(configuration);
      pc.onicecandidate = (e) => {
        const message = {
          type: "candidate",
          candidate: null,
          roomId: roomId,
        };
        if (e.candidate) {
          message.candidate = e.candidate.candidate;
          message.sdpMid = e.candidate.sdpMid;
          message.sdpMLineIndex = e.candidate.sdpMLineIndex;
        }
        socket.emit("message", message);
      };
      pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
      const offer = await pc.createOffer();
      socket.emit("message", { type: "offer", sdp: offer.sdp, roomId });
      await pc.setLocalDescription(offer);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleOffer(offer) {
    if (pc) {
      console.error("existing peerconnection");
      return;
    }
    try {
      pc = new RTCPeerConnection(configuration);
      pc.onicecandidate = (e) => {
        const message = {
          type: "candidate",
          candidate: null,
          roomId: roomId,
        };
        if (e.candidate) {
          message.candidate = e.candidate.candidate;
          message.sdpMid = e.candidate.sdpMid;
          message.sdpMLineIndex = e.candidate.sdpMLineIndex;
        }
        socket.emit("message", message);
      };
      pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
      await pc.setRemoteDescription(offer);

      const answer = await pc.createAnswer();
      socket.emit("message", { type: "answer", sdp: answer.sdp, roomId });
      await pc.setLocalDescription(answer);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAnswer(answer) {
    if (!pc) {
      console.error("no peerconnection");
      return;
    }
    try {
      await pc.setRemoteDescription(answer);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleCandidate(candidate) {
    try {
      if (!pc) {
        console.error("no peerconnection");
        return;
      }
      if (!candidate) {
        await pc.addIceCandidate(null);
      } else {
        await pc.addIceCandidate(candidate);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function hangup() {
    if (pc) {
      pc.close();
      pc = null;
    }
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
    startButton.current.disabled = false;
    hangupButton.current.disabled = true;
    muteAudButton.current.disabled = true;
  }

  return (
    //     <>
    //       <main className="container">
    //         <div className="video bg-main">
    //           {showVideo &&  <video
    //             ref={remoteVideo}
    //             className="video-item"
    //             autoPlay
    //             playsInline
    //             src=" "
    //             style={{ width: "100%", height: "auto" }}
    //           ></video>}
    //         </div>

    //         {showVideo && <div style={{ position: "relative" }} >

    //         <video
    //           ref={localVideo}
    //           className="video-item"
    //           autoPlay
    //           playsInline
    //           src=""
    //           style={{ width: "100%", height: "auto" }}
    //         ></video>
    //   <div
    //     style={{
    //       position: "absolute",
    //       bottom: "10px",
    //       left: "25%",
    //       display: "flex",
    //       justifyContent:"center",
    //       gap: "10px",
    //       zIndex: "1", // Ensure buttons are above the video
    //     }}
    //   >
    //     <button className="btn btn-success" ref={startButton} onClick={startB}>
    //     <span class="material-symbols-outlined">
    //       videocam
    //       </span>
    //     </button>
    //     <button className="btn btn-danger" ref={hangupButton} onClick={hangB}>
    //     <span class="material-symbols-outlined">
    //       call_end
    //       </span>
    //     </button>
    //     <button className="btn btn-warning" ref={muteAudButton} onClick={muteAudio}>
    //     {audiostate ?<span class="material-symbols-outlined">mic</span> : <span class="material-symbols-outlined">mic_off</span>}
    //     </button>
    //   </div>
    // </div>}


    // { !showVideo && 
    //   <div style={{display:"flex",padding:"2%",justifyContent:"center",gap:"3%"}} >
    //         <button className="btn btn-success" ref={startButton} onClick={startB} style={{display:"flex",gap:"5px"}}>
    //     <span class="material-symbols-outlined">
    //       videocam
    //       </span>   Start Interview
    //     </button>
    //     <button className="btn btn-danger" ref={hangupButton} onClick={hangB} style={{display:'none'}}>
    //     <span class="material-symbols-outlined">
    //       call_end
    //       </span>
    //     </button>
    //     <button className="btn btn-warning" ref={muteAudButton} onClick={muteAudio} style={{display:'none'}}>
    //     {audiostate ?<span class="material-symbols-outlined">mic</span> : <span class="material-symbols-outlined">mic_off</span>}
    //     </button>
    //   </div>
    // }
    //       </main>
    //     </>
    <>
      <main className="container">
        {showVideo && (
          <div className={`video-container ${full ? 'side-by-side' : 'up-down'}`}>
            <div className="video-wrapper">
              <video
                ref={remoteVideo}
                className="video-item"
                autoPlay
                playsInline
                src=""
                style={{ width: "100%", height: "auto", borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              ></video>
            </div>
            <div className="video-wrapper" style={{ position: 'relative' }}>
              <video
                ref={localVideo}
                className="video-item"
                autoPlay
                playsInline
                src=""
                style={{ width: "100%", height: "auto", borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              ></video>
              <div
                className="video-controls"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  zIndex: 1,
                }}
              >
                <button className="btn btn-success" ref={startButton} onClick={startB}>
                  <span className="material-symbols-outlined">videocam</span>
                </button>
                <button className="btn btn-danger" ref={hangupButton} onClick={hangB}>
                  <span className="material-symbols-outlined">call_end</span>
                </button>
                <button className="btn btn-warning" ref={muteAudButton} onClick={muteAudio}>
                  {audiostate ? <span className="material-symbols-outlined">mic</span> : <span className="material-symbols-outlined">mic_off</span>}
                </button>
              </div>
            </div>
          </div>
        )}

        {!showVideo && (
          <div style={{ display: "flex", padding: "2%", justifyContent: "center", gap: "3%" }}>
            <button className="btn btn-success" ref={startButton} onClick={startB} style={{ display: "flex", gap: "5px" }}>
              <span className="material-symbols-outlined">videocam</span> Start Interview
            </button>
            <button className="btn btn-danger" ref={hangupButton} onClick={hangB} style={{ display: 'none' }}>
              <span className="material-symbols-outlined">call_end</span>
            </button>
            <button className="btn btn-warning" ref={muteAudButton} onClick={muteAudio} style={{ display: 'none' }}>
              {audiostate ? <span className="material-symbols-outlined">mic</span> : <span className="material-symbols-outlined">mic_off</span>}
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        .video-container {
          display: flex;
          flex-direction: ${full ? 'row' : 'column'};
          gap: 20px;
        }
        .video-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .video-item {
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .video-controls {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 1;
        }
      `}</style>
    </>
  );
}

