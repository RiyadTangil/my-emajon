import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setIMageURL] = useState(null);

  const onSubmit = data => {
    const eventData = {
      name: data.name,
      imageURL: imageURL
    };
    const url = `http://localhost:5000/addEvent`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .then(res => console.log('server side response', res))
  };



  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData();

    imageData.set('key', '8ece3963cdc5195811f654de65d90034');
    imageData.append('image', event.target.files[0]);
    //axios copied code form git hub search results of google
    axios.post('https://api.imgbb.com/1/upload',
      imageData)
      .then(function (response) {
        setIMageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  return (
    <div>
      {/* <h1>Add your awesome Event here</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input name="name" defaultValue="New exciting Event" ref={register} />
        <br/>
        <input name="exampleRequired" type="file" onChange={handleImageUpload} />
        <br/>
        <input type="submit" />
      </form> */}


      <div style={{ backgroundColor: "#F4FDFB", marginRight: "20px" }}>
        <div className="shadow p-5   d-flex justify-content-center flex-column">

          <h5 className="text-brand">Add a Service</h5>
          <form onSubmit={onSubmit}>
            <div class="row g-3">
              <div class="col">
                <label htmlFor="exampleInputEmail1">Service Title</label>
                {/* <input type="text" name="name" onBlur={handleBlur} class="form-control" placeholder="First name" aria-label="First name"></input> */}
              </div>
              <div class="col">
                <label htmlFor="exampleInputEmail1">Service img</label>
                {/* <input type="file" name="img" onChange={handleFileChange} class="form-control" placeholder="Last name" aria-label="Last name"></input> */}
              </div>
            </div>
            <div class="row mt-4 g-3">
              <div class="col form-group">
                <label htmlFor="exampleInputEmail1">Service description</label>
                {/* <input type="text" name="description" onBlur={handleBlur} class="form-control" placeholder="Service details" aria-label="First name"></input> */}
              </div>
              <div class="col">
                <label htmlFor="exampleInputEmail1">Service Price</label>
                {/* <input type="number" onBlur={handleBlur} name="price" class="form-control" placeholder="Last name" aria-label="Last name"></input> */}
              </div>

            </div>
            <div class="col-12 d-flex justify-content-end mt-2">
              < button type="submit" data-bs-target="#staticBackdrop" className="btn main-bg">Submit</button>
            </div>
          </form>

        </div>
      </div>
    </div>

  );
};

export default AddProduct;

