import React from 'react'
import { useState, useEffect, useRef } from "react";
import "./App.css";
import PlaceIcon from "@mui/icons-material/Place";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ReplayIcon from "@mui/icons-material/Replay";
import tickSound from "./tick.wav";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";


function Code() {
const [time, setTime] = useState(new Date());
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const [fact, setFact] = useState("");
const [r, setR] = useState(25);
const [g, setG] = useState(153);
const [b, setB] = useState(253);
const [count, setCount] = useState(0);
var i = Math.floor(Math.random() * 256);
var ii = Math.floor(Math.random() * 256);
var iii = Math.floor(Math.random() * 256);

useEffect(() => {
  const timeID = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => {
    clearInterval(timeID);
  };
}, []);

function Api() {
  const limit = 1;
  const url = `https://api.api-ninjas.com/v1/facts?limit=${limit}`;
  const options = {
    headers: {
      "X-Api-Key": "lCzUntaavry+pp2p48pY0w==8qGpsX2mjrhZwtmw",
    },
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setFact(data[0].fact);
      setR(i);
      setG(ii);
      setB(iii);
      setCount(count + 1);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

const [mute, setMute] = useState(true);
const audioRef = useRef(null);

useEffect(() => {
  const audio = audioRef.current;
  audio.play();
}, [audioRef]);

const toggleMute = () => {
  const audio = audioRef.current;
  audio.play()
  audio.muted = !audio.muted;
  setMute(audio.muted);
};

return (
  <div>
    <div className="rectangles-container">
      <div
        className="rectangle"
        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
      ></div>
      <div
        className="rectangle"
        style={{ backgroundColor: `rgb(${b},${r},${g})` }}
      ></div>
      <div
        className="rectangle"
        style={{ backgroundColor: `rgb(${b},${g},${r})` }}
      ></div>
    </div>
    <div className="TimerContainer">
      <div className="container">
        <h1>{time.toLocaleTimeString()}</h1>
        <h1>{time.toLocaleDateString()}</h1>
        <h2>
          {" "}
          <PlaceIcon />
          {timeZone}
        </h2>
        <button className="button" onClick={Api}>
          GET A FUN FACT
          <div>
            <TouchAppIcon style={{ fontSize: "50px" }} />
          </div>
          <div>COUNT: {count}</div>
        </button>
        <h4>{fact}</h4>
        <div>
          {mute ? (
            <VolumeUpIcon
              onClick={toggleMute}
              style={{ cursor: "pointer", fontSize: "50px" }}
            />
          ) : (
            <VolumeOffIcon
              onClick={toggleMute}
              style={{ cursor: "pointer", fontSize: "50px" }}
            />
          )}
          <ReplayIcon
            onClick={() => {
              setCount(0);
              setFact("");
            }}
            style={{ fontSize: "50px", cursor: "pointer" }}
          />
        </div>
      </div>

      <audio ref={audioRef} loop src={tickSound}>
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
);

}

export default Code