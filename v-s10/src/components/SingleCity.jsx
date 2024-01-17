import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
export default function SingleCity() {
  const params = useParams();
  const [city, setCity] = useState([]);
  const [forecast, setForecast] = useState([]);
  const navigate = useNavigate();
  const fetchCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=cae0c2922ae620d85c689663a408be7d&units=metric&lang=it`
      );
      console.log(response.data);
      setCity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=cae0c2922ae620d85c689663a408be7d&units=metric&lang=it`
      );
      console.log(response.data.list);
      setForecast(await response.data.list);
      console.log(forecast);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchCity();
  }, []);

  if (city.length < 1 || forecast.length < 1) return <h1>Loading...</h1>;
  console.log(forecast);
  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>{city.name}</h1>
          <h2 className="mt-5">Temperatura: {city.main.temp}C°</h2>
          <h2>Temperatura Percepita: {city.main.feels_like}C°</h2>
          <h2>Meteo attuale: {city.weather[0].description}</h2>
        </Col>
      </Row>
      <Row className="mt-5">
        <h2>Previsioni</h2>
      </Row>
      <Row>
        <Col>
          <Card>
            <h2>{forecast[7].dt_txt.slice(5, -8)} </h2>
            <h3>{forecast[7].weather[0].description}</h3>

            <h3>Max: {forecast[7].main.temp_max}C°</h3>
            <h3>Min: {forecast[5].main.temp_min}C°</h3>
          </Card>
        </Col>
        <Col>
          <Card>
            <h2>{forecast[15].dt_txt.slice(5, -8)} </h2>
            <h3>{forecast[15].weather[0].description}</h3>

            <h3>Max: {forecast[15].main.temp_max}C°</h3>
            <h3>Min: {forecast[13].main.temp_min}C°</h3>
          </Card>
        </Col>
        <Col>
          <Card>
            <h2>{forecast[23].dt_txt.slice(5, -8)} </h2>
            <h3>{forecast[23].weather[0].description}</h3>

            <h3>Max: {forecast[23].main.temp_max}C°</h3>
            <h3>Min: {forecast[21].main.temp_min}C°</h3>
          </Card>
        </Col>
        <Col>
          <Card>
            <h2>{forecast[31].dt_txt.slice(5, -8)} </h2>
            <h3>{forecast[31].weather[0].description}</h3>

            <h3>Max: {forecast[31].main.temp_max}C°</h3>
            <h3>Min: {forecast[29].main.temp_min}C°</h3>
          </Card>
        </Col>
      </Row>
      <Col sm="1" className="mt-5">
        <Button
          variant="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </Col>
    </Container>
  );
}
