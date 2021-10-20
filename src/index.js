import React from "react";
import ReactDOM from "react-dom";
import App from "domain/App/App";
import AppProvider from "contexts";
import Footer from "components/UI/Footer";
import styled from "styled-components";
import breakpoints from "utils/breakpoints";

import "../node_modules/slick-carousel/slick/slick.css";
import "assets/tailwind.output.css";
import "assets/style.css";

const StyledWrapper = styled.div`
  /* -------------------------------------------------------------------------- */

  @media only screen and ${breakpoints.device.xs} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <StyledWrapper>
        <App />
        <Footer />
      </StyledWrapper>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
