import { useState } from "react";
import { Button, Pagination, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Column } = Table;

const data = [
  {
    id: 1,
    title: "게시글 제목 1",
    author: "글쓴이 1",
    createdAt: "2022-04-09",
  },
  {
    id: 2,
    title: "게시글 제목 2",
    author: "글쓴이 2",
    createdAt: "2022-04-08",
  },
  {
    id: 3,
    title: "게시글 제목 3",
    author: "글쓴이 3",
    createdAt: "2022-04-07",
  },
  {
    id: 4,
    title: "게시글 제목 4",
    author: "글쓴이 4",
    createdAt: "2022-04-06",
  },
];

const Board = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const history = useNavigate();

  const handleClickAddPost = () => {
    history("/createpost");
  };

  function handleChangePagination(page: number, pageSize: number) {
    setCurrentPage(page);
    setPageSize(pageSize);
  }

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleClickAddPost}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "50px",
        }}
      >
        새 글 작성
      </Button>
      <Table dataSource={data} pagination={false}>
        <Column title="번호" dataIndex="id" key="id" />
        <Column title="제목" dataIndex="title" key="title" />
        <Column title="글쓴이" dataIndex="author" key="author" />
        <Column title="작성일" dataIndex="createdAt" key="createdAt" />
      </Table>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handleChangePagination}
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default Board;
