import React from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme, Flex } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const { Header, Content, Footer, Sider } = Layout;

const sidebarItems = [
  {
    key: "film",
    icon: <VideoCameraOutlined />,
    label: "Film",
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: "User",
  },
];

const avatarMenuItems = [{ key: "logout", label: "Logout" }];

const LayoutAdmin = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClick = (e) => {
    navigate(`/admin/${e.key}`);
  };

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
          defaultSelectedKeys={["film"]}
          style={{ height: "100%" }}
          items={sidebarItems}
          onClick={handleClick}
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
