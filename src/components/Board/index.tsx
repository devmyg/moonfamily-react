import { useEffect, useState } from "react";
import { Table, Row, Col, Pagination, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getList } from "../../apis";
import "./style.css";

const Board = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getList(currentPage);
      if (data) {
        setList(data.boardList);
        setTotalPages(data.totalPages);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleClickAddPost = () => {
    history("/createpost");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (record: any) => {
    history(`/board/${record.boardNumber}`);
  };

  const columns = [
    {
      title: "번호",
      dataIndex: "boardNumber",
      key: "boardNumber",
    },
    {
      title: "제목",
      dataIndex: "boardTitle",
      key: "boardTitle",
    },
    {
      title: "글쓴이",
      dataIndex: "boardWriterId",
      key: "boardWriterId",
    },
    {
      title: "작성일",
      dataIndex: "boardWriteDate",
      key: "boardWriteDate",
    },
    {
      title: "조회수",
      dataIndex: "boardClickCount",
      key: "boardClickCount",
    },
    {
      title: "추천수",
      dataIndex: "boardLikeCount",
      key: "boardLikeCount",
    },
  ];

  return (
    <>
      <div className="board-box">
        <Table
          columns={columns}
          dataSource={list}
          pagination={false}
          rowKey="boardNumber"
          scroll={{ x: true }}
          onRow={(record) => ({
            onClick: () => {
              handleRowClick(record);
            },
          })}
        />
        <Row justify="center" gutter={[0, 16]}>
          <Col xs={24} sm={12}>
            <Pagination current={currentPage} total={totalPages * 10} onChange={handlePageChange} />
          </Col>
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleClickAddPost}
              style={{ width: "100%" }}
            >
              새 글 작성
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Board;
