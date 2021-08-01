
import { useContext, useState, useEffect } from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { UserContext } from '../../App';


const Product = ({ product, showAddToCart, showCountDown, handleAddProduct ,SetReload }) => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [newPrice, setNewPrice] = useState(null)
    const [bidingId, setBidingId] = useState(null)


    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed, }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    }


    const handleId = (id) => {
        let newUserInfo = { ...loggedInUser }
        newUserInfo.id = id
        setLoggedInUser(newUserInfo)

    }


    const handleBid = (id) => {
       
        const loading = toast.loading('Please wait...!');
        fetch('https://limitless-wave-74804.herokuapp.com/addBtd', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "bidedId": loggedInUser.id,
                "biderEmail": loggedInUser.email,
                "bidedPrice": +newPrice
            })

        })
            .then(res => res.json())

            .then(data => {
                toast.dismiss(loading);
                if (data) {
                    return swal("bid Added", "Admin has been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    
            if (product.bestPrice < +newPrice) {
                let statusUpdatingInfo = {
                    id: loggedInUser.id,
                    status: +newPrice
                };
                fetch(`https://limitless-wave-74804.herokuapp.com/update/${loggedInUser.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(statusUpdatingInfo)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result) {
                            console.log({ result });
                        }
                    })
            }
        
        
            SetReload(true)

    }



   

    return (
        <div className="product">
            <div>

                <img src={product.img || `data:image/png;base64,${product.image.img}`} alt="" />

            </div>

            <div className="product-details">
                <Link to={"/product/" + product.key}> <h5 className="product-name ">{product.name}</h5></Link>
                <p> by:{product.seller}</p>
                <p> Price:{product.price}</p>




                <p> only {product.stock}  left in stock - Order soon</p>
                <Countdown
                    date={product.duration * 24}
                    item={product}
                    renderer={renderer}
                />
                {showCountDown &&
                    <div>

                        {
                            loggedInUser.email === product.sellerEmail ?
                                <div className="btn btn-danger">cencel</div> :
                                <div>
                                    {
                                        product.bestPrice>0 && <p class='text-danger'><strong> Max bided Price</strong>  ${product.bestPrice}</p>
                                    }
                                    {

                                        product.bidedInfo[1] === loggedInUser.email ?
                                            <p><strong> My bided Price</strong>  ${product.bidedInfo[0]}</p> :
                                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" onClick={() => handleId(product._id)} data-bs-target="#exampleModal" data-bs-whatever="@mdo">bid</button>



                                    }

                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Bidding price</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>
                                                        <div class="mb-3">

                                                            <input type="number" onBlur={(e) => setNewPrice(e.target.value)} placeholder="Price" class="form-control" id="recipient-name"></input>
                                                        </div>

                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>


                                                    <button type="button" onClick={() => handleBid(product._id)} data-bs-dismiss="modal" class="btn btn-primary">Send bid</button>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            // <div className="btn btn-primary">bid</div>
                        }


                    </div>


                }

                {
                    showAddToCart && <button onClick={() => handleAddProduct(product)} className="main-button "> <FontAwesomeIcon icon={faCoffee} /> Add to the card</button>
                }



            </div>

        </div>
    );
};

export default Product;

