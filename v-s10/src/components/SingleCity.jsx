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
      setForecast(await response.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchCity();
  }, []);

  if (city.length < 1 || forecast.length < 1) return <h1>Loading...</h1>;
  const daysArray = [forecast[7], forecast[15], forecast[23], forecast[31]];
  let highTemp = 0;
  let lowTemp = 100;
  const minTempArray = [forecast[4], forecast[12], forecast[20], forecast[28]];
  forecast.forEach((day, index) => {
    if (day.dt_txt.slice(5, -8) == "03:00") {
      if (day.main.temp_max > highTemp) {
        highTemp = day.main.temp_max;
      }
      console.log(lowTemp);
    }
  });
  forecast.forEach((day, index) => {
    if (day.dt_txt.slice(11, -3) == "03:00") {
      if (day.main.temp_max > highTemp) {
        highTemp = day.main.temp_max;
      }
      console.log(lowTemp);
    }
  });
  forecast.forEach((day, index) => {
    console.log(day);
    console.log("-" + day.dt_txt.slice(11, -3) + "-");
    if (day.dt_txt.slice(11, -3) == "03:00") {
      if (day.main.temp_min < lowTemp) {
        lowTemp = day.main.temp_min;
      }
      console.log(lowTemp);
    }
  });
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
          <i className="bi bi-x-lg"></i>
        </Button>
      </Col>

      <Container className="text-center">
        <Row>
          <Col className="card_bg card">
            <h1>{city.name}</h1>
            <h2 className="mt-5">Temperatura: {city.main.temp}C°</h2>
            <h2>Temperatura Percepita: {city.main.feels_like}C°</h2>

            <Row>
              <Col className="text-end">
                <i className="bi bi-thermometer-sun fs-1 text-danger"></i>
              </Col>
              <Col className="text-start">
                <h4 className="mt-3">{highTemp}</h4>
              </Col>

              <Col className="text-end">
                <i className="bi bi-thermometer-snow fs-1 text-primary"></i>
              </Col>
              <Col className="text-start">
                <h4 className="mt-3">{lowTemp}</h4>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="text-end">
                <i className="bi bi-moisture mx-2 text-primary fs-2"></i>
              </Col>
              <Col className="text-start">
                <h4 className="mt-2 pt-1">{city.main.humidity}%</h4>
              </Col>
            </Row>
            <Row className="card card_bg w-75 m-auto">
              <Col>
                <h2>{city.weather[0].description}</h2>
                <i>
                  <img
                    src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
                  ></img>
                </i>
                <h2>Meteo attuale</h2>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <h2>Previsioni</h2>
        </Row>
        <Row>
          {daysArray.map((day, index) => (
            <Col className="w-100 p-0 mx-2" key={index}>
              <Card className="card_bg h-100">
                <Row>
                  <Col className="m-auto ms-3 fs-1 text-start">
                    <i>
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      ></img>
                    </i>
                  </Col>
                  <Col>
                    <h5>{day.dt_txt.slice(5, -8)} </h5>
                  </Col>
                </Row>
                <Row className="w-100 card card_bg h-100 m-auto">
                  <h3>{day.weather[0].description}</h3>
                  <h3 className="mt-auto">
                    <i className="bi bi-thermometer-sun text-danger"></i>{" "}
                    {day.main.temp_max}
                    C°
                  </h3>
                  <h3>
                    <i className="bi bi-thermometer-snow text-primary"></i>{" "}
                    {minTempArray[index].main.temp_min}
                    C°
                  </h3>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
