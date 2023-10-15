import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Header.css';
import shoppingBagImage from '../assets/shopping-bag.png';

const Header = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const renderCartCircle = cart && cart.length > 0 ? (
        <div id="circle">
            <p id="circleText">{cart.length}</p>
        </div>
    ) : null;

    return (
        <div id="headerContainer">
            <h1>Thrifty Threads</h1>
            <div id="headerBtns">
                <button id="homeBtn">
                    <Link to="/" className="linkBtn">Home</Link>
                </button>
                <button id="productsBtn">
                    <Link to="/products" className="linkBtn">Products</Link>
                </button>
                <button id="cartBtn">
                    <Link to="/cart" className="linkBtn">
                        <img id="bagBtn" src={shoppingBagImage} />
                        {renderCartCircle}
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Header;
