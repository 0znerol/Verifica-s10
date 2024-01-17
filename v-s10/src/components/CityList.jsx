import { Link } from "react-router-dom";

const CityList = ({ data }) => {
  console.log(data);
  return (
    <tr>
      <td key={data.country}>
        <Link to={`/res/${data.lat}/${data.lon}`}>{data.name}</Link>
      </td>
      <td>
        <Link to={`/res/${data.lat}/${data.lon}`}>{data.country}</Link>
      </td>
      <td>
        <Link to={`/res/${data.lat}/${data.lon}`}>{data.state}</Link>
      </td>
    </tr>
  );
};

export default CityList;
