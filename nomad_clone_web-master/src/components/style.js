import { Button, Form, Menu, Upload } from "antd";
import styled from "styled-components";

// Course-Item
export const CourseBox = styled.div`
  min-width: 378px;
  flex: 1;
  box-sizing: border-box;
  position: relative;
  margin: 0 20px;
  cursor: pointer;
  .courseLevel {
    position: absolute;
    left: 5%;
    top: 5%;
    padding: 2px 12px;
    font-size: 14px;
    background: #d1fae5;
    color: #065f46;
    border-radius: 20px;
    z-index: 100;
  }
  .courseImageWrapper {
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      border-radius: 10px;
    }
    div {
      position: absolute;
      left: 50%;
      bottom: -40px;
      width: 90%;
      margin: 0 auto;
      text-align: center;
      padding: 20px 8px;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  }

  :hover {
    transform: translateY(-5px);
    transition: all 0.5s;
    img {
      transform: scale(1.05);
      transition: all 0.5s;
    }
  }
`;

// Challenge-Item
export const ChallengeBox = styled.div`
  width: 368px;
  height: 434px;
  padding: 20px;
  box-shadow: 5px 20px 25px 5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  border-radius: 10px;
  h2 {
    text-align: center;
    margin: 4px 0 28px;
    font-size: 30px;
    font-weight: normal;
  }
  p {
    display: flex;
    align-items: center;
    margin-bottom: 26px;
    span {
      display: flex;
      width: 32px;
      height: 32px;
      background: #e5e7eb;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      margin-right: 8px;
      svg {
        width: 20px;
        color: #6b7280;
      }
    }
    img {
      display: block;
      width: 48px;
      padding: 3px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-radius: 50%;
    }
  }
  div.starts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px 0;
    padding: 8px;
    font-weight: 600;
    font-size: 14px;
    h2 {
      font-size: 24px;
      line-height: 1;
      margin: 0;
    }
  }
  a {
    display: block;
    background: #faca15;
    padding: 12px;
    text-align: center;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const PageHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 112px 0;
  h1 {
    font-size: 48px;
    color: #111827;
    line-height: 1;
    margin: 0;
  }
  p {
    margin-top: 22px;
    line-height: 1px;
    font-size: 20px;
    color: #6b7280;
  }
`;

export const CommunityReplyCard = styled.div`
  padding: 12px 12px 20px;
  margin-bottom: 20px;

  display: flex;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  .ReplyItemLeft {
    margin-right: 10px;
  }
  .ReplyItemRight {
    width: 100%;
  }
  .ReplyItemRightHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .ReplyItemRightUserInfo {
      span {
        margin-right: 10px;
        color: #4b5563;
      }
      img {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
  }
`;

export const ButtonRightModalForm = styled(Form)`
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

export const CommunityLikeButton = styled(Menu)`
  height: 100%;
  :before {
    display: none !important;
  }
  :after {
    display: none !important;
  }
  li {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      margin: 0 !important;
      line-height: 1;
    }
  }
`;
export const ImageUpload = styled(Upload)`
  display: flex;
  flex-direction: column-reverse;
  .ant-upload-list {
    width: 300px;
    margin-bottom: 5px;
  }
  .ant-upload-list-picture {
    .ant-upload-list-item {
      height: inherit;
    }
    .ant-upload-list-item-thumbnail {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ant-upload-span {
    flex-direction: column;
    text-align: center;
  }
`;
