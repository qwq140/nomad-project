import { Content } from "antd/lib/layout/layout";

import MyFooter from "./MyFooter";
import MyHeader from "./MyHeader";

import { Global } from "../style";
const AppNoColLayout = ({ children }) => {
  return (
    <>
      <Global />
      <MyHeader />
      <Content>{children}</Content>
      <MyFooter />
    </>
  );
};

export default AppNoColLayout;
