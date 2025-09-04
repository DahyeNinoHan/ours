import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000000",
        zIndex: 9999,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <img
        src="/ours_logo_02.svg"
        alt="Ours Logo"
        className="w-[120vw] h-auto max-w-none max-h-none md:w-auto md:max-w-[60vw] md:max-h-[60vh]"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120vw",
          height: "auto"
        }}
        draggable={false}
      />
    </div>
  );
};

export default Landing;