import { Button, Popconfirm, Space, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SlidePage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Slayt Resmi",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc} alt="Avatar" style={{ width: 300 }} />
      ),
    },
    {
      title: "Slayt Adı",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Slayt Başlığı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slayt Alt Başlığı",
      dataIndex: "subTitle",
      key: "subTitle",
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/slides/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Slaytı Sil"
            description="Bu slaytı silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteSlide(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteSlide = async (slideId) => {
    try {
      const response = await fetch(`${apiUrl}/api/slides/${slideId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Slayt başarılı bir şekilde silindi!...");
        fetchSlides();
      } else {
        message.error("Slayt silme işlemi başarısız oldu!...");
      }
    } catch (error) {
      console.log("Slayt Silme hatası", error);
    }
  };

  const fetchSlides = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slides`);

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

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default SlidePage;
