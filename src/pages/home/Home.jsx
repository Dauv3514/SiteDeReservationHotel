import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";

export const Home = () => {
  return (
    <div>
        <Navbar />
        <Header />
        <div className="homeContainer">
            <Featured />
            <h1 className="homeTitle">Nos Destinations</h1>
        </div>
    </div>
  )
}

export default Home;
