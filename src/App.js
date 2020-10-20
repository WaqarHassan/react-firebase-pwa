import React, { useState, useEffect } from "react";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

import { messaging } from "./firebase";

const App = () => {
  useEffect(() => {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        localStorage.setItem("sw-token", token);
        console.log("Token -----===--  : ", token);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) =>
      console.log(message)
    );
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
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
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
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
