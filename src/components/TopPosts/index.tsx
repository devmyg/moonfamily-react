import { Card, Divider, List, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

export default function TopPosts() {
  const data = [
    {
      title: "게시글 제목 1",
      views: 120,
    },
    {
      title: "게시글 제목 2",
      views: 98,
    },
    {
      title: "게시글 제목 3",
      views: 64,
    },
  ];

  return (
    <Card title="HOT한 게시물" style={{ marginBottom: "24px" }}>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div>
                <a href="#">{item.title}</a>
              </div>
              <div>
                <EyeOutlined style={{ marginRight: "8px" }} />
                {item.views}
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
