const HeaderText = () => {
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
          <button className="all_cinema_btn">All Cinema</button>
          <button className="my_library_btn">My Library</button>
        </div>
        <div className="badge">
          <span></span>
          <p>PREMIUM ACCESS ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderText;
