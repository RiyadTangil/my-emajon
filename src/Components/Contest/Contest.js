import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import Product from '../Product/Product';
import jwt_decode from "jwt-decode";


const Contest = () => {
    const [product, setProduct] = useState([])
    const [bids, setBids] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)




    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProduct(data))

    }, [])


    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return false;
        }

        const decodedToken = jwt_decode(token);
        const { name, email, picture } = decodedToken;
        const newSignedInUser = { name: name, email: email, img: picture }
        setLoggedInUser(newSignedInUser)
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/bids")
            .then(res => res.json())
            .then(data => {
                setBids(data)

           
    const maxBidPrice = data.reduce((prev, current) => (prev.bidedPrice > current.bidedPrice) ? prev : current) 

        const matchedProduct = data.filter(pd => pd.biderEmail === loggedInUser.email)
   
        if (matchedProduct) {

            const newProduct = product.map(pd => {

                let productWithBid = matchedProduct.find(bidProduct => bidProduct.bidedId === pd._id);
               
                if (productWithBid) {

                    let newbid = [ productWithBid.bidedPrice, productWithBid.biderEmail ,maxBidPrice.bidedPrice] ;
                    pd.bidedInfo = newbid;
                
                  
                }
                else{
                    pd.bidedInfo=[ null,null,null ] ;
                }
            

                return pd;

            })
    console.log(newProduct);
            setNewProduct(newProduct)
        }
        // })
            })
 

    }, [product])




    return (
        <div>
       
            {
                newProduct.map(pd => <Product product={pd} showCountDown={true} >

                </Product>)
            }

        </div>
    );
};

export default Contest;