import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./singleCity.css";
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
    <>
      <Col sm="1" className="mt-5">
        {" "}
        <Button
          variant="transparent"
          onClick={() => {
            navigate("/");
          }}
        >
          <i class="bi bi-x-lg"></i>
        </Button>
      </Col>

      <Container className="text-center">
        <Row>
          <Col className="card_bg card">
            <h1>{city.name}</h1>
            <h2 className="mt-5">Temperatura: {city.main.temp}C°</h2>
            <Row>
              <Col className="text-end">
                <i class="bi bi-thermometer-sun fs-1"></i>
              </Col>

              <Col className="text-start">
                <h4 className="mt-3">{city.main.temp_max}</h4>
              </Col>
              <Col className="text-end">
                <i class="bi bi-thermometer-snow fs-1"></i>
              </Col>

              <Col className="text-start">
                <h4 className="mt-3">{city.main.temp_min}</h4>
              </Col>
            </Row>
            <h2>Temperatura Percepita: {city.main.feels_like}C°</h2>
            <h2>{city.weather[0].description}</h2>
            <i>
              <img
                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
              ></img>
            </i>
            <h2>Meteo attuale</h2>
          </Col>
        </Row>
        <Row className="mt-5">
          <h2>Previsioni</h2>
        </Row>
        <Row>
          <Col>
            <Card className="card_bg">
              <Row>
                <Col className="m-auto ms-3 fs-1 text-start">
                  <i>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecast[7].weather[0].icon}@2x.png`}
                    ></img>
                  </i>
                </Col>
                <Col>
                  <h5>{forecast[7].dt_txt.slice(5, -8)} </h5>
                </Col>
              </Row>
              <h3>{forecast[7].weather[0].description}</h3>

              <h3>
                <i class="bi bi-thermometer-sun"></i>{" "}
                {forecast[7].main.temp_max}
                C°
              </h3>
              <h3>
                <i class="bi bi-thermometer-snow"></i>{" "}
                {forecast[5].main.temp_min}
                C°
              </h3>
            </Card>
          </Col>
          <Col>
            <Card className="card_bg">
              <Row>
                <Col className="m-auto ms-3 fs-1 text-start">
                  <i>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecast[15].weather[0].icon}@2x.png`}
                    ></img>
                  </i>
                </Col>
                <Col>
                  <h5>{forecast[15].dt_txt.slice(5, -8)} </h5>
                </Col>
              </Row>
              <h3>{forecast[15].weather[0].description}</h3>

              <h3>
                <i class="bi bi-thermometer-sun"></i>{" "}
                {forecast[15].main.temp_max}
                C°
              </h3>
              <h3>
                <i class="bi bi-thermometer-snow"></i>{" "}
                {forecast[13].main.temp_min}C°
              </h3>
            </Card>
          </Col>
          <Col>
            <Card className="card_bg">
              <Row>
                <Col className="m-auto ms-3 fs-1 text-start">
                  <i>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecast[23].weather[0].icon}@2x.png`}
                    ></img>
                  </i>
                </Col>
                <Col>
                  <h5>{forecast[23].dt_txt.slice(5, -8)} </h5>
                </Col>
              </Row>
              <h3>{forecast[23].weather[0].description}</h3>

              <h3>
                <i class="bi bi-thermometer-sun"></i>{" "}
                {forecast[23].main.temp_max}
                C°
              </h3>
              <h3>
                <i class="bi bi-thermometer-snow"></i>{" "}
                {forecast[21].main.temp_min}C°
              </h3>
            </Card>
          </Col>
          <Col>
            <Card className="card_bg">
              <Row>
                <Col className="m-auto ms-3 fs-1 text-start">
                  <i>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecast[31].weather[0].icon}@2x.png`}
                    ></img>
                  </i>
                </Col>
                <Col>
                  <h5>{forecast[31].dt_txt.slice(5, -8)} </h5>
                </Col>
              </Row>
              <h3>{forecast[31].weather[0].description}</h3>

              <h3>
                <i class="bi bi-thermometer-sun"></i>{" "}
                {forecast[31].main.temp_max}
                C°
              </h3>
              <h3>
                <i class="bi bi-thermometer-snow"></i>{" "}
                {forecast[29].main.temp_min}C°
              </h3>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
