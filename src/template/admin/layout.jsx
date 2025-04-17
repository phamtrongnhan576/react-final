import React, { useState, useEffect } from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme, Flex } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { TOKEN, USER_LOGIN } from "../../utils/settings";

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

const avatarMenuItems = [
  { key: "home", label: "Trang chủ" },
  { key: "logout", label: "Logout" },
];

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["film"]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const user = localStorage.getItem(USER_LOGIN);
    setIsLoggedIn(!!(token && user));

    const path = location.pathname;
    const key = path.split("/")[2];
    const validKeys = sidebarItems.map((item) => item.key);
    setSelectedKeys(validKeys.includes(key) ? [key] : ["film"]);
  }, [location]);

  const handleClick = (e) => {
    navigate(`/admin/${e.key}`);
  };

  const handleAvatarMenuClick = (e) => {
    if (e.key === "home") {
      navigate("/");
    } else if (e.key === "logout") {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER_LOGIN);
      navigate("/");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ background: colorBgContainer }}
        width={200}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Flex justify="center" align="center" style={{ padding: "16px 0px" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "50px",
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            MoviesHand
          </span>
        </Flex>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
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
          {isLoggedIn && (
            <Dropdown
              menu={{
                items: avatarMenuItems,
                onClick: handleAvatarMenuClick,
              }}
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
          )}
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
