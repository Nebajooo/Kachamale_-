import React, { useState, useEffect } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import "./busList.css";

export default function BusList({ value: dataInp }) {
  const [obj, setObj] = useState([]);
  const [reset, setReset] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [clas, setClas] = useState(true);

  useEffect(() => {
    setObj(dataInp);
  }, [dataInp]);

  const handleSubmit = (bId) => {
    localStorage.setItem("selectedBusId", bId);
    setClas(false);
    setArrowDown(true);
  };

  const handleReset = () => {
    if (!clas) {
      setReset(true);
      setClas(true);
      setArrowDown(false);
    }
    localStorage.removeItem("selectedBusId");
  };

  const renderFunction = () => {
    return dataInp.map((bus, idx) => (
      <div key={idx} className="card mt-5 buslist">
        <div className="row ml-3">
          <div className="col-6 col-sm-3 mt-2 font-weight-bold">Brand</div>
          <div className="col-6 col-sm-3 mt-2 font-weight-bold">From</div>
          <div className="col-6 col-sm-3 mt-2 font-weight-bold">To</div>
          <div className="col-6 col-sm-3 mt-2 font-weight-bold">Price</div>

          <div className="w-100 d-none d-md-block"></div>

          <div className="col-6 col-sm-3 mb-4">{bus.companyName}</div>
          <div className="col-6 col-sm-3 mb-4">{bus.startCity}</div>
          <div className="col-6 col-sm-3 mb-4">{bus.destination}</div>
          <div className="col-6 col-sm-3 mb-4">{bus.pricePerSeat}</div>

          <div className="col-6 col-sm-4 mb-2 ml-0">
            <button
              className={
                clas
                  ? "btn btn-primary btn-md"
                  : "btn btn-primary btn-md disabled"
              }
              onClick={() => handleSubmit(bus._id)}
            >
              Book Now
            </button>
          </div>

          <div className="col-6 col-sm-4 mb-2 ml-0">
            <span
              className={reset ? "badge badge-danger ml-5" : "disabled"}
              onClick={handleReset}
            >
              Reset
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {renderFunction()}
      <div className={arrowDown ? "activeArrow" : "nonActive"}>
        <FaAngleDoubleDown />
      </div>
    </div>
  );
}
