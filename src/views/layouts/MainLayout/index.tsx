import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUserStore } from "../../../stores";
import Authentication from "../../Authentication";
import Board from "../../Board";
import "./style.css";

export default function MainLayout() {
  const [boardResponse, setBoardResponse] = useState<string>("");
  const [cookies] = useCookies();
  const { user } = useUserStore();

  const getBoard = async (token: string) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get("http://moonfamily.duckdns.org:8080/api/board/", requestOption)
      .then((response) => {
        setBoardResponse(response.data);
      })
      .catch((error) => "");
  };

  useEffect(() => {
    const token = cookies.token;
    if (token) getBoard(token);
  }, [cookies.token]);

  return (
    <>
      <div className="content-background">
        <div className="main-layout">{boardResponse ? <Board /> : <Authentication />}</div>
      </div>
    </>
  );
}
