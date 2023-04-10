import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import { useUserStore } from "../../../stores";
import Authentication from "../../Authentication";
import Board from "../../../components/Board";
import Home from "../../Home";
import Menu from "../../Menu";
import "./style.css";
import CreatePost from "../../../components/CreatePost";

export default function MainLayout() {
  const [userResponse, setUserResponse] = useState<string>("");
  const [cookies] = useCookies();
  const { user, setUser } = useUserStore();

  const getUserResponse = async (token: string) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get("http://moonfamily.duckdns.org:8080/api/auth/", requestOption)
      .then((response) => {
        setUserResponse(response.data);
      })
      .catch((error) => "");
  };

  useEffect(() => {
    const token = cookies.token;
    if (token) getUserResponse(token);
    else {
      setUserResponse("");
    }
  }, [cookies.token]);

  return (
    <>
      <div className="content-background">
        <div className="main-layout">
          {userResponse ? (
            <>
              <Menu />
              <div className="content-box">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/board" element={<Board />} />
                  <Route path="/createpost" element={<CreatePost />} />
                </Routes>
              </div>
            </>
          ) : (
            <Authentication />
          )}
        </div>
      </div>
    </>
  );
}
