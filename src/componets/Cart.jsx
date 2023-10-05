import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import CartContext from '../context/CartContext';

function CartData () {
    fetch('https://fakestoreapi.com/carts/user/2')
            .then(res=>res.json())
            //.then(json=>console.log(json))
    
    }
    CartData();

const Cart = () => {
    const [cart] = useContext(CartContext);
    console.log(cart)


    return(
        <div>
            <Header />
           Cart
        </div>
    )

};

export default Cart;