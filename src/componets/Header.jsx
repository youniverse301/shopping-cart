import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
    const { character } = useParams();

    return(
        <div>
            <h1>This will be the header!</h1>
            <button>
                <Link to="/">Home</Link>
            </button>
            <button>
                <Link to="/products">Products</Link>
            </button>
            <button>
                <Link to="/about">About</Link>
            </button>
            <button>
                <Link to="/cart">Cart</Link>
            </button>
            
        </div>
    )

};

export default Header;