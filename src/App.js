import { Link } from "react-router-dom";
import Header from "./componets/Header";
import './styles/App.css';


function App() {
  return (
    <div>
    <Header />
    <div id="appContainer">
      <div id="homeTextContainer">
        <h1>Welcome to Thrifty Threads</h1>
        <h2>At Thrifty Threads, we believe that style and affordability can go 
          hand in hand. We're here to redefine your shopping experience by offering 
          a curated selection of high-quality, pre-loved items that won't break the bank.   
        </h2>
        <button id="shopNowBtn">
          <Link to="/Products" className="linkBtn">Shop Now</Link>
        </button>
      </div>
      <img id="homeImage" src="https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
    </div>
    </div>
  );
}

export default App;
