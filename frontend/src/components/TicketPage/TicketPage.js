import React from "react";
import "./TicketPage.css";
import { useNavigate } from "react-router-dom";

export default function TicketPage() {
  const navigate = useNavigate(); // ✅ Correct hook usage

  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("reservedSeats");
    localStorage.removeItem("nameData");
    localStorage.removeItem("selectedBusId");
    localStorage.removeItem("date");
    localStorage.removeItem("start");
    localStorage.removeItem("destination");
    navigate("/"); // ✅ Redirect to home
  };

  const handleBookAgainIcon = (e) => {
    e.preventDefault();
    navigate("/routes");
  };

  const getLocationData = () => {
    const from = localStorage.getItem("start");
    const to = localStorage.getItem("destination");
    return (
      <div>
        <p>From: {from}</p>
        <p>To: {to}</p>
      </div>
    );
  };

  const getPassengerName = () => {
    const nameArray = localStorage.getItem("nameData");
    const names = nameArray ? JSON.parse(nameArray) : [];
    return names.map((name, idx) => (
      <div key={idx}>
        <p className="names">{name}</p>
      </div>
    ));
  };

  const getSeatNumbers = () => {
    const noArray = localStorage.getItem("reservedSeats");
    const arr = noArray ? JSON.parse(noArray) : [];
    return arr.map((element, idx) => (
      <div key={idx}>
        <p className="seatNo">{element}</p> {/* ✅ fixed typo */}
      </div>
    ));
  };

  const getIdNumber = () => {
    const tokenData = localStorage.getItem("selectedBusId");
    return <p className="idData">{tokenData}</p>;
  };

  const getDateValue = () => {
    const dat = localStorage.getItem("date");
    return <p>On: {dat}, 10 AM (Hourly commute)</p>;
  };

  return (
    <div className="container">
      <div>
        <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
          <a href="/#" className="navbar-brand Company-Log">
            UT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-3"
            aria-controls="navbarSupportedContent-3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-3"
          >
            <ul className="navbar-nav ml-auto nav-flex-icons ic">
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={handleBookAgainIcon}
                >
                  Book Again
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={handleSignOut}
                >
                  Sign-Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="tpMain">
        <article className="ticket">
          <header className="ticket__wrapper">
            <div className="ticket__header">1 🎟 UNIQUE TRAVELS</div>
          </header>

          <div className="ticket__divider">
            <div className="ticket__notch"></div>
            <div className="ticket__notch ticket__notch--right"></div>
          </div>

          <div className="ticket__body">
            <section className="ticket__section">
              {getLocationData()}
              {getSeatNumbers()}
              <p>
                Your seats are together <span>{getDateValue()}</span>
              </p>
            </section>

            <section className="ticket__section">
              <h3>Passenger Names</h3>
              {getPassengerName()}
            </section>

            <section className="ticket__section">
              <h3>Payment Method</h3>
              <p>Credit Card</p>
            </section>
          </div>

          <footer className="ticket__footer">
            <p>Transaction-ID</p>
            {getIdNumber()}
          </footer>
        </article>
      </div>
    </div>
  );
}
