import config from "../config";
export default function Callback() {
  // get jwt token from url
  const url = window.location.href;

  // extract id_token, access token and bearer from url
  const idToken = url.split("#")[1].split("&")[0].split("=")[1];
  const accessToken = url.split("#")[1].split("&")[1].split("=")[1];
  const bearer = url.split("#")[1].split("&")[2].split("=")[1];

  console.log({ idToken, accessToken, bearer });

  // set jwt token to local storage
  localStorage.setItem(config.token.id, idToken);
  localStorage.setItem(config.token.access, accessToken);

  window.location.href = "/admin";

  return <></>;
}
