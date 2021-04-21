import { Content } from "antd/lib/layout/layout";

import MyFooter from "./MyFooter";
import MyHeader from "./MyHeader";

import { Global } from "../style";
import { Col, Row } from "antd";
const AppLayout = ({ children }) => {
  return (
    <>
      <Global />
      <MyHeader />
      <Content>
        <Row>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
          <Col xs={22} sm={22} md={20} lg={20} xl={18}>
            {children}
          </Col>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
        </Row>
      </Content>
      <MyFooter />
    </>
  );
};

export default AppLayout;
