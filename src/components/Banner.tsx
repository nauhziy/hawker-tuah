import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="banner__overlay"></div>
      <div className="banner__info">
        <h1>Hawker Tuah</h1> {/* Updated heading */}
        <h5>Discover Singapore's hawker centers</h5>
      </div>
    </div>
  );
}

export default Banner;
