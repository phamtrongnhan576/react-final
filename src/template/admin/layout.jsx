import React from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme, Flex } from "antd";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const { Header, Content, Footer, Sider } = Layout;

const sidebarItems = [
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "User",
  },
  {
    key: "sub2",
    icon: <VideoCameraOutlined />,
    label: "Cinema",
    children: [
      { key: "1", label: "List Films" },
      { key: "2", label: "Add Film" },
    ],
  },
];

const avatarMenuItems = [{ key: "1", label: "Logout" }];

const LayoutAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ background: colorBgContainer }}
        width={200}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Flex justify="center" align="center" style={{ padding: "16px 0" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", marginRight: 8 }}
          />
          <span style={{ fontWeight: "bold" }}>CineVista Theater</span>
        </Flex>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
            justifyContent: "flex-end",
            padding: "0 24px",
          }}
        >
          <Dropdown
            menu={{ items: avatarMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{ width: 200 }}
          >
            <Avatar
              shape="circle"
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </Header>
        <Content
          style={{
            padding: "24px",
            overflow: "auto",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Design ©{new Date().getFullYear()} Created by Minh Nguyen
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
