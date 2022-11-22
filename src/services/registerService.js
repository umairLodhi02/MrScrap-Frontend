import requestXHR from "./requestXHR";

export async function register(req) {
  let httpData = {
    method: "POST",
    url: "/user/register",
    headers: {},
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}

export async function updateProfile(req, token, userId) {
  let httpData = {
    method: "PUT",
    url: `/user/update/${userId}`,
    headers: { "x-access-token": token },
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}
