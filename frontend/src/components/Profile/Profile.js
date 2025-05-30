import React, { useState, useEffect } from "react";
import "./profile.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tok = sessionStorage.getItem("authToken");
    if (tok) {
      try {
        const decoded = jwtDecode(tok);
        setToken(decoded.user);
      } catch (err) {
        console.error("Invalid token", err);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const goBackToRoutes = (e) => {
    e.preventDefault();
    navigate("/routes");
  };

  if (!token) return <p>Loading...</p>;

  return (
    <div className="container">
      <section className="profile">
        <header className="header">
          <div className="details">
            <img
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=b38c22a46932485790a3f52c61fcbe5a"
              alt={token.name || "Profile Picture"}
              className="profile-pic"
            />
            <h1 className="heading">{token.name || "No Name"}</h1>
            <div className="location">
              <svg
                className="svg-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="..." />
              </svg>
              <p>{token.email || "No Email"}</p>
            </div>
            <div className="stats">
              <div className="col-4">
                <h4>20</h4> <p>Reviews</p>
              </div>
              <div className="col-4">
                <h4>10</h4> <p>Bookings</p>
              </div>
              <div className="col-4">
                <h4>5</h4> <p>5 - Star</p>
              </div>
            </div>
            <div className="stat2">
              <div className="col-12">
                <button className="btn btn-dark bck" onClick={goBackToRoutes}>
                  GO BACK
                </button>
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}
