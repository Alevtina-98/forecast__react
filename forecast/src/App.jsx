import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("");
  const [kyivCity, setKyivCity] = useState({});

  const key = "a7b26432e82aeb55a2388fff28e9d164";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&lang=ua&appid=${key}`
      )
      .then((response) => setKyivCity(response.data))
      .catch((error) => console.error("Помилка при завантаженні ", error));
  }, []);

  const snowWeather = (e) => {
    if (e.key === "Enter") {
      // console.log(e.key);

      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setTown("");
        })
        .catch((error) => console.error("Помилка при завантаженні:", error));
    }
  };

  return (
    <div className="container">
      <footer className="city-kyiv">
        {kyivCity.main ? (
          <div>
            <h2>{kyivCity.name === "Kyiv" ? "Київ" : kyivCity.name}</h2>
            <p>Температура: {kyivCity.main.temp.toFixed()}°C</p>
            <p>Опис: {kyivCity.weather[0].description}</p>
            <p>Вологість: {kyivCity.main.humidity}%</p>

            <p>Вітер: {kyivCity.wind.speed} M/C</p>
          </div>
        ) : null}
      </footer>
      <main className="main-forecast">
        <input
          type="text"
          className="enter-city"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          onKeyDown={snowWeather}
        />

        <h2>{data.name}</h2>

        <div className="temp">
          {data.main ? <p>Temperature: {data.main.temp.toFixed()}°C</p> : null}
          <div className="description">
            {data.weather && <p>Description: {data.weather[0].main}</p>}
          </div>
          <div className="humidity">
            {data.weather && <p>Humidity: {data.main.humidity}%</p>}
          </div>
          <div className="wind">
            {data.main ? (
              <p>Wind direction: {data.wind.speed.toFixed()} M/S</p>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
