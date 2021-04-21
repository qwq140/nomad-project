import { Button } from "antd";
import styled from "styled-components";

export const JoinContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  align-items: center;
  h2 {
    text-align: center;
    font-size: 30px;
    color: #111827;
  }
  form {
    width: 448px;
    padding: 32px 40px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    .ant-form-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      .ant-col-8,
      .ant-col-16 {
        flex: none;
        max-width: 100%;
      }

      .ant-form-item-label {
        display: block;
        text-align: left;
      }
      .ant-form-item-control {
        margin: 0;
      }
      .ant-checkbox-wrapper {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 5px;
`;
