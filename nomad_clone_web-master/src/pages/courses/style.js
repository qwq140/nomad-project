import { Button, Menu } from "antd";
import styled from "styled-components";
import { ColorLayout } from "../admin/courses/style";

export const FilterButton = styled(Button)`
  background-color: ${(props) => props.color};
  border-color: ${(props) => props.color};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  :focus {
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }
`;

export const CoursesFilter = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  div.Filter-left {
    flex: 1;
    min-width: 483px;
    height: 375px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    div {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-size: 16px;
        margin-bottom: 20px;
      }
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        position: relative;
        button {
          border-radius: 15px;
          color: #000;
        }
        .cancel {
          position: absolute;
          bottom: -40px;
        }
      }
    }
  }
  div.Filter-right {
    flex: 1;
    padding: 0 50px;
    min-width: 483px;
    height: 375px;
    box-sizing: border-box;
    h3 {
      text-align: center;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;

export const BadgeSelector = styled(Menu)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  justify-items: center;
  box-sizing: border-box;
  max-width: 500px;
  margin: 0 auto;
  border: none;
  position: relative;
  :before {
    display: none;
  }

  .cancel {
    border-radius: 50%;
    position: absolute;
    bottom: -40px;
  }
`;

export const CoursesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(378px, 1fr));
  row-gap: 70px;
  padding-bottom: 224px;
`;

export const CoursesDetailLayout = styled(ColorLayout)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .mainImage {
    width: 50%;
    padding: 80px 32px 20px;
    img {
      width: 100%;
    }
  }
  .titleContainer {
    display: flex;
    flex-direction: column;
    * {
      text-align: center;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 48px;
      color: ${(props) => props.textcolor || "#000"};
    }
    h2 {
      color: ${(props) => props.textcolor || "#000"};
      font-size: 24px;
    }
    h3 {
      width: 50px;
      line-height: 26px;
      margin: 20px auto;
      border-radius: 30px;
      background-color: ${(props) => props.textcolor || "#000"};
      color: ${(props) => props.background || "#000"};
      font-size: 14px;
      font-weight: bold;
    }
  }
  .badgeContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    position: absolute;
    left: 50%;
    top: -140px;
    transform: translateX(-50%);
    z-index: 100000000000 !important;
    img {
      width: 128px;
      height: 128px;
      border: 7px solid #fff;
      border-radius: 50%;
      transition: 0.3s all;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
`;

export const CourseInfomation = styled.div`
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  div:first-child {
    border-radius: 10px 0 0 10px;
  }
  div:last-child {
    border-radius: 0 10px 10px 0;
  }
  div {
    background-color: #fff;
    flex: 1;
    padding: 24px;
    min-width: 230px;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    :last-child {
      /* border: none; */
    }
    h2 {
      color: #2563eb;
      margin: 0;
      font-size: 48px;
      font-weight: bold;
    }
    p {
      color: #6b7280;
      margin: 0;
      font-size: 18px;
    }
  }
`;

export const SimpleInfo = styled.div`
  padding: 100px 0 30px;
  width: 90%;
  margin: 0 auto;
  .simpleInfoBox {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin-bottom: 96px;
    img {
      flex: 1;
      max-width: 192px;
      height: 192px;
      border-radius: 20px;
      margin-right: 20px;
    }
    div {
      flex: 2;
      min-width: 390px;
      padding: 24px;
      background: #fff;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      h3 {
        font-size: 30px;
      }
      p {
        font-size: 18px;
        color: #4b5563;
      }
    }
  }
  .simpleInfoBoxR {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    width: 100%;
    justify-content: center;
    margin-bottom: 96px;
    img {
      flex: 1;
      max-width: 192px;
      height: 192px;
      border-radius: 20px;
      margin-left: 20px;
    }
    div {
      flex: 2;
      min-width: 390px;
      padding: 24px;
      background: #fff;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      h3 {
        font-size: 30px;
      }
      p {
        font-size: 18px;
        color: #4b5563;
      }
    }
  }
`;

export const ConcepConatiner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .concepTitle {
    color: ${(props) => props.textcolor || "#000"};
    font-size: 36px;
    margin-bottom: 12px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    margin: 0;
    margin-bottom: 70px;
  }
  .concepVisual {
    display: flex;
    flex-wrap: wrap;
    padding: 0 32px;
    gap: 30px;
    .concepLeft {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      height: 5 00px;
      min-width: 440px;
      grid-gap: 20px;
      div {
        border-radius: 10px;
        width: 100%;
        height: 100%;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        background: #fff;
        padding: 12px;
        h3 {
          text-align: center;
          margin: 0;
          margin-bottom: 10px;
          padding: 5px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        p {
          svg {
            margin: 0 10px;
          }
          font-size: 14px;
        }
      }
    }
    .concepRight {
      flex: 1;
      min-width: 450px;
      background: #111827;
      border-radius: 10px;
      overflow: hidden;
      .console {
        background: #374151;
        height: 35px;
        display: flex;
        align-items: center;
        padding: 0 30px;
        span {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: #fde047;
          border-radius: 50%;
          position: relative;
          :after {
            content: "";
            position: absolute;
            left: -20px;
            top: 0;
            width: 12px;
            height: 12px;
            background: #ef4444;
            border-radius: 50%;
          }
          :before {
            content: "";
            position: absolute;
            right: -20px;
            bottom: 0px;
            width: 12px;
            height: 12px;
            background: #10b981;
            border-radius: 50%;
          }
        }
      }
      .consoleConcept {
        width: 100%;
        padding: 12px;
        box-sizing: border-box;
        b {
          font-size: 20px;
          color: #fff;
        }
        .endB {
          margin-left: 15px;
        }
        p {
          color: #fff;
          font-size: 20px;
          margin: 0;
        }
        h3 {
          color: #fee08a;
          span {
            color: #00ffff;
          }
        }
      }
      h4 {
        text-indent: 30px;
        color: #fff;
        font-size: 16px;
        span {
          color: #00ffff;
        }
      }
    }
  }
`;

export const ConceptLayout = styled(ColorLayout)`
  padding: 50px 0 150px;
  .afterLecture {
    text-align: center;
    font-size: 36px;
    h2 {
      color: ${(props) => props.textcolor || "#000"};
      font-weight: bold;
      margin-bottom: 50px;
      font-size: 40px;
    }
    p {
      font-size: 18px;
      color: ${(props) => props.textcolor || "#000"};
      strong {
        margin-left: 10px;
        font-weight: normal;
      }
    }
  }
`;

export const LevelDetailLayout = styled(ColorLayout)`
  padding: 100px 0 150px;
  text-align: center;
  h2 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  p {
    font-size: 20px;
    color: #111827;
    font-weight: bold;
    padding: 0 20px;
  }
`;

export const PurchaseLayout = styled(ColorLayout)`
  h2 {
    color: ${(props) => props.textcolor || "#000"};
    text-align: center;
    margin-top: 80px;
    font-size: 36px;
  }
  h3 {
    color: ${(props) => props.textcolor || "#000"};
    font-weight: normal;
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }
  .purchaseBox {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 15px;
    .purchaseInfo {
      flex: 2;
      padding: 48px;
      h3 {
        color: #000;
        font-size: 30px;
        font-weight: bold;
      }
      p {
        margin-top: 24px;
        color: #6b7280;
        font-size: 16px;
      }
      .included {
        padding: 20px 0;
        display: flex;
        align-items: center;
        span {
          display: block;
          min-width: 150px;
          color: #2563eb;
          font-weight: bold;
        }
        div {
          width: 100%;
          height: 1px;
          background: #ddd;
        }
      }
      .includedBox {
        display: grid;
        grid-template-columns: repeat(2, 2fr);
        span {
          span {
            margin-right: 5px;
            color: #374151;
          }
        }
      }
    }
    .purchasePrice {
      border-radius: 0 15px 15px 0;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #f9fafb;
      h4 {
        color: #111827;
        font-size: 18px;
      }
      .price {
        p {
          font-size: 48px;
          color: #111827;
          font-weight: bold;
        }
      }
      a {
        width: 80%;
        padding: 12px 20px;
        background: #000;
        text-align: center;
        border-radius: 10px;
        color: #fff;
      }
    }
  }
`;

export const CurriculumLayout = styled(ColorLayout)`
  padding: 100px 0 150px;
  .afterLecture {
    font-size: 26px;
    h2 {
      font-weight: bold;
      text-align: center;
    }

    @media only screen and (max-width: 1000px) {
      .ant-list {
        width: 80%;
      }
    }
    @media only screen and (min-width: 1000px) {
      .ant-list {
        width: 60%;
      }
    }
    .ant-list {
      margin-top: 40px;
      margin: 40px auto 0 auto;
      border-radius: 5px;
      box-shadow: 0 5px 15px -3px rgb(0 0 0 / 10%),
        0 4px 6px -2px rgb(0 0 0 / 5%);
      .ant-list-header {
        border-radius: 5px 5px 0 0;
        background-color: white;
        padding: 10px 20px;
        font-weight: 600;
      }
      .ant-spin-container li:nth-child(2n-1) {
        background-color: #f3f4f6;
      }
      .ant-spin-container li:nth-child(2n) {
        background-color: #fff;
      }
      .ant-spin-container li:last-child {
        border-radius: 0 0 5px 5px;
      }
    }
  }
`;

export const FaqLayout = styled(ColorLayout)`
  padding: 100px 0 150px;
  .afterLecture {
    font-size: 26px;
    h2 {
      font-weight: bold;
      text-align: center;
    }
    @media only screen and (max-width: 1000px) {
      .ant-collapse {
        margin: 0 auto;
        width: 80%;
      }
    }
    @media only screen and (min-width: 1000px) {
      .ant-collapse {
        margin: 0 auto;
        width: 50%;
      }
    }
    .ant-collapse-header {
      font-size: 18px;
      font-weight: 600;
      border-top: 1px solid #ccc;
    }
  }
`;
export const PurchaseContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  .purchaseInfo {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    box-sizing: border-box;
    row-gap: 50px;
    .purchaseInfoLeft {
      flex: 1;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        img {
          border-radius: 13px;
          width: 400px;
          height: 250px;
        }
        .courseInfo {
          position: absolute;
          width: 350px;
          left: 50%;
          bottom: -30px;
          background: #fff;
          display: flex;
          flex-direction: column;
          transform: translateX(-50%);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 15px 0;
          border-radius: 10px;
          h3 {
            font-weight: bold;
          }
        }
      }
    }
    .purchaseInfoRight {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        width: 450px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        h2 {
          text-align: center;
          padding: 15px 0;
        }
        .totalPrice {
          border: 1px solid #ddd;
          padding: 30px 0;
          h3 {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            padding: 0 20px;
          }
        }
      }
      button {
        display: block;
        width: 450px;
        margin-top: 30px;
        height: 50px;
        border-radius: 7px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
`;

export const CoursePaidMoveButton = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding: 12px 40px;
    background: #2563eb;
    color: #fff;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bold;
  }
`;
