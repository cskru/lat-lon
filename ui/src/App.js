import React, {useState} from 'react';
import './App.css';
import cities from './db/cities.json';

function App() {

  const [cityName,setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = function(event) {
    if(event.target.value === null || event.target.value === "") {
      setLatitude("")
      setLongitude("")
    } 
    setCityName(event.target.value)
  }

  const keyPress = function(event) {
    if(event.key === "Enter") getLatLon()
  }

  const reset = function() {
    setCityName("");
    setLatitude("");
    setLongitude("");
    setStatus("");
    setDisabled(false);
  }

  const getLatLon = function() {
    if(cityName.length === 0) setStatus(`Please enter a city name`);
    else {
      const city = cities.find(c => c.name === cityName);
      if(city !== undefined) {
        setDisabled(true);
        setLatitude(city.latitude);
        setLongitude(city.longitude);
        setStatus("");
      } else {
        setStatus(`City: ${cityName} Not Found`)
      }
    }
  }

  const copyToClipboard = function() {
    const textArea = document.createElement("textarea");
    textArea.value = `City: ${cityName}, Latitude: ${latitude}, Longitude: ${longitude}`;
    document.body.appendChild(textArea);
    textArea.setSelectionRange(0, 99999);
    textArea.select();
    const success = document.execCommand("copy");
    textArea.remove();
    if(success) {
      setStatus(`Successfully Copied to Clipboard - "${textArea.value}"`);
    }
  }

  return (
    <div>
      <h1>City Geocodes</h1>
      <div className={"gridRow"}>
        <input 
          id="id-cityName"
          value={cityName}
          placeholder="Enter city name" 
          onChange={handleChange} 
          onKeyPress={keyPress}
          disabled={disabled}
        />
      </div>
      <div className={"gridRow"}><button disabled={disabled} className={"button-styles"} onClick={getLatLon}>Get Co-ordinates</button></div>
      <div className={"gridRow"}><button className={"button-styles"} onClick={reset}>Check Geocodes for another City</button></div>
      {
        disabled === true ? 
          <div className={"gridRow"}>
            <button className={"button-styles"} onClick={copyToClipboard}>Copy Co-ordinates to Clipboard</button>
            <div>Latitude: <span id="id-latitude">{latitude}</span></div>
            <div>Longitude: <span id="id-longitude">{longitude}</span></div>
          </div>
          : null
      }
      {
        <div>
          {status}
        </div>
      }
    </div>
  );
}

export default App;
