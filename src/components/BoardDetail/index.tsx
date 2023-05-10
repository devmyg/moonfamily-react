import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Grid } from "antd";
import { getDetail, deleteBoard } from "../../apis";
import CommentList from "../CommentList";
import { useCookies } from "react-cookie";
import "./style.css";

const { useBreakpoint } = Grid;

const BoardDetail = () => {
  const { boardNumber } = useParams<{ boardNumber: string }>();
  const [board, setBoard] = useState({
    boardNumber: 0,
    boardTitle: "",
    boardContent: "",
    boardImage: "",
    boardWriterId: "",
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
        if (data) {
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
    history(`/board/${boardNumber}/edit`);
  };

  const handleClickDelete = async () => {
    if (boardNumber) {
      const token = cookies.token;
      const result = await deleteBoard(parseInt(boardNumber), token);
      if (result) {
        history("/board");
      }
    }
  };

  if (!board.boardTitle) {
    return <div>로딩 중...</div>;
  }

  const isAuthor = board.boardWriterId === cookies.userId;

  return (
    <Row gutter={[0, 16]}>
      <Col xs={24} lg={16}>
        <div className="board-detail-box">
          <div className="board-detail-title">{board.boardTitle}</div>
          <div className="board-detail-writer">
            작성자: {board.boardWriterId} | 작성일: {board.boardWriteDate}
          </div>
          <div className="board-detail-content">{board.boardContent}</div>
          <Row justify="center" gutter={[0, 16]}>
            <Col xs={24} sm={24}>
              <Button type="primary" onClick={handleClickBack} style={{ width: "100%" }}>
                목록으로 돌아가기
              </Button>
            </Col>
            {isAuthor && (
              <>
                <Col xs={24} sm={12}>
                  <Button onClick={handleClickEdit} style={{ width: "100%" }}>
                    수정하기
                  </Button>
                </Col>
                <Col xs={24} sm={12}>
                  <Button onClick={handleClickDelete} style={{ width: "100%" }}>
                    삭제하기
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <CommentList boardNumber={board.boardNumber} />
      </Col>
    </Row>
  );
};

export default BoardDetail;
