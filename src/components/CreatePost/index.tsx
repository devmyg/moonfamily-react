import { Button, Form, Input, message } from "antd";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { writeApi } from "../../apis";

function CreatePost() {
  const history = useNavigate();
  const [cookies] = useCookies();

  const onFinish = async (values: any) => {
    const token = cookies.token;
    const writeResponse = await writeApi(values, token);
    if (!writeResponse || !writeResponse.result) {
      message.error(writeResponse.message);
      return;
    }

    message.success("게시글이 작성되었습니다.");
    history("/board");
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("게시글 작성에 실패했습니다.");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>글 작성</h1>
      <Form
        name="create-post-form"
        initialValues={{ remember: true }}
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
          <Button type="primary" htmlType="submit" size="large">
            작성
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePost;
