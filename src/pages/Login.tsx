import config from "../config";

export default function LoginPage() {
  const url = config.LOGINURL;

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
