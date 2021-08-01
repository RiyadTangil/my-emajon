import React from 'react';

const Cart = (props) => {
    const Cart = props.Cart;
    const total = Cart.reduce((total, prd) => total + (prd.price * prd.quantity), 0)
    // let total = 0;
    // for (let i = 0; i < Cart.length; i++) {
    //     const product = Cart[i];
    //     total = total + product.price * product.quantity;
    // }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99
    }


    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <div>
                <h4>Order Summary</h4>
                <p>Items Ordered: {Cart.length}</p>
                <p>Product Price: {formatNumber(total)}</p>
                <p><small>Shiiping Cost: {shipping}</small></p>
                <p><small>Tax + VAT: {tax}</small></p>
                <p>Total Price: {grandTotal}</p>
                <br />
                {
                    props.children 
                }

            </div>

        </div>
    );
};

export default Cart;
// import React from 'react';

// const Cart = ({cart}) => {
//     // const total = Cart.reduce((total, prd) => total + (prd.price * prd.quantity), 0)

//     const total=cart.reduce((total, prd) => total + (prd.price* prd.quantity),0)
 
//     return (
//         <div>
//             <h1>this is cart pagwe</h1>
//             <h1>cart {cart.length}</h1>
//         </div>
//     );
// };

// export default Cart;