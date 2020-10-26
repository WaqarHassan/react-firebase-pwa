import React, { useState, useEffect } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

import { messaging } from "./firebase";

const App = () => {
  const [showIframe, setShowIframe] = useState(false);
  useEffect(() => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        localStorage.setItem("sw-token", token);
        console.log("Token -----===--  : ", token);
        // document.getElementById("token").textContent = token;
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) => {
      document.getElementById("notif").textContent =
        message.data["firebase-messaging-msg-data"].notification.body;

      console.log(message);
    });
  }, []);

  navigator.serviceWorker.addEventListener("message", (message) => {
    debugger;
    console.log("=================================== ");
    console.log(
      "Title: ",
      message.data["firebase-messaging-msg-data"].notification.title
    );
    console.log(
      "Body: ",
      message.data["firebase-messaging-msg-data"].notification.body
    );
    document.getElementById("notif").textContent =
      message.data["firebase-messaging-msg-data"].notification.body;

    console.log("=================================== ");

    console.log(message.data);
  });

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      {/* <button
        className="btn btn-info"
        onClick={() => setShowIframe(!showIframe)}
      >
        Show Orange site
      </button> */}
      {/* {showIframe && (
        <iframe
          src="https://portail-moringa.com/obf/fr/accueil.html"
          title="W3Schools Free Online Web Tutorials"
          width="300px"
          height="300px"
          // sandbox="allow-forms allow-scripts"
        ></iframe>
      )} */}

      {/* <p id="notif"></p> */}
      <div>
        <h1> PWA Push Notifications</h1>
        <div className="push-notifications" id="notif"></div>
      </div>
      {/* <h1 id="token"></h1> */}
      {/* <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      /> */}
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
