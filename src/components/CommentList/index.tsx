import { useState, useEffect } from "react";
import { List, Form, Input, Button } from "antd";
//import { getComments } from "../../apis";
import "./style.css";

type Comment = {
  commentId: number;
  boardNumber: number;
  userId: string;
  commentContent: string;
  commentWriteDate: string;
};

type CommentListProps = {
  boardNumber: number;
};

const CommentList = ({ boardNumber }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       const data = await getComments(boardNumber);
  //       if (data) {
  //         setComments(data.data);
  //       }
  //       setLoading(false);
  //     };
  //     fetchData();
  //   }, [boardNumber]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <List
        className="comment-list"
        header={<div>댓글 {comments.length}개</div>}
        loading={loading}
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={<div className="empty-avatar" />}
              title={comment.userId}
              description={comment.commentWriteDate}
            />
            <div>{comment.commentContent}</div>
          </List.Item>
        )}
      />
      <CommentForm onFinish={onFinish} />
    </>
  );
};

type CommentFormProps = {
  onFinish: (values: any) => void;
};

const CommentForm = ({ onFinish }: CommentFormProps) => {
  return (
    <Form onFinish={onFinish} className="comment-form">
      <Form.Item name="commentContent" rules={[{ required: true, message: "댓글을 입력하세요." }]}>
        <Input.TextArea placeholder="댓글을 입력하세요." rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          댓글 작성
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentList;
