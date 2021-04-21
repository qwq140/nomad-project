import { Card } from "antd";
import styled from "styled-components";
import {
  CommunityBoard,
  CommunityContainer,
  CommunityBoardContainer,
  CommunityCategory,
} from "../community/style";

export const FaqContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
  padding-bottom: 20px;
  .Faq-Item {
    flex: 1;
    min-width: 400px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    h3 {
      font-size: 24px;
      font-weight: bold;
    }
    .Faq-Item-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 8px;
      a {
        font-size: 18px;
        text-indent: 10px;
      }
    }
  }
`;
export const FaqDetailContainer = styled(CommunityContainer)`
  padding: 80px 0 224px;
`;

export const FaqDetailBoard = styled(CommunityBoard)`
  .faq-title {
    font-size: 36px;
    color: #111827;
    font-weight: bold;
    padding: 0 50px;
  }
`;

export const FaqBoardContainer = styled(CommunityBoardContainer)`
  padding: 0 50px;
`;

export const FaqBoardItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
  img {
    width: 100%;
  }
  .faq-detail-title {
    margin: 16px 0;
    h3 {
      font-size: 24px;
    }
  }
  /* p {
    margin: 12px 0;
    padding-left: 20px;
    position: relative;
  } */
  /* p:after {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #000;
    transform: translateY(-50%);
  } */
  .faq-detail-image {
    margin: 12px 0;
    img {
      display: block;
      margin-right: auto;
    }
  }
`;

export const FaqCategory = styled(CommunityCategory)`
  padding-bottom: 50px;
`;

export const RightCard = styled(Card)`
  text-align: right;
  .ant-card-body {
    padding: 0;
    button {
      margin-left: 10px;
    }
  }
`;
