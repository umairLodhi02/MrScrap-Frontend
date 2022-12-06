import requestXHR from "./requestXHR";

export async function GiveComplainApi(req, token) {
  let httpData = {
    method: "POST",
    url: "/user/add-complain",
    headers: { "x-access-token": token },
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}

export async function fetchComplainsByUserIdApi(token) {
  let httpData = {
    method: "GET",
    url: `/user/get-complains-user`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}

export async function deleteComplainUserApi(token, complainId) {
  let httpData = {
    method: "DELETE",
    url: `/user/delete-complain/${complainId}`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}
