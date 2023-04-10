import React from "react";
import { Avatar, Button, Space } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../stores";

import "./style.css";
import { Link } from "react-router-dom";

export default function Menu() {
  const { user, removeUser } = useUserStore();
  const [cookies, setCookies] = useCookies();

  const logOutHandler = () => {
    setCookies("token", "", { expires: new Date() });
    removeUser();
  };

  const getUserData = () => {
    console.log(user);
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
          <Button
            onClick={() => {
              getUserData();
            }}
          >
            테스트
          </Button>
        </Space.Compact>

        <Space.Compact block>
          <Button>
            <Space size={5}>
              <Avatar
                size="small"
                src={
                  user.userProfile != null
                    ? user.userProfile
                    : "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                }
                alt="avatar"
              />
              {user != null && <>{user.userName}</>} 님
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
