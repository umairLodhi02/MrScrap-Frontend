import requestXHR from "./requestXHR";

export async function getUsersApi(token) {
  let httpData = {
    method: "GET",
    url: `/admin/getusers`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}

export async function getComplainsApi(token) {
  let httpData = {
    method: "GET",
    url: `/admin/get-complains`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}

export async function getFeedbacksApi(token) {
  let httpData = {
    method: "GET",
    url: `/admin/get-feedbacks`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}
