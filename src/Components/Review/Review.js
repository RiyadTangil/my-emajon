import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManagement';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import "./Review.css";

const Review = () => {
    const [cart, setCart] = useState([]);
    // const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory()
    const handleProceedCheckout = () => {
        history.push('/shipment');
        // setOrderPlaced(true)

    

        // processOrder()
    }

    const removeProduct = (productKey) => {

        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);

        removeFromDatabaseCart(productKey);

    }



    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        console.log('savedCart',savedCart);
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    // let thankyou;
    // if (orderPlaced) {
    //     thankyou = <img src={happyImage} alt="" />
    // }

    return (
        <div className="twin-container">

            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewItem>)
                }
                {/* {thankyou} */}
            </div>
            < div className="cart-container" >

                <Cart Cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>

            </div >
        </div >
    );
};

export default Review;