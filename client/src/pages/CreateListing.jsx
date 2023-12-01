import React, { useState } from 'react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const CreateListing = () => {
  const[ files, setFiles ] = useState([]);
  const [ formData, setFormData ] = useState({
    imageUrls: [],
  })
 console.log(formData);
  const handleImageSubmit = (e) => {
    if(files.length > 0 && files.length < 7 ){
      const promises = [];

      for(let i = 0; i < files.length ; i++){
          promises.push(storageImage(files[i]))
      }

      Promise.all(promises).then((urls)=>{
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls)})
      })
    }    
  }

  const storageImage = async (file) => {
    return new Promise((resolve, reject)=> {
      const storage = getStorage(app);
      const fileName = new  Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} % done!`);
        },
        (error)=>{
          reject(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL)=>{
              resolve(downloadURL)
            })
        }
      )
    })
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form  className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
        
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'/>
              <span>Sell</span>
            </div>  
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'/>
              <span>Rent</span>
            </div>  
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'/>
              <span>Parking Slot</span>
            </div>  
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'/>
              <span>Furnished</span>
            </div>  
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'/>
              <span>Offer</span>
            </div>  
          </div>

          <div className='flex flex-wrap gap-6'>
            <div className='flex  items-center gap-2'>
              <input 
                type='number' 
                id='bedroom' 
                min='1' 
                max='10' 
                required 
                className='p-3 border border-gray-500 rounded-lg'
              />
              <p>Beds</p>
            </div>
            <div className='flex  items-center gap-2'>
              <input 
                type='number' 
                id='baths' 
                min='1' 
                max='10' 
                required 
                className='p-3 border border-gray-500 rounded-lg'
              />
              <p>Baths</p>
            </div>
            <div className='flex  items-center gap-2'>
              <input 
                type='number' 
                id='regularPrice' 
                min='1' 
                max='10' 
                required 
                className='p-3 border border-gray-500 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            <div className='flex  items-center gap-2'>
              <input 
                type='number' 
                id='discountPrice' 
                min='1' 
                max='10' 
                required 
                className='p-3 border border-gray-500 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
          </div> 
        </div> 

        <div className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold'>Images :
            <span 
              className='font-normal text-gray-600 ml-2'
            >
               The First Image will be the Cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input 
              type='file' 
              id='iamges' 
              className='p-3 border border-gray-300 rounded w-full' 
              accept='images/*'
              onChange={(e)=> setFiles(e.target.files)} 
              multiple
            />
            <button 
              className='p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80'
              onClick={handleImageSubmit}
            >
              Upload
            </button>
          </div>
          <button 
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-70'
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing;