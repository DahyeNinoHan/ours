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
          src="/ours_logo_02.gif"
          alt="Ours Logo"
          className="w-[100vw] h-[100vh] object-contain max-w-none max-h-none md:w-auto md:h-auto md:max-w-[60vw] md:max-h-[60vh] md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          style={{
            width: "100vw",
            height: "100vh"
          }}
          draggable={false}
      />
    </div>
  );
};

export default Landing;