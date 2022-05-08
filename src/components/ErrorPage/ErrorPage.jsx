import React from "react";
import { Link } from "react-router-dom";

import "./ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Sorry, this page does not exist!</p>
      <p>
        You can go back to <Link to="/">Catalog</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
