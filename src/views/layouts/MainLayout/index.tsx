import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import Board from "../../../components/Board";
import BoardDetail from "../../../components/BoardDetail";
import Chat from "../../../components/Chat";
import CreatePost from "../../../components/CreatePost";
import ProfileUpdate from "../../../components/ProfileUpdate";
import SearchList from "../../../components/SearchList/SearchList";
import UpdatePost from "../../../components/UpdatePost";
import Authentication from "../../Authentication";
import Home from "../../Home";
import Menu from "../../Menu";
import "./style.css";

export default function MainLayout() {
  const [userResponse, setUserResponse] = useState<string>("");
  const [cookies] = useCookies();

  const getUserResponse = async (token: string) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/auth/`, requestOption)
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
                  <Route path="/board/:boardNumber" element={<BoardDetail />} />
                  <Route path="/board/update/:boardNumber" element={<UpdatePost />} />
                  <Route path="/profile" element={<ProfileUpdate />} />
                  <Route path="/search/:searchValue" element={<SearchList />} />
                  <Route path="/chat" element={<Chat />} />
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
