import { Col, Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequestAction } from "../reducers/user";

const MyHeader = memo(() => {
  const { principal } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutRequestAction());
  };
  return (
    <>
      <Header>
        <Row>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
          <Col xs={22} sm={22} md={20} lg={20} xl={18}>
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="menu-1">
                <Link to="/">
                  <img
                    className="logo"
                    src="http://localhost:3100/images/m.svg"
                    alt="logo"
                  />
                </Link>
              </Menu.Item>
              <Menu.Item key="menu-2">
                <Link to="/courses">Coureses</Link>
              </Menu.Item>
              <Menu.Item key="menu-3">
                <Link to="/community">Community</Link>
              </Menu.Item>
              <Menu.Item key="menu-4">
                <Link to="/faq">FAQ</Link>
              </Menu.Item>
              {principal !== null && principal.roles === "ROLE_ADMIN" && (
                <>
                  <Menu.Item key="menu-10">
                    <Link to="/admin/courses">코스작성하기</Link>
                  </Menu.Item>
                  <Menu.Item key="menu-11">
                    <Link to="/admin/video">강의작성(동영상)</Link>
                  </Menu.Item>
                  <Menu.Item key="menu-12">
                    <Link to="/admin/techList">태크등록</Link>
                  </Menu.Item>
                  <Menu.Item key="menu-13">
                    <Link to="/admin/pay/list">결제리스트</Link>
                  </Menu.Item>
                  {/* <Menu.Item key="menu-14">
                    <Link to="/video/1">1번강의</Link>
                  </Menu.Item> */}
                </>
              )}

              {principal ? (
                <>
                  <Menu.Item className="header_right" key="menu-6">
                    <Link to={`/dashboard/${principal.id}`}>
                      {principal.name}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="menu-7" onClick={logout}>
                    Logout
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item className="header_right" key="menu-6">
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                </>
              )}
            </Menu>
          </Col>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
        </Row>
      </Header>
    </>
  );
});

export default MyHeader;
