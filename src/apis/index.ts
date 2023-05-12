import axios from "axios";

export const signInApi = async (data: any) => {
  const response = await axios
    .post(`http://moonfamily.duckdns.org:8080/api/auth/signIn`, data)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const signUpApi = async (data: any) => {
  const response = await axios
    .post(`http://moonfamily.duckdns.org:8080/api/auth/signUp`, data)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getList = async (page: number, token: string) => {
  const response = await axios
    .get(`http://moonfamily.duckdns.org:8080/api/board/list?page=${page - 1}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data.data;
};

export const searchList = async (searchValue: string, page: number, token: string) => {
  const response = await axios
    .get(
      `http://moonfamily.duckdns.org:8080/api/board/search?value=${searchValue}&page=${page - 1}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )
    .catch((error) => null);
  if (!response) return null;
  return response.data.data;
};

export const writeApi = async (data: any, token: string) => {
  const response = await axios
    .post(`http://moonfamily.duckdns.org:8080/api/board/write`, data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const updateApi = async (boardNumber: number, data: any, token: string) => {
  const response = await axios
    .patch(`http://moonfamily.duckdns.org:8080/api/board/${boardNumber}`, data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getDetail = async (boardNumber: number) => {
  const response = await axios
    .get(`http://moonfamily.duckdns.org:8080/api/board/${boardNumber}`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getCommentList = async (boardNumber: number) => {
  const response = await axios
    .get(`http://moonfamily.duckdns.org:8080/api/board/${boardNumber}`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const deleteBoard = async (boardNumber: number, token: string) => {
  const response = await axios
    .delete(`http://moonfamily.duckdns.org:8080/api/board/${boardNumber}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const deleteComment = async (commentId: number, token: string) => {
  const response = await axios
    .delete(`http://moonfamily.duckdns.org:8080/api/comment/${commentId}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const updateComment = async (commentId: number, commentContent: string, token: string) => {
  const response = await axios
    .patch(
      `http://moonfamily.duckdns.org:8080/api/comment/${commentId}`,
      { commentContent: commentContent },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const clickBoardLike = async (boardNumber: number) => {
  const response = await axios
    .put(`http://moonfamily.duckdns.org:8080/api/board/${boardNumber}/click`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const clickBoard = async (boardNumber: number) => {
  const response = await axios
    .put(`http://moonfamily.duckdns.org:8080/api/board/${boardNumber}/like`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getTop3 = async () => {
  const response = await axios
    .get(`http://moonfamily.duckdns.org:8080/api/board/top3`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getPopularSearch = async () => {
  const response = await axios
    .get(`http://moonfamily.duckdns.org:8080/api/popularSearch`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getComment = async (boardNumber: number) => {
  const response = await axios
    .get(`http://moonfamily.duckdns.org:8080/api/comment/${boardNumber}`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const writeComment = async (data: any, token: string) => {
  const response = await axios
    .post(`http://moonfamily.duckdns.org:8080/api/comment/write`, data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const uploadProfile = async (data: FormData, token: string) => {
  const response = await axios
    .post(`http://moonfamily.duckdns.org:8080/api/user/uploadProfilePicture`, data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};
