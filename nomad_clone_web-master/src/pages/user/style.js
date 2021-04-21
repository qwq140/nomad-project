import { Col, Row, Tabs } from "antd";
import styled from "styled-components";

export const DashBoardContainer = styled.div`
  padding: 86px 0 224px;
`;

export const DashBoardBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 100px;
  align-items: center;
  .Dash-Top-left {
    .UserInfoBox {
      width: 600px;
      padding: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      box-sizing: border-box;
      border-radius: 10px;
      .UserInfo {
        display: flex;
        .UserInfo-Img {
          img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
          }
        }
      }
      .UserInfoName {
        margin-left: 40px;
        p,
        h3 {
          margin: 0;
          line-height: 1.1;
        }
        p {
          color: #6b7280;
          font-size: 12px;
        }
        .Name {
          margin-bottom: 20px;
          h3 {
            font-size: 30px;
          }
        }
        .UserName {
          font-size: 16px;
        }
      }
    }
  }
  .Dash-Top-right {
    flex-basis: 40%;
    .BadgeContent {
      text-align: center;
      margin-top: 40px;
      background: #f3f4f6;
      padding: 12px;
      border-radius: 7px;
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }
  }
`;

export const ProfileButtonBox = styled.div`
  margin-top: 40px;
  a {
    display: inline-block;
    text-align: center;
    width: 136px;
    padding: 8px 16px;
    font-size: 14px;
    color: #374151;
    border: 1px solid rgba(209, 213, 219, 1);
    border-radius: 5px;
    font-weight: bold;
  }
  .btn-blue {
    background: #3b82f6;
    color: #fff;
    margin-left: 12px;
  }
`;

export const LevelBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  img {
    width: 64px;
    height: 75px;
  }
  .Level-Content {
    width: 100%;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    h3 {
      color: #1f2937;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
`;

export const BadgeBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  .BadgeItem {
    width: 92px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .BadgeImageWrap {
      padding: 4px;
      background: #f3f4f6;
      border-radius: 50%;
      position: relative;
      img {
        display: block;
        width: 64px;
        height: 64px;
      }
      .BadgeLock {
        position: absolute;
        padding: 4px;
        left: 50%;
        bottom: -15px;
        transform: translateX(-50%);
        svg {
          width: 20px;
          height: 20px;
          background: #000;
          border-radius: 50%;
          padding: 4px;
          path {
            color: #fff;
          }
        }
      }
    }

    span {
      padding: 0 8px;
      background: #f3f4f6;
      border-radius: 8px;
    }
  }
`;

export const DashBoardTabs = styled(Tabs)`
  margin-top: 7rem;
`;

export const EditProfileContainer = styled.div`
  padding: 86px 0 228px;
`;

// 유저수정 로우 한박스
export const AccountInfromation = styled(Row)`
  border-bottom: 1px solid #e5e7eb;
  padding: 20px;
`;

// 유저 수정 Col 왼쪽
export const AccountInfromationCol = styled(Col)`
  h2 {
    font-size: 18px;
  }
`;

// 탈퇴용 Col
export const DeleteAccountCol = styled(AccountInfromationCol)`
  h2 {
    color: red;
  }
`;

// 유저 수정 인풋 Col
export const AccountInfromationColInput = styled(Col)`
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  form {
    label {
      display: flex;
    }
    span {
      white-space: nowrap;
    }
    .AccountUpdate {
      text-align: right;
      margin-bottom: 0;
    }
  }
`;

// 유저 수정 인풋박스
export const AccountInputBox = styled.div`
  display: grid;
  grid-column-gap: 30px;
  grid-template-columns: repeat(2, 2fr);
`;

export const EmailInputBox = styled.div`
  input {
    width: 100%;
    border: 1px solid #d9d9d9;
    height: 32px;
    transition: all 0.5s;
    background: #f5f5f5;
    color: rgba(0, 0, 0, 0.25);
    text-indent: 10px;
    cursor: not-allowed;
    :focus {
      outline: none;
    }
  }
`;

export const NameInputBox = styled(EmailInputBox)`
  input {
    width: 50%;
  }
`;
