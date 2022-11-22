import requestXHR from "./requestXHR";

export async function login(req) {
  let httpData = {
    method: "POST",
    url: "/user/login",
    headers: {},
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}
