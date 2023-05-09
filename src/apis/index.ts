import axios from "axios";

export const signInApi = async (data: any) => {
  const response = await axios
    .post("http://moonfamily.duckdns.org:8080/api/auth/signIn", data)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const signUpApi = async (data: any) => {
  const response = await axios
    .post("http://moonfamily.duckdns.org:8080/api/auth/signUp", data)
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};

export const getList = async (page: number) => {
  const response = await axios
    .get(`http://moonfamily.duckdns.org:8080/api/board/list/${page - 1}?size=10`)
    .catch((error) => null);
  if (!response) return null;
  return response.data.data;
};

export const writeApi = async (data: any, token: string) => {
  const response = await axios
    .post("http://moonfamily.duckdns.org:8080/api/board/write", data, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .catch((error) => null);
  if (!response) return null;
  return response.data;
};
