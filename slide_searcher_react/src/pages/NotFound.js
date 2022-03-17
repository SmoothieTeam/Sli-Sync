import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const NotFoundBody = createGlobalStyle`
body {
  background: #eceff1;
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
`;

const Message = styled.div`
  background: white;
  max-width: 360px;
  margin: 100px auto 16px;
  padding: 32px 24px 16px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  h3 {
    color: #888;
    font-weight: normal;
    font-size: 16px;
    margin: 16px 0 12px;
  }
  h2 {
    color: #ffa100;
    font-weight: bold;
    font-size: 16px;
    margin: 0 0 8px;
  }
  h1 {
    font-size: 22px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.6);
    margin: 0 0 16px;
  }
  p {
    line-height: 140%;
    margin: 16px 0 24px;
    font-size: 14px;
  }
  a {
    display: block;
    text-align: center;
    background: #039be5;
    text-transform: uppercase;
    text-decoration: none;
    color: white;
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;

function NotFound() {
  return (
    <>
      <NotFoundBody></NotFoundBody>
      <Message>
        <h2>404</h2>
        <h1>Page Not Found</h1>
        <p>
          The specified file was not found on this website. Please check the URL
          for mistakes and try again.
        </p>
      </Message>
    </>
  );
}

export default NotFound;
