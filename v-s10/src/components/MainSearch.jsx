import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CityList from "./CityList";
import { useNavigate } from "react-router-dom";
const MainSearch = () => {
  let data = localStorage.getItem("joblist");
  const [city, setCity] = useState("");
  const [cityRes, setCityRes] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCity(e.target.value);
    console.log(city);
  };

  const handleSubmit = async (e) => {
    console.log(city);
    e.preventDefault();

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=20&appid=f5781462f66db4c92f31a25beda728aa`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCityRes(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/favorites/")}
          >
            favorites
          </button>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={city}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {cityRes.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>City</th>
                  <th>Country</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {cityRes.map((cityData) => (
                  <CityList data={cityData} />
                ))}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
