import React from 'react'
import { useState } from 'react';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../Database/firebase';
import { useNavigate } from 'react-router-dom';




export default function CreateListing() {
  const navigate= useNavigate();
  const auth= getAuth();
  const [geolocationEnabled, setGeoLocationEnabled]= useState(true);
  const [loading, setLoading]= useState(false);
  const [formData, setFormData]= useState({
    type: "rent",
    name:"",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    address:'',
    description:'',
    price: '',
    latitude: 0,
    longitude: 0,
    images:[]
  });
  const {type, name, bedrooms, bathrooms, parking, address, description, price, latitude, longitude, images}= formData;
  function onChange(e){
    let boolean= null;
    if(e.target.value === "true"){
      boolean = true
    }

    if(e.target.value === "false"){
      boolean = false
    }
    //This is for Files
    if(e.target.files){
      setFormData((prevState)=>({
        ...prevState,
        images: e.target.files
      }))
    }
    //This is for the Text/Boolean/Number
    if(!e.target.files){
      setFormData((prevState)=>({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }

  }
  //ON SUBMIT FUNCTION
  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    
    //Set Images Condition to 6 MAX.
    if(images.length > 6){
      setLoading(false);
      toast.error("Upto 6 images are Allowed")
      return;
    }
    let geolocation={}
    let location
    if(geolocation){
      const res= await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API}`);
      const data= await res.json();
      console.log(data)
      geolocation.lat= data.results[0] ?.geometry.location.lat ??0
      geolocation.lng= data.results[0] ?.geometry.location.lng ??0

      location= data.status === "ZERO_RESULTS" && undefined;

      if(location ===undefined){
        setLoading(false);
        toast.error ("Please Enter a Valid Address");
        return;
      }
    } else {
      geolocation.lat= latitude;
      geolocation.lng= longitude;
    }
    
    async function storeImage(image){
      return new Promise((resolve, reject)=>{
        const storage= getStorage();
        const fileName= `${auth.currentUser.uid}- ${image.name}- ${uuidv4()} `;
        const storageRef= ref(storage, fileName);        
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    reject(error)
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve('File available at', downloadURL);
    });
  }
);

        
        
      })

    }
    const imgUrls= await Promise.all(
      [...images].map((image)=>storeImage(image))).catch((error)=>{
        setLoading(false)
        toast.error("Images NOT Uploaded");
        return;
      })
    
    const formDataCopy= {
      ...formData, 
      imgUrls,
      geolocation,
      timeStamp: serverTimestamp(),
    }
    delete formDataCopy.images;
    const docRef= await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false)
    toast.success("Listing has been Created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  //SPINNER
  if(loading){
    return <Spinner/>
  }

  return (
    <main className='max-w-md px-2 mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Add a Property</h1>

      <form onSubmit={onSubmit}>
        <p className='tex-lg mt-6 font-semibold'>Sell/Rent</p>
        <div className='flex'>

      {/* SELL BUTTON  */}

        <button 
        type="button" 
        id="type" 
        value="sale" 
        onClick={onChange}
        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white" : "bg-slate-600 text-white"}`}>
        Sell</button>

      {/* RENT BUTTON */}

        <button 
        type="button" 
        id="type" 
        value="rent" 
        onClick={onChange}
        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "sale" ? "bg-white" : "bg-slate-600 text-white"}`}>
        Rent </button>

        {/* NAME OF THE PROPERTY  */}

        </div>
        <p className="text-lg mt-8 font-semibold">Name</p>
        <input 
        type="text" 
        id="name" 
        value={name} 
        onChange={onChange} 
        placeholder="Property Name" 
        maxLength="30" minLength="5" required 
        className="w-full px-4 py-3 text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white"/>
    
        {/* BEDROOMS */}

    <div className='flex justify-start space-x-8 mb-6'>
        <div>          
         <p className='text-lg font-semibold'>Beds</p>
         <input 
         type='number' 
         id="bedrooms" 
         className='w-full text-center px-3 py-2 text-xl text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white'
         value={bedrooms} 
         onChange={onChange} 
         min="1" max="20" required />
        </div>
      {/* WASHROOMS  */}

        <div>          
         <p className='text-lg font-semibold'>Baths</p>
         <input 
         type='number' 
         id="bathrooms" 
         className='w-full text-center px-3 py-2 text-xl text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white'
         value={bathrooms} 
         onChange={onChange} 
         min="1" max="20" required />
        </div>
    </div>

      {/* PARKING BUTTON (YES) */}

    <p className='tex-lg mt-6 font-semibold'>Parking</p>
        <div className='flex'>
        <button 
        type="button" 
        id="parking" 
        value={true} 
        onClick={onChange}
        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!parking? "bg-white" : "bg-slate-600 text-white"}`}>
        Yes</button>

      {/* PARKING BUTTON (NO)  */}
        <button 
        type="button" 
        id="parking" 
        value={false}
        onClick={onChange}
        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${parking? "bg-white text-black" : "bg-slate-600 text-white"}`}>
        No </button>
        </div>

        {/* ADDRESS  */}

        <p className="text-lg mt-8 font-semibold">Address</p>
        <textarea 
        type="text" 
        id="address" 
        value={address} 
        onChange={onChange} 
        placeholder="Property Address" 
        maxLength="100" minLength="5" required 
        className="w-full px-4 py-3 text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white"/>

        {/* LATITUDE  */}

        {!geolocationEnabled && (
          <div className='flex space-x-8 justify-start mb-6'>
            <div>
              <p className='text-lg font-semibold' >Latitude</p>
              <input type='number' id="latitude" value={latitude} onChange={onChange} required className='w-full px-4 py-2 text-xl text-gray-700 bg-whote border border-gray-300 rounded focus:bg-white foxus:text-gray-700 focus:border-slate-600 text-center'/>
            </div>

            <div>
              <p className='text-lg font-semibold' >Longitude</p>
              <input type='number' id="latitude" value={longitude} onChange={onChange} required className='w-full px-4 py-2 text-xl text-gray-700 bg-whote border border-gray-300 rounded focus:bg-white foxus:text-gray-700 focus:border-slate-600 text-center'/>
            </div>
          </div>
        )}

      {/* DESCRIPTION  */}

      <p className="text-lg mt-8 font-semibold">Description</p>
        <textarea 
        type="text" 
        id="description" 
        value={description} 
        onChange={onChange} 
        placeholder="Property Address" 
        maxLength="100" minLength="5" required 
        className="w-full px-4 py-3 text-gray-700 border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:border-slate-600 mb-6 focus:bg-white"/>

        {/* PRICE  */}
    
        <div className='flex items-center space-x-4' >
      <p className='text-lg font-semibold'>Price</p>
      <div className='flex w-full justify-center space-x-5'>
        <input 
        type='number' 
        id="price" 
        value={price} 
        onChange={onChange} 
        min='50' max='5000000' required 
        className='w-full px-4 py-2 tex-xl text-center text-gray-700 border-gray-300 rounded ease-in-out bg-white' />
      {type ==='rent' && (
        <div>
          <p className='text-md w-full whitespace-nowrap'> $/Month</p>
        </div>
      )}
      
      </div>
        </div>

        {/* IMAGES  */}

        <div>
          <p className='mt-5'>Images</p>
          <p className='text-sm text-gray-500'>First image will be the cover (max 6)</p>
          <input type='file' id='images' onChange={onChange} accept='.jpg, .png, .jpeg' multiple required className='w-full px-3 py-2 text-gray-600 bg-white border border-gray-400 rounded transition ease-in-out' />
        </div>
        <button type='submit' className='mt-4 w-full bg-red-400 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-red-500 transition ease-in-out duration-200 hover:shadow-lg active:bg-red-600'>Create Listing</button>
      </form>
      

    </main>
  )
}
