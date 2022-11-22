const BASE_URL = "http://localhost:5000/api";
export default function fetchXHR({ method, url, headers, request }) {
  return new Promise((resolve, reject) => {
    let defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    let headersData = { ...defaultHeaders, ...headers };

    let updatedBody = {};

    let xhr = new XMLHttpRequest({ mozSystem: true });
    xhr.open(method, `${BASE_URL}${url}`);

    headersData &&
      Object.keys(headersData).map((key) => {
        xhr.setRequestHeader(key, headersData[key]);
      });

    xhr.send(JSON.stringify(request));
    xhr.onload = () => {
      if (xhr.response) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function (e) {
      reject({
        responseDesc:
          "Your request cannot be processed now due to some technical issue. Please try again later.",
      });
    };
  });
}
