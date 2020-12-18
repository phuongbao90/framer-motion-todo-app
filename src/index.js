import React from "react";
import ReactDOM from "react-dom";
import App from "domain/App/App";
import AppProvider from "contexts";
import Phone from "components/UI/Phone";

import "assets/tailwind.output.css";
import "assets/style.css";
import "../node_modules/slick-carousel/slick/slick.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Phone>
        <App />
      </Phone>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
