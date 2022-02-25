const BASEURL = "https://c1iurxh7bg.execute-api.ap-south-1.amazonaws.com";
const LOGINURL =
  "https://afscme.auth.ap-south-1.amazoncognito.com/signup?client_id=624gpsqrqgbri06bjpv8n71ill&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/callback";

export default {
  BASEURL,
  LOGINURL,
  leadsAPI: "/leads",
  affiliationAPI: "/affiliations",
  fileUploadAPI: "/upload-files",
  postsAPI: "/posts",

  token: {
    id: "afscme-client-auth-token",
    access: "afscme-client-auth-token-access",
    refresh: "afscme-client-auth-token-refresh",
  },

  aws: {
    cognito: {
      client_id: "624gpsqrqgbri06bjpv8n71ill",
      response_type: "token",
      scope: "aws.cognito.signin.user.admin+email+openid+phone+profile",
      redirect_uri: "http://localhost:3000/callback",
    },
  },
};
