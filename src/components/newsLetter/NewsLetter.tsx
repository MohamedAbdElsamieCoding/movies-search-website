import "./newsLetter.css";

const NewsLetter = () => {
  return (
    <section className="news_letter">
      <div className="article_form">
        <div className="article_text">
          <h2>Join the Auteur Circle</h2>
          <p>
            Weekly curated deep-dives into cinematography, narrative <br />{" "}
            structure, and the future of digital cinema.
          </p>
        </div>
        <div className="sub_form">
          <form action="subscribe" className="subscribe">
            <input type="email" placeholder="email@example.com" />
            <button className="sub_btn">Subscribe Now</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
