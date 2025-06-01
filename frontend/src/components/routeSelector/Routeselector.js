import React, { useState } from "react";
import "./Routeselector.css";
import * as apiCall from "./routeApifunc";
import BusList from "../BusList/BusList";

export default function Routeselector() {
  const [dataInp, setData] = useState([]);
  const [startCity, setStartCity] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFromCity = (e) => {
    setStartCity(e.target.value);
    localStorage.setItem("start", e.target.value);
  };

  const handleToCity = (e) => {
    setDestination(e.target.value);
    localStorage.setItem("destination", e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    localStorage.setItem("date", e.target.value);
  };

  const getRoutes = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    apiCall
      .getRoutesFromApi(startCity, destination, date)
      .then((response) => {
        setData(response.data.bus || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch routes.");
        setLoading(false);
      });
  };

  const renderBusList = (dataInp) => {
    if (Array.isArray(dataInp) && dataInp.length > 0) {
      return <BusList value={dataInp} />;
    }
    return <div>No buses found.</div>;
  };

  return (
    <div className="rdc">
      <div className="main-container">
        <form className="form-inline" onSubmit={getRoutes}>
          <select
            name="from"
            className="selectpicker"
            onChange={handleFromCity}
            value={startCity}
            required
          >
            <option value="" disabled>
              FROM
            </option>
            <option>Chennai</option>
            <option>Bangalore</option>
          </select>

          <select
            name="to"
            className="selectpicker"
            onChange={handleToCity}
            value={destination}
            required
          >
            <option value="" disabled>
              TO
            </option>
            <option>Hyderabad</option>
            <option>Coimbatore</option>
            <option>Vishakapatnam</option>
            <option>Bangalore</option>
            <option>Chenai</option>
          </select>

          <input onChange={handleDate} type="date" value={date} required />

          <input
            type="submit"
            className="btn btn-primary btn-md getRoute"
            disabled={!startCity || !destination || !date || loading}
          />
        </form>

        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && <div>{renderBusList(dataInp)}</div>}
      </div>
    </div>
  );
}
