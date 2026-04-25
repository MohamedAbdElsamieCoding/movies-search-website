import { useNavigate } from "react-router-dom";

const HeaderText = () => {
  const navigate = useNavigate();
  return (
    <div className="header_text">
      <h1>
        Curating the <span>Atmospheric</span>.
      </h1>
      <p>
        The Digital Auteur experience. Explore our editorial database of
        cinematic achievements and independent gems.
      </p>
      <div className="btns_activity">
        <div className="btns">
          <button
            className="my_library_btn"
            onClick={() => navigate("/favorites")}
          >
            My Library
          </button>
        </div>
        <div className="badge">
          <span className="pulse_dot"></span>
          <p>PREMIUM ACCESS ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderText;
