import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import MainSearch from "./components/MainSearch";
import SingleCity from "./components/SingleCity";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  // const fetchCities = async () => {
  //   const response = await fetch(
  //     "http://api.openweathermap.org/geo/1.0/direct?q=carrara&limit=20&appid=cae0c2922ae620d85c689663a408be7d"
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  //   // Do something with the data
  // };
  // const cities = fetchCities();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/res/:lat/:lon" element={<SingleCity></SingleCity>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
