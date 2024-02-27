import "./Loader.css";

export const Loader = () => {
  return (
    <div className="wrapper">
      <div className="lds_ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
