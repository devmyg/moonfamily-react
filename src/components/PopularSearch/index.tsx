import { Card, Divider, List, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

export default function PopularSearch() {
  const data = [
    {
      keyword: "React",
      count: 160,
    },
    {
      keyword: "TypeScript",
      count: 98,
    },
    {
      keyword: "Node.js",
      count: 76,
    },
  ];

  return (
    <Card title="자주 검색한 내용" style={{ marginBottom: "24px" }}>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div>
                <a href="#">{item.keyword}</a>
              </div>
              <div>
                <Tag>{item.count}</Tag>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
