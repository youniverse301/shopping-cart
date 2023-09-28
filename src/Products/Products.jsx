import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import './Product.css'; 

const Products = () => {
  const [jsonData, setJsonData] = useState(null); // Initialize jsonData as null
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data)

        setJsonData(data); // Update the state variable with the fetched data
        setImageURL(data[0].image)
      } catch (error) {
        console.error('Error:', error);
      }

    };

    fetchData(); // Call the function to initiate the API request
  }, []); // Use an empty dependency array to ensure this effect runs only once

  function setProduct() {
    if (!jsonData) {
      return null; // Return null or a loading indicator while data is being fetched
    }
  
    return jsonData.slice(0, 30).map((product, index) => (
      <div key={index} className="product">
        <img className="productImg" src={product.image} alt={`Product ${index}`} />
        <h2 className="productName">{product.title}</h2>
        <h3 className="productPrice">{product.price}</h3>
        <button className="atcBtn">ADD TO CART</button>
      </div>
    ));
  }
  


  return (
    <div>
      <Header />
      Products
      {setProduct()}
    </div>
  );
};

export default Products;
