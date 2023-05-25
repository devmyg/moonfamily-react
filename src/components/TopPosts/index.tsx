import { EyeOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTop3 } from "../../apis";

type Post = {
  boardNumber: number;
  boardTitle: string;
  boardClickCount: number;
};

export default function TopPosts() {
  const [list, setList] = useState<Post[]>([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTop3();
      if (result && result.result) {
        setList(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Card title="HOT한 게시물" style={{ marginBottom: "24px" }}>
      <List
        dataSource={list}
        renderItem={(item) => (
          <List.Item onClick={() => history(`/board/${item.boardNumber}`)}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div>{item.boardTitle}</div>
              <div>
                <EyeOutlined style={{ marginRight: "8px" }} />
                {item.boardClickCount}
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
