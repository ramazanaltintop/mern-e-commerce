import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  console.log(dataSource);

  const columns = [
    {
      title: "Kategori Resmi",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc} alt="Category" style={{ width: 100 }} />
      ),
    },
    {
      title: "Kategori adı",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Bu kategoriyi silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Verileri getirme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Veri getirme hatası", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kategori başarılı bir şekilde silindi!...");
        fetchCategories();
      } else {
        message.error("Kategori silme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Kategori Silme hatası", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CategoryPage;
