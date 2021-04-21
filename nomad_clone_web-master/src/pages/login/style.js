import { Card } from "antd";
import styled from "styled-components";

export const LoginContainer = styled(Card)`
  padding-top: 50px;
  text-align: center;
  h2 {
    font-size: 2rem;
  }
`;

export const LoginForm = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
  button {
    width: 100%;
    max-width: 300px;
  }
  button:first-child > div {
    display: flex;
  }
  button:first-child > span {
    font-size: 1rem;
    margin-top: 4px;
  }
`;
