import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Card, Col, Menu, Row } from "antd";
import { Form } from "antd";
import styled from "styled-components";

export const CommunityContainer = styled(Row)``;

export const CommunityCategory = styled(Col)`
  padding-top: 24px;
  padding-right: 10px;
  min-width: 200px;
  .ant-menu-vertical {
    border: none;
  }
`;

export const CommunityBoard = styled(Col)`
  min-width: 300px;
  .Community-Filter {
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      b {
        width: 80px;
        line-height: 50px;
        color: #6b7280;
        font-weight: 500;
      }
      button {
        color: #9ca3af;
      }
    }
  }
`;

export const CommunityWrite = styled(Col)`
  padding-top: 24px;
  min-width: 200px;
  display: flex;
  justify-content: center;
`;

export const CommunityWriteButton = styled(Button)`
  width: 80%;
  height: 40px;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0 auto;
`;

export const CommunityBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
`;

export const CommunityBoardItem = styled(Card)`
  width: 100%;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  .ant-card-body {
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .Board-Fav {
      width: 45px;
      height: 45px;
    }
  }
  .Board-Body {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    .Board-Body-Title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 6px;
      color: black;
    }
    .Board-Body-Info {
      display: flex;
      flex-wrap: wrap;
      div {
        margin-right: 5px;
        color: #4b5563;
      }
      .Info-Tag {
        span {
          background: #6b7280;
          color: #fff;
          padding: 2px;
          border-radius: 5px;
          font-weight: 500;
        }
      }
      .Info-Name {
        a {
          color: #555;
          span {
            font-weight: 700;
          }
        }
      }
      .Info-Date {
      }
      .Info-Reply {
        span {
          margin-right: 5px;
        }
      }
    }
  }
  .Board-UserImg {
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  }
`;

export const WriteForm = styled(Form)`
  display: flex;
  flex-direction: column;
  button {
    margin-left: auto;
    width: 90px;
    margin-top: 5px;
  }
`;

export const WriteEditor = styled(CKEditor)`
  .ck-editor__editable {
    min-height: 200px;
  }
`;

export const CommunityDetailContainer = styled(CommunityContainer)`
  padding: 112px 0 126px;
`;
export const CommunityDetailBack = styled(CommunityCategory)`
  a {
    font-weight: bold;
  }
`;

export const CommunityReplyBoxContainer = styled.div`
  width: 100%;
`;

export const CommunityReplyCounter = styled.div`
  padding: 32px 0;
  span {
    font-size: 18px;
    font-weight: bold;
    color: #4b5563;
    b {
      margin-right: 5px;
    }
  }
`;

export const CommunityDetailItem = styled(Card)`
  width: 100%;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .Detail-top {
      padding: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .Board-Fav {
        width: 45px;
        height: 45px;
      }
      .Board-Body {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        .Board-Body-Title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 6px;
        }
        .Board-Body-Info {
          display: flex;
          flex-wrap: wrap;
          div {
            margin-right: 5px;
            color: #4b5563;
          }
          .Info-Tag {
            span {
              background: #6b7280;
              color: #fff;
              padding: 2px;
              border-radius: 5px;
              font-weight: 500;
            }
          }
          .Info-Name {
            a {
              color: #555;
              span {
                font-weight: 700;
              }
            }
          }
          .Info-Date {
          }
          .Info-Reply {
            span {
              margin-right: 5px;
            }
          }
        }
      }
      .Board-UserImg {
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
        }
      }
    }
  }
`;

export const DetailContent = styled.div`
  padding: 40px 0 0;
  img {
    width: 100%;
  }
`;

export const ReplyInputForm = styled(Form)`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  textarea {
    min-height: 120px;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
  .ant-form-item:last-child {
    text-align: right;
  }
`;

export const SkeltonCard = styled(Card)`
  margin-bottom: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  .ant-card-body {
    padding: 20px;
  }
  .ant-skeleton {
    display: flex;
    flex-direction: row-reverse;
  }
  .ant-skeleton-content {
    margin-right: 20px;
  }
  .ant-skeleton-paragraph {
    margin-top: 10px;
  }
`;

export const SortMenu = styled(Menu)`
  border-bottom: none;
  > .ant-menu-item {
    margin: 0 5px !important;
    border-bottom: none;
  }
  > .ant-menu-item.ant-menu-item-active {
    border-bottom: none !important;
  }
  .ant-menu-item:hover {
    border-bottom: none;
  }
  .ant-menu-item.ant-menu-item-selected {
    border-bottom: none;
  }
`;
export const DeleteCommunity = styled.div`
  width: 100%;
  text-align: right;
`;
