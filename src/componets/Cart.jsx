import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import '../styles/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log(localStorage)
    }
  };

  const removeProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  

  const calculateProductTotal = (product) => {
    const total = product.price * product.quantity;
    return total.toFixed(2); 
  };
  
  const calculateCartTotal = () => {
    let total = 0;
  
    for (const product of cart) {
      total += product.price * product.quantity;
    }
  
    return total.toFixed(2);
  };
  
  const clearCart = () => {
    alert('Order Confirmed')
    setCart([]);
    localStorage.removeItem('cart');
  };


  return (
    <div>
      <Header />
      <h1 id='cartTitle'>Your Cart</h1>
      <div id='cartContainer'>
        <div id='cartLabelContainer'>
            <p id='itemTitle'>ITEM</p>
            <p id='priceTitle'>PRICE</p>
            <p id='quantityTitle'>QUANTITY</p>
            <p id='totalTitle'>TOTAL</p>
            <div id='cartLine'></div>
        </div>
        {cart.map((product, index) => (
            <div key={index} className="cartProduct">
                <img className="cartProductImg" src={product.image} alt={`Product ${index}`} />
                <h2 className="cartProductName">{product.title}</h2>
                <div className="cartProductPrice">${product.price}</div>
                <div id="quantityDiv">
                    <button onClick={() => decrementQuantity(index)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => incrementQuantity(index)}>+</button>
                </div>
                <div className="productTotal">${calculateProductTotal(product)}</div>
                <button onClick={() => removeProduct(index)} id='removeItem'>Remove</button>
                <div id='cartLine'></div>
            </div>
        ))}
        <div id='subTotalContainer'>
            <p>Subtotal: ${calculateCartTotal()}</p>
            <Link to="/" className="linkBtn" onClick={() => clearCart()} id='checkoutBtn'>Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
