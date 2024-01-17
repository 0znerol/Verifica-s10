import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
export default function SingleCity() {
  const date = new Date();
  const params = useParams();
  const [city, setCity] = useState([]);
  const [forecast, setForecast] = useState([]);

  const fetchCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=f5781462f66db4c92f31a25beda728aa&units=metric`
      );
      setCity(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=f5781462f66db4c92f31a25beda728aa&units=metric`
      );
      setForecast(response.data.list);
      console.log(response.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchCity();
  }, []);

  if (!city.main) return <h1>Loading...</h1>;
  console.log(forecast[8]);

  return (
    <Container className="text-center">
      <Row>
        <h1>{city.name}</h1>
        <h2>Temperatura: {city.main.temp}C°</h2>
        <h2>Temperatura Percepita: {city.main.feels_like}C°</h2>
        <h2>Meteo attuale: {city.weather[0].description}</h2>
      </Row>
      <Row>
        <Col>
          <Card>
            <h2>
              Previsioni: <h3>{forecast[7].dt_txt}</h3>{" "}
            </h2>
            <h3>Max: {forecast[7].main.temp_max}C°</h3>
            <h3>Min: {forecast[7].main.temp_min}C°</h3>
            <h3>{forecast[7].weather[0].description}</h3>
          </Card>
        </Col>
        <Col>
          <Card>
            <h2>
              Previsioni: <h3>{forecast[15].dt_txt}</h3>{" "}
            </h2>
            <h3>Max: {forecast[15].main.temp_max}C°</h3>
            <h3>Min: {forecast[15].main.temp_min}C°</h3>
            <h3>{forecast[15].weather[0].description}</h3>
          </Card>
        </Col>
        <Col>
          <Card>
            <h2>
              Previsioni: <h3>{forecast[23].dt_txt}</h3>{" "}
            </h2>
            <h3>Max: {forecast[23].main.temp_max}C°</h3>
            <h3>Min: {forecast[23].main.temp_min}C°</h3>

            <h3>{forecast[23].weather[0].description}</h3>
          </Card>
        </Col>
        <Col>
          <Card>
            <h2>
              Previsioni: <h3>{forecast[31].dt_txt}</h3>{" "}
            </h2>
            <h3>Max: {forecast[31].main.temp_max}C°</h3>
            <h3>Min: {forecast[31].main.temp_min}C°</h3>
            <h3>{forecast[31].weather[0].description}</h3>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
