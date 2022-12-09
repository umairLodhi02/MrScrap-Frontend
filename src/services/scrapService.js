import requestXHR from "./requestXHR";

export async function addScrapApi(req, token) {
  let httpData = {
    method: "POST",
    url: `/user/addscrap`,
    headers: {
      "x-access-token": token,
    },
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}

export async function updateScrapApi(req, token, scrapId) {
  let httpData = {
    method: "PUT",
    url: `/user/updatescrap/${scrapId}`,
    headers: {
      "x-access-token": token,
    },
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}
export async function deleteScrap(token, scrapId) {
  let httpData = {
    method: "DELETE",
    url: `/user/deletescrap/${scrapId}`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}
export async function getScraps(token) {
  let httpData = {
    method: "GET",
    url: `/user/getscraps`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}
export async function getScrapsByUserIdApi(token, userId) {
  let httpData = {
    method: "GET",
    url: `/user/getscrapsbyuserid/${userId}`,
    headers: {
      "x-access-token": token,
    },
    request: {},
  };

  const data = await requestXHR(httpData);
  return data;
}

export async function changeScrapStatusApi(req, token, scrapId) {
  let httpData = {
    method: "PUT",
    url: `/user/change-status/${scrapId}`,
    headers: {
      "x-access-token": token,
    },
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}
