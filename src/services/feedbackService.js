import requestXHR from "./requestXHR";

export async function GiveFeedBackApi(req, token) {
  let httpData = {
    method: "POST",
    url: "/user/feedback",
    headers: { "x-access-token": token },
    request: req,
  };

  const data = await requestXHR(httpData);
  return data;
}
