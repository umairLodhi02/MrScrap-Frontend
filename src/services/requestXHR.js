import fetchXHR from "./httpServices";
export default async function requestXHR(httpRequest) {
  return await fetchXHR(httpRequest)
    .then((data) => {
      if (data.responseCode === 401) {
        setTimeout(() => {
          // window.location.href = 'app://1b766ac0-fd4f-44f8-9220-57ca39f2c023/index.html#/unauthorized';
        }, 1);

        return data;
      } else {
        return data;
      }
    })
    .catch(function (error) {
      return error;
    });
}
