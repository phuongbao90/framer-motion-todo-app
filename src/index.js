import React from "react";
import ReactDOM from "react-dom";
import App from "domain/App/App";
import AppProvider from "contexts";
// import Phone from "components/UI/Phone";

import "../node_modules/slick-carousel/slick/slick.css";
import "assets/tailwind.output.css";
import "assets/style.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />

      <footer className="fixed bottom-0 left-0 right-0 text-center bg-purple-500 py-3">
        Design by{" "}
        <a
          className="font-semibold"
          // target="_blank"
          href="https://dribbble.com/shots/14100356-ToDo-App-UI"
        >
          Alex Arutuynov
        </a>
      </footer>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
