import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const signInApi = async (data: any) => {
  const response = await axios.post(`${apiUrl}/api/auth/signin`, data).catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const signUpApi = async (data: any) => {
  const response = await axios.post(`${apiUrl}/api/auth/signup`, data).catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getList = async (page: number, token: string) => {
  const response = await axios
    .get(`${apiUrl}/api/board/list?page=${page - 1}`, {
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
    .get(`${apiUrl}/api/board/search?value=${searchValue}&page=${page - 1}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data.data;
};

export const writeApi = async (data: any, token: string) => {
  const response = await axios
    .post(`${apiUrl}/api/board/write`, data, {
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
    .patch(`${apiUrl}/api/board/${boardNumber}`, data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getDetail = async (boardNumber: number) => {
  const response = await axios.get(`${apiUrl}/api/board/${boardNumber}`).catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getCommentList = async (boardNumber: number) => {
  const response = await axios.get(`${apiUrl}/api/board/${boardNumber}`).catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const deleteBoard = async (boardNumber: number, token: string) => {
  const response = await axios
    .delete(`${apiUrl}/api/board/${boardNumber}`, {
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
    .delete(`${apiUrl}/api/comment/${commentId}`, {
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
      `${apiUrl}/api/comment/${commentId}`,
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
    .put(`${apiUrl}/api/board/${boardNumber}/click`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const clickBoard = async (boardNumber: number) => {
  const response = await axios
    .put(`${apiUrl}/api/board/${boardNumber}/like`)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getTop3 = async () => {
  const response = await axios.get(`${apiUrl}/api/board/top3`).catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getPopularSearch = async () => {
  const response = await axios.get(`${apiUrl}/api/popular-search`).catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getComment = async (boardNumber: number) => {
  const response = await axios.get(`${apiUrl}/api/comment/${boardNumber}`).catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const writeComment = async (data: any, token: string) => {
  const response = await axios
    .post(`${apiUrl}/api/comment/write`, data, {
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
    .post(`${apiUrl}/api/user/upload-profile-picture`, data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};
