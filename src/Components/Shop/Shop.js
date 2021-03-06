import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManagement';
import { Link } from 'react-router-dom';


const Shop = () => {
    const [cart, setCart] = useState([]);
    console.log("cart", cart);
    const firstTen = fakeData.slice(0, 10);
// to solve reload problem
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        } )
        setCart(previousCart);
    }, [])



    const handleAddProduct = (product) => {

        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
        console.log("adding page keys",product.key);
    }

    return (
        <div className="twin-container">
            <div className="product-container">

                {
                    firstTen.map(pd => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product={pd} > </Product>)
                }

            </div>
            <div className="cart-container">
                <Cart Cart={cart}>
                <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;

