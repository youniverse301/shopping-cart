import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import '../styles/Product.css';
import jsonData from '../assets/products.json';
import shoppingCartImage from '../assets/shopping-cart.png';

const Products = () => {
  const [productData, setProductData] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  console.log(productData)

  const addToCart = (product) => {
    const specificItem = cart.find(item => item.id === product.id);
  
    if (specificItem) {
      const prevQuantity = specificItem.quantity;
      const updatedCart = cart.map(item => {
        if (item.id === specificItem.id) {
          item.quantity = prevQuantity + product.quantity;
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Item already in the cart. Quantity increased.');
    } else {
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
        setProductData(jsonData)
        const productsWithQuantity = jsonData.map((product) => ({
          ...product,
          quantity: 1,
        }));
        setProductData(productsWithQuantity);
    };

    fetchData();
  }, []);

  const incrementQuantity = (index) => {
    const updatedData = [...productData];
    updatedData[index].quantity += 1;
    setProductData(updatedData);
  };

  const decrementQuantity = (index) => {
    const updatedData = [...productData];
    if (updatedData[index].quantity > 1) {
      updatedData[index].quantity -= 1;
      setProductData(updatedData);
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? productData
    : productData.filter(product => product.category === selectedCategory);

  if (!productData) {
    return null;
  }

  return (
    <div>
      <Header />
      <div id="main">
        <div id="productsHeader">
          <h1>Shop</h1>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">Sort By: All Products</option>
            <option value="men's clothing">Sort By: Men's Clothing</option>
            <option value="jewelry">Sort By: Jewelry</option>
            <option value="electronics">Sort By: Electronics</option>
            <option value="women's clothing">Sort By: Women's clothing</option>
          </select>
        </div>
        <div id="productsContainer">
          {filteredProducts.slice(0, 30).map((product, index) => (

          <div key={index} className="product">

          <img className="productImg" src={product.image} alt={`Product ${index}`} />
          <h2 className="productName">{product.title}</h2>
          <h3 className="productPrice"> ${product.price}</h3>
          <div id="quantityDiv">
            <button onClick={() => decrementQuantity(index)}>-</button>
            <span>{product.quantity}</span>
            <button onClick={() => incrementQuantity(index)}>+</button>
          </div>

          <button onClick={() => addToCart({ ...product, quantity: product.quantity })} className="atcBtn">
          <img src={shoppingCartImage} alt="Shopping Cart" />
            ADD TO CART
          </button>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
};

export default Products;

