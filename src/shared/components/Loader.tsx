import "./Loader.css";

export default function Loader() {
  return (
    <div className="lds-wrapper">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
