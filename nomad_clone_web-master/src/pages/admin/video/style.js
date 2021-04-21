import { Card, Form, List } from "antd";
import styled from "styled-components";

export const VideoList = styled(List)`
  .ant-list-item {
  }
  .ant-list-item > a {
    color: #333;
    display: flex;
  }
  .ant-list-item > a:hover {
    color: #1890ff;
  }
  .ant-list-item > a > span > svg {
    margin: 0 10px 0 5px;
    font-size: 20px;
  }
`;
export const ModalForm = styled(Form)`
  > div:last-child {
    margin-bottom: 0;
    text-align: right;
  }
  > div:last-child button:first-child {
    margin-right: 5px;
  }
  .form_hidden {
    height: 1px;
    margin-bottom: 0;
  }
`;
export const CurriculumListCard = styled(Card)`
  text-align: center;
  margin-top: 20px;
  .ant-card-head-title {
    font-size: 2rem;
  }
`;
export const CurriculumCard = styled(Card)`
  margin-top: 20px;
  .ant-card-head-title {
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
  }
  .ant-card-body {
    padding: 20px;
    padding-top: 0;
  }
  .ant-card-body > button {
    float: right;
  }
  .ant-spin-container li strong {
    font-size: 1.3rem;
  }
  .ant-spin-container li span:hover {
    cursor: pointer;
  }
  .ant-spin-container li svg {
    margin: 0 10px 0 5px;
  }
`;
export const CautionsCard = styled(Card)`
  p {
    padding: 0;
    margin: 0;
    color: #aaa;
  }
`;
