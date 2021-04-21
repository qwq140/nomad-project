import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const Slider = ({ collapsed, setCollapsed }) => {
  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="CourseTitle"></div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Sider;
