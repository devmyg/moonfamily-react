import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Pagination, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { clickBoard, searchList } from "../../apis";
import "./style.css";

interface User {
  userId: string;
  userName: string;
}

interface BoardItem {
  boardNumber: number;
  boardTitle: string;
  boardCommentCount: number;
  boardWriterId: User;
  boardWriteDate: string;
  boardClickCount: number;
  boardLikeCount: number;
}

const SearchList = () => {
  const { searchValue } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const history = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue) {
        const data = await searchList(searchValue, currentPage, cookies.token);
        if (data) {
          setList(data.boardList);
          setTotalPages(data.totalPages);
        }
      }
    };
    fetchData();
  }, [searchValue, currentPage]);

  const handleClickAddPost = () => {
    history("/createpost");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = async (record: BoardItem) => {
    await clickBoard(record.boardNumber);
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
      render: (text: string, record: BoardItem) => (
        <>
          <div>
            {text} [{record.boardCommentCount}]
          </div>
        </>
      ),
    },
    {
      title: "글쓴이",
      dataIndex: ["boardWriterId", "userName"],
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

export default SearchList;
