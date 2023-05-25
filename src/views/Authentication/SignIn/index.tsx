import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useCookies } from "react-cookie";
import { signInApi } from "../../../apis";
import "./style.css";

interface Props {
  setAuthView: (authView: boolean) => void;
}

export default function SignIn(props: Props) {
  const [, setCookies] = useCookies();

  const { setAuthView } = props;

  const onFinish = async (values: any) => {
    const signInResponse = await signInApi(values);

    if (!signInResponse || !signInResponse.result) {
      message.error(signInResponse.message);
      return;
    }

    const { token, exprTime, user } = signInResponse.data;
    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + exprTime);

    setCookies("token", token, { expires });
    setCookies("user", user, { expires });
  };

  return (
    <>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item>
          <div className="logo-title">
            <img className="logo" src="logo512.png" alt="logo" />
            <h1>문씨네</h1>
          </div>
        </Form.Item>
        <Form.Item name="userId" rules={[{ required: true, message: "아이디를 입력해 주세요!" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" />
        </Form.Item>
        <Form.Item
          name="userPassword"
          rules={[{ required: true, message: "비밀번호를 입력해 주세요!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>
        <Form.Item>
          <p>
            <Button type="primary" htmlType="submit" className="login-form-button">
              로그인
            </Button>{" "}
            계정이 존재하지 않으신가요?{" "}
            <span
              onClick={() => {
                setAuthView(true);
              }}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              회원가입
            </span>
          </p>
        </Form.Item>
      </Form>
    </>
  );
}
