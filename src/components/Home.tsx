import "./Home.css";
import Banner from "./Banner";
import CardGrid from "./CardGrid";

// ES7 snippets to do 'rfce'

function Home() {
  return (
    <div className="home">
      <Banner />
      <CardGrid />
    </div>
  );
}

export default Home;
