import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  BarcodeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
  SlidersOutlined,
  EditOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const { Sider, Header, Content } = Layout;

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <EditOutlined />,
      label: "Logo",
      path: "/admin/logo",
      onClick: () => {
        navigate(`/admin/logo`);
      },
    },
    {
      key: "3",
      icon: <SlidersOutlined />,
      label: "Slider",
      path: "/",
      children: [
        {
          key: "4",
          label: "Slayt Listesi",
          path: "/admin/slides",
          onClick: () => {
            navigate(`/admin/slides`);
          },
        },
        {
          key: "5",
          label: "Yeni Slayt Oluştur",
          path: "/admin/slides/create",
          onClick: () => {
            navigate(`/admin/slides/create`);
          },
        },
      ],
    },
    {
      key: "6",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      path: "/",
      children: [
        {
          key: "7",
          label: "Kategori Listesi",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "8",
          label: "Yeni Kategori Oluştur",
          path: "/admin/categories/create",
          onClick: () => {
            navigate(`/admin/categories/create`);
          },
        },
      ],
    },
    {
      key: "9",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      path: "/",
      children: [
        {
          key: "10",
          label: "Ürün Listesi",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "11",
          label: "Yeni Ürün Oluştur",
          path: "/admin/products/create",
          onClick: () => {
            navigate(`/admin/products/create`);
          },
        },
      ],
    },
    {
      key: "12",
      icon: <BarcodeOutlined />,
      label: "Kuponlar",
      path: "/",
      children: [
        {
          key: "13",
          label: "Kupon Listesi",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "14",
          label: "Yeni Kupon Oluştur",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate(`/admin/coupons/create`);
          },
        },
      ],
    },
    {
      key: "15",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "16",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      path: "/admin/orders",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "17",
      icon: <ContactsOutlined />,
      label: "İletişim",
      path: "/admin/contact",
      onClick: () => {
        navigate(`/admin/contact`);
      },
    },
    {
      key: "18",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      path: "/",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.label;
        }
      }
    }
  };

  if (userRole === "admin") {
    return (
      <div className="admin-layout">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{ height: "100%" }}
              items={menuItems}
              defaultSelectedKeys={[getActiveKey()]}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>{getPageTitle()}</h2>
                <h2>Admin Paneli</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (window.location.href = "/");
  }
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};
