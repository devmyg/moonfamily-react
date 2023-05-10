import React from "react";
import { Avatar, Button, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { Link } from "react-router-dom";

export default function Menu() {
  const [cookies, setCookies] = useCookies();
  const history = useNavigate();

  const logOutHandler = () => {
    history("/");
    setCookies("token", "", { expires: new Date() });
    setCookies("user", "", { expires: new Date() });
  };

  return (
    <>
      <Space className="bar">
        <Space.Compact block>
          <Link to={"/"}>
            <Button>
              <HomeOutlined />
            </Button>
          </Link>
          <Link to={"/board"}>
            <Button>게시판</Button>
          </Link>
        </Space.Compact>

        <Space.Compact block>
          <Button>
            <Space size={5}>
              <Avatar
                size="small"
                src={
                  cookies.user && cookies.user.userProfile != null
                    ? `http://moonfamily.duckdns.org:8080/` + cookies.user.userProfile
                    : "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                }
                alt="avatar"
              />
              {cookies.user && cookies.user.userName} 님
            </Space>
          </Button>
          <Button danger onClick={() => logOutHandler()}>
            로그아웃
          </Button>
        </Space.Compact>
      </Space>
    </>
  );
}
