import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const history = useNavigate();

  const onFinish = (values: any) => {
    // 게시글 작성 처리 로직
    console.log(values);
    message.success("게시글이 작성되었습니다.");

    // 게시글 목록 페이지로 이동
    history("/board");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("게시글 작성에 실패했습니다.");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>글 작성</h1>
      <Form
        name="create-post-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "제목을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="내용"
          name="content"
          rules={[{ required: true, message: "내용을 입력해주세요." }]}
        >
          <Input.TextArea rows={10} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            작성
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatePost;
