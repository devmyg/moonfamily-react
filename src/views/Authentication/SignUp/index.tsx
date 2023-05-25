import { Button, Form, Input, message } from "antd";
import "./style.css";
import React from "react";
import { signUpApi } from "../../../apis";

interface Props {
  setAuthView: (authView: boolean) => void;
}

export default function SignUp(props: Props) {
  const [form] = Form.useForm();

  const { setAuthView } = props;

  const onFinish = async (values: any) => {
    const signUpResponse = await signUpApi(values);
    if (!signUpResponse || !signUpResponse.result) {
      message.error(signUpResponse.message);
      return;
    }
    message.success("회원가입 성공");
    setAuthView(false);
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ prefix: "82" }}
      style={{ maxWidth: 600 }}
      layout="horizontal"
      className="register-form"
    >
      <Form.Item>
        <div className="logo-title">
          <img className="logo" src="logo512.png" alt="logo" />
          <h1>문씨네</h1>
        </div>
      </Form.Item>
      <Form.Item
        name="userId"
        label="아이디"
        rules={[
          {
            required: true,
            message: "사용할 아이디를 입력해 주세요!",
          },
        ]}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="userPassword"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: "사용할 비밀번호를 입력해 주세요!",
          },
        ]}
        hasFeedback
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="userPasswordCheck"
        label="비밀번호 확인"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "사용할 비밀번호를 입력해 주세요!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("userPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("비밀번호가 일치하지 않습니다!"));
            },
          }),
        ]}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="userName"
        label="이름"
        rules={[{ required: true, message: "본인의 이름을 입력해 주세요!", whitespace: true }]}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="userPhoneNumber"
        label="연락처"
        rules={[{ required: true, message: "사용하는 휴대폰 번호를 입력해 주세요!" }]}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <p className="register-bottom">
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
          <br />
          이미 계정이 있으신가요?{" "}
          <span
            onClick={() => {
              setAuthView(false);
            }}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            로그인
          </span>
        </p>
      </Form.Item>
    </Form>
  );
}
