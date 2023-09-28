import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function CartData () {
    const cartData = {
        "cart": [
          {
            "id": 1,
            "name": "Product 1",
            "price": 10.99,
            "quantity": 2
          },
          {
            "id": 2,
            "name": "Product 2",
            "price": 19.99,
            "quantity": 1
          }
        ]
      };
      console.log(cartData)
    
      function removeFromCart(cart, itemId) {
        const updatedCart = cart.cart.filter(item => item.id !== itemId);
        return { "cart": updatedCart };
      }
      
      // Remove item with ID 2 from the cart
      const updatedCartData = removeFromCart(cartData, 2);
      
      console.log(updatedCartData);
    
    }
    CartData();

const Cart = () => {

    return(
        <div>
            <Header />
           Cart
        </div>
    )

};

export default Cart;