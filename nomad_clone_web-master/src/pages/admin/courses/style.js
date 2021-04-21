import { Card, Input, Layout, Row, Space, Upload } from "antd";
import styled from "styled-components";

export const DivContainer = styled.div`
  background-color: #f4f5f7;
`;

export const ColorLayout = styled(Layout)`
  background: ${(props) => props.background || "#f4f5f7"};
  position: relative;
  padding-top: 40px;
  padding-bottom: ${(props) => (props.paddingbottom || 180) + "px"};
  z-index: 1;
  ::before {
    content: "";
    display: ${(props) => props.beforedisplay || "none"};
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    top: 0px;
    transform-origin: left top;
    transform: skewY(-5deg);
  }
`;

export const BasicCard = styled(Card)`
  background: transparent;
  text-align: center;
  .ant-card-head {
    font-size: 35px;
    border-bottom: none;
  }
  .ant-card-body {
    padding: 0 20px;
    border: 0;
  }
`;
export const MyCard2 = styled(BasicCard)`
  position: absolute;
  width: 100%;
  top: -144px;
`;
export const MyCard3 = styled(BasicCard)`
  background-color: #fff;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
  .ant-card-body div:first-child {
    line-height: 40px;
    display: flex;
    align-items: center;
  }
  .ant-card-body div:first-child div:last-child {
    font-size: 1.5rem;
    padding-left: 5px;
  }
  .ant-card-body div:first-child input {
    width: 100px;
    text-align: center;
  }
  .ant-card-body div:first-child span {
    margin-left: 5px;
    font-size: 1.5rem;
    position: absolute;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

export const ColorInput = styled(Input)`
  color: ${(props) => props.textcolor};
`;

export const ImageSpace = styled(Space)`
  .ant-upload-list-picture .ant-upload-list-item {
    height: 300px;
  }
  .ant-upload-span {
    flex-direction: column;
  }
  .ant-upload-list-picture .ant-upload-list-item-thumbnail {
    width: 200px;
    height: 200px;
  }
  .ant-upload-list-picture .ant-upload-list-item-thumbnail img {
    width: 100%;
    height: 100%;
  }
  .ant-upload-list-item-name {
    flex: none;
  }
  .ant-progress-outer {
    margin-left: -40px;
  }
`;
export const InputSpace = styled(Space)`
  width: 100%;
  display: flex;
  justify-content: center;
  .ant-space-item:first-child {
    width: 80%;
  }
`;

export const ImageUpload = styled(Upload)`
  .ant-upload-list-item-info {
    ::before {
      left: 0;
    }
  }
  .ant-upload-list-item-actions > a {
    display: none;
  }
  .ant-upload-list-item-actions > button {
    width: 25px;
    height: 25px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-delete {
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .ant-upload-list-item-actions > button svg {
    width: 25px;
    height: 25px;
    left: 50%;
  }
  .ant-upload.ant-upload-select-picture-card {
    border-radius: 50%;
    width: 128px;
    height: 128px;
  }
  .ant-upload-list-picture-card-container {
    width: 128px;
    height: 128px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    border-radius: 50%;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-info {
    border-radius: 50%;
  }
`;

export const MyRow = styled(Row)`
  padding: 1.5rem;
`;

export const SimpleInfoRow = styled(MyRow)`
  padding: 1.5rem;
  .ant-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  > span.anticon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
  .ant-col .ant-row {
    width: 100%;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-form-item-control-input {
    width: 100%;
    :last-child {
      margin-top: 5px;
    }
  }
`;
