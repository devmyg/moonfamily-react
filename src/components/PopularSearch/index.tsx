import { SearchOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import React, { useEffect, useState } from "react";
import { getPopularSearch } from "../../apis";

type Post = {
  popularTerm: string;
  popularSearchCount: number;
};

export default function PopularSearch() {
  const [list, setList] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPopularSearch();
      if (result && result.result) {
        setList(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Card title="자주 검색한 내용" style={{ marginBottom: "24px" }}>
      <List
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div>{item.popularTerm}</div>
              <div>
                <SearchOutlined style={{ marginRight: "8px" }} />
                {item.popularSearchCount}
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
