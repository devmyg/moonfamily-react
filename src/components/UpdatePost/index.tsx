import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { getDetail, updateApi } from "../../apis";

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

function UpdatePost() {
  const { boardNumber } = useParams();
  const history = useNavigate();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
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

  useEffect(() => {
    const fetchPost = async () => {
      if (boardNumber) {
        const response = await getDetail(parseInt(boardNumber));
        if (response && response.result) {
          setBoard(response.data);
          form.setFieldsValue({
            boardTitle: response.data.boardTitle,
            boardContent: response.data.boardContent,
          });
        }
      }
    };
    fetchPost();
  }, [boardNumber, cookies, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    if (boardNumber) {
      const token = cookies.token;
      const writeResponse = await updateApi(parseInt(boardNumber), values, token);
      if (!writeResponse || !writeResponse.result) {
        setLoading(false);
        message.error(writeResponse.message);
        return;
      }
      setLoading(false);
      message.success("게시글이 수정되었습니다.");
      history("/board");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("게시글 수정에 실패했습니다.");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>글 수정</h1>
      <Form
        form={form}
        initialValues={{
          boardTitle: board.boardTitle,
          boardContent: board.boardContent,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="제목"
          name="boardTitle"
          rules={[{ required: true, message: "제목을 입력해주세요." }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="내용"
          name="boardContent"
          rules={[{ required: true, message: "내용을 입력해주세요." }]}
        >
          <Input.TextArea rows={10} />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            수정
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UpdatePost;
