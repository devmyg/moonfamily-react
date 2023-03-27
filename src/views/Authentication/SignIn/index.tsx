import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./style.css";
import { signInApi } from "../../../apis";
import MainLayout from "../../layouts/MainLayout";

interface Props {
  setAuthView: (authView: boolean) => void;
}

export default function SignIn(props: Props) {
  const [cookies, setCookies] = useCookies();

  const { user, setUser } = useUserStore();

  const { setAuthView } = props;

  const onFinish = async (values: any) => {
    const signInResponse = await signInApi(values);

    if (!signInResponse) {
      alert("로그인에 실패했습니다.");
      return;
    }

    if (!signInResponse.result) {
      alert("로그인에 실패했습니다.");
      return;
    }

    // alert(signInResponse.result);

    const { token, exprTime, user } = signInResponse.data;
    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + exprTime);

    setCookies("token", token, { expires });
    setUser(user);
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>자동 로그인</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <p>
            <Button type="primary" htmlType="submit" className="login-form-button">
              로그인
            </Button>
            계정이 존재하지 않으신가요?{" "}
            <a
              href="#"
              onClick={() => {
                setAuthView(true);
              }}
            >
              회원가입
            </a>
          </p>
        </Form.Item>
      </Form>
    </>
  );
}
