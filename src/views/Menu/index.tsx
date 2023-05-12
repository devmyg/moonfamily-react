import { HomeOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import "./style.css";

export default function Menu() {
  const [cookies, setCookies] = useCookies();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const history = useNavigate();

  const logOutHandler = () => {
    history("/");
    setCookies("token", "", { expires: new Date() });
    setCookies("user", "", { expires: new Date() });
  };

  const handleSearch = () => {
    history(`/search/${searchValue}`);
    setSearchValue("");
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
          <Input.Search
            placeholder="검색어를 입력하세요"
            onSearch={handleSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Space.Compact>

        <Space.Compact block>
          <Link to={"/profile"}>
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
          </Link>
          <Button danger onClick={() => logOutHandler()}>
            로그아웃
          </Button>
        </Space.Compact>
      </Space>
    </>
  );
}
