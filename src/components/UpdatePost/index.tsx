import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { writeApi, updateApi } from "../../apis";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function UpdatePost() {
  const { boardNumber } = useParams();
  const history = useNavigate();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const token = cookies.token;
      const response = await updateApi(boardNumber, token);
      if (response && response.result) {
        setPost(response.data);
      }
    };
    fetchPost();
  }, [boardNumber, cookies]);

  const onFinish = async (values: any) => {
    setLoading(true);
    const token = cookies.token;
    const writeResponse = await writeApi(values, token);
    if (!writeResponse) {
      setLoading(false);
      message.error("글 수정에 실패했습니다.");
      return;
    }

    if (!writeResponse.result) {
      setLoading(false);
      message.error("글 수정에 실패했습니다.");
      return;
    }

    setLoading(false);
    message.success("게시글이 수정되었습니다.");
    history("/board");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("게시글 수정에 실패했습니다.");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>글 수정</h1>
      <Form
        name="update-post-form"
        initialValues={post}
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
