import styled from "styled-components";
import breakpoints from "utils/breakpoints";

const StyledFooter = styled.footer`
  display: none;

  /* @media only screen and ${breakpoints.device.xs} { */
  @media only screen and ${breakpoints.device.xs} {
    display: block;
  }
`;

const Footer = () => (
  <StyledFooter className="fixed bottom-0 left-0 right-0 text-center bg-purple-500 py-3">
    Design by{" "}
    <a
      className="font-semibold"
      // target="_blank"
      href="https://dribbble.com/shots/14100356-ToDo-App-UI"
    >
      Alex Arutuynov
    </a>
  </StyledFooter>
);

export default Footer;
