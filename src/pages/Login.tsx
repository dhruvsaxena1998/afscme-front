import config from "../config";

export default function LoginPage() {
  const url =
    "https://afscme.auth.ap-south-1.amazoncognito.com/signup?client_id=624gpsqrqgbri06bjpv8n71ill&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/callback";

  return (
    <div className="flex justify-center items-center">
      <a
        className="p-4 w-80 rounded-lg bg-emerald-400 text-white tracking-wider font-bold text-center"
        href={url}
      >
        Login
      </a>
    </div>
  );
}
