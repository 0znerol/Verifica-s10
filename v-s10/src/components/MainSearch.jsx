import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CityList from "./CityList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MainSearch = () => {
  let data = localStorage.getItem("joblist");
  const [city, setCity] = useState("");
  const [cityRes, setCityRes] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCity(e.target.value);
    console.log(city);
  };

  // ...

  const handleSubmit = async (e) => {
    console.log(city);
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=20&appid=cae0c2922ae620d85c689663a408be7d&lang=it`
      );
      if (response.status === 200) {
        const data = response.data;
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
          <h1 className="display-1">Cerca una citta</h1>
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
            <table className="card_bg table text-center">
              <thead>
                <tr>
                  <th className="w-25">City</th>
                  <th className="w-25">Country</th>
                  <th className="w-25">State</th>
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
