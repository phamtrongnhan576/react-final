import React from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import logo from "../../assets/logo.jpg";
import { Flex } from "antd";
import { Outlet } from "react-router-dom";

const sidebarItems = [UserOutlined, VideoCameraOutlined].map(
  (IconComponent, index) => {
    const menuKey = String(index + 1);
    const submenuLength = index === 0 ? 0 : 2;
    const menuLabel = index === 0 ? "User" : "Cinema";

    const menuItem = {
      key: `sub${menuKey}`,
      icon: React.createElement(IconComponent),
      label: menuLabel,
    };

    if (submenuLength > 0) {
      menuItem.children = Array.from({ length: submenuLength }).map(
        (_, subIndex) => {
          const submenuKey = index * 2 + subIndex + 1;
          return {
            key: submenuKey,
            label: subIndex === 0 ? "List Films" : "Add Film",
          };
        }
      );
    }

    return menuItem;
  }
);

const avatarMenuItems = [{ key: "1", label: "Logout" }];

const LayoutAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderDropdown = (menu) => <div style={{ width: "200px" }}>{menu}</div>;

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
    >
      <Sider
        style={{
          background: colorBgContainer,
          overflow: "auto",
        }}
        width={200}
      >
        <Flex
          justify="center"
          gap={4}
          align="center"
          style={{ padding: "16px 0" }}
        >
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
          <h1>CineVista Theater</h1>
        </Flex>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "calc(100% - 80px)" }}
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "white",
            justifyContent: "flex-end",
            padding: "0 24px",
            height: "64px",
            lineHeight: "64px",
          }}
        >
          <Dropdown
            menu={{ items: avatarMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
            dropdownRender={renderDropdown}
          >
            <Avatar
              shape="circle"
              icon={<UserOutlined />}
              className="cursor-pointer"
            />
          </Dropdown>
        </Header>
        <Content
          style={{
            padding: "24px",
            flex: 1,
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
