import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import '../styles/Product.css';
import CartContext from '../context/CartContext';

const Products = () => {
  const [jsonData, setJsonData] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const addToCart = (product) => {
    const specificItem = cart.find(item => item.id === product.id);
  
    if (specificItem) {
      // Object with the specific id was found
      const prevQuantity = specificItem.quantity;
      const updatedCart = cart.map(item => {
        if (item.id === specificItem.id) {
          // Update the quantity of the specific item
          item.quantity = prevQuantity + product.quantity;
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Item already in the cart. Quantity increased.');
    } else {
      // Product doesn't exist in the cart, so add it with desired quantity
      const updatedCart = [...cart, { ...product, quantity: product.quantity }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Item added to the cart.');
    }
  
    console.log(product);
  };
  
  

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // Add a "quantity" property to each product
        const productsWithQuantity = data.map((product) => ({
          ...product,
          quantity: 1, // Set the initial quantity to 1 for each product
        }));
        setJsonData(productsWithQuantity);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const incrementQuantity = (index) => {
    const updatedData = [...jsonData];
    updatedData[index].quantity += 1;
    setJsonData(updatedData);
  };

  const decrementQuantity = (index) => {
    const updatedData = [...jsonData];
    if (updatedData[index].quantity > 1) {
      updatedData[index].quantity -= 1;
      setJsonData(updatedData);
    }
  };

  if (!jsonData) {
    return null;
  }

  return (
    <div>
      <Header />
      <h1>Products</h1>
      {jsonData.slice(0, 30).map((product, index) => (
        <div key={index} className="product">
          <img className="productImg" src={product.image} alt={`Product ${index}`} />
          <h2 className="productName">{product.title}</h2>
          <h3 className="productPrice">{product.price}</h3>
          <div id="quantityDiv">
            <button onClick={() => decrementQuantity(index)}>-</button>
            <span>{product.quantity}</span>
            <button onClick={() => incrementQuantity(index)}>+</button>
          </div>
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={() => addToCart({ ...product, quantity: product.quantity })} className="atcBtn">
            ADD TO CART
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
