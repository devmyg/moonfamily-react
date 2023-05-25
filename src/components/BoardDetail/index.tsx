import { LikeOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Grid, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { clickBoardLike, deleteBoard, getDetail } from "../../apis";
import CommentList from "../CommentList";
import "./style.css";

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface User {
  userId: string;
  userName: string;
  userProfile: string;
}

interface Board {
  boardNumber: number;
  boardTitle: string;
  boardContent: string;
  boardImage: string;
  user: User;
  boardWriteDate: string;
  boardClickCount: number;
  boardLikeCount: number;
  boardCommentCount: number;
}

const BoardDetail = () => {
  const { boardNumber } = useParams<{ boardNumber: string }>();
  const [board, setBoard] = useState<Board>({
    boardNumber: 0,
    boardTitle: "",
    boardContent: "",
    boardImage: "",
    user: { userId: "", userName: "", userProfile: "" },
    boardWriteDate: "",
    boardClickCount: 0,
    boardLikeCount: 0,
    boardCommentCount: 0,
  });
  const history = useNavigate();
  const screens = useBreakpoint();
  const [cookies] = useCookies();

  useEffect(() => {
    const fetchData = async () => {
      if (boardNumber) {
        const data = await getDetail(parseInt(boardNumber));
        if (data.result) {
          setBoard(data.data);
        }
      }
    };
    fetchData();
  }, [boardNumber]);

  const handleClickBack = () => {
    history(-1);
  };

  const handleClickEdit = () => {
    history(`/board/update/${boardNumber}`);
  };

  const handleLike = async () => {
    if (boardNumber) {
      const result = await clickBoardLike(parseInt(boardNumber));
      if (result.result) {
        setBoard((prevBoard) => ({ ...prevBoard, boardLikeCount: prevBoard.boardLikeCount + 1 }));
      }
    }
  };

  const handleClickDelete = async () => {
    if (boardNumber) {
      const token = cookies.token;
      const result = await deleteBoard(parseInt(boardNumber), token);
      if (result.result) {
        history("/board");
      }
    }
  };

  if (!board.boardTitle) {
    return <div>로딩 중...</div>;
  }

  const isAuthor = board.user.userId === cookies.user.userId;

  return (
    <Row gutter={[0, 16]}>
      <Col xs={24} lg={16}>
        <div className="board-detail-box">
          <div className="board-detail-info">
            <div className="board-detail-title">{board.boardTitle}</div>
            <Divider />
            <div className="board-detail-writer">
              <Avatar
                src={
                  board.user && board.user.userProfile
                    ? `${process.env.REACT_APP_API_URL}/${board.user.userProfile}`
                    : `https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg`
                }
                size={32}
                style={{ marginRight: 12 }}
              />
              <div className="board-detail-writer-text">
                <Text strong>{board.user.userName}</Text>
                <Text
                  type="secondary"
                  style={{
                    fontSize: "12px",
                    marginLeft: 5,
                  }}
                >
                  {board.boardWriteDate}
                </Text>
              </div>
            </div>
            <div className="board-detail-content">{board.boardContent}</div>
            <div className="board-detail-buttons">
              <Button onClick={handleLike} icon={<LikeOutlined />}>
                추천 (<span className="board-detail-like-count">{board.boardLikeCount})</span>
              </Button>
              <div className="board-detail-back-button">
                <Button type="primary" onClick={handleClickBack}>
                  목록으로 돌아가기
                </Button>
              </div>
              {isAuthor && (
                <div className="board-detail-edit-delete-buttons">
                  <Button onClick={handleClickEdit}>수정하기</Button>
                  <Button onClick={handleClickDelete}>삭제하기</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <CommentList boardNumber={board.boardNumber} />
      </Col>
    </Row>
  );
};

export default BoardDetail;
