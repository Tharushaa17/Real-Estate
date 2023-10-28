import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

const Profile = () => {

  const {currentUser} = useSelector((state)=>state.user);
  const [ file, setFile ] = useState(undefined);
  const fileRef = useRef(null);
  const [ filePerc, setFilePerc ] = useState(null);
  const [ formData, setFormData ] = useState({});
  const [ fileUploadError, setFileUploadError ] = useState(false);
 
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

  const handleFileUpload = () =>{
    const storage = getStorage(app);
    const fileName =new Date().getTime()+file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_change',(snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
       },(error) => {
        setFileUploadError(true);
      },()=>{
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL)=> setFormData({ ...formData, avatar: downloadURL }));  
      } );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} onChange={(e)=>setFile(e.target.files[0])} hidden accept='image/*'/> 
        <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt='profile' onClick={()=>fileRef.current.click()}/>
        <p className='text-sm self-center'>
          {
            fileUploadError ? 
              (<span className='text-red-700'>Error Image upload (image must be less than 2 mb) </span>) 
            : filePerc > 0 && filePerc < 100 ? 
              (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span> ) 
            : filePerc === 100 ? 
              (<span className='text-green-700'>Image successfully uploaded!</span>) 
            : 
              ('')
          }
        </p>
        <input type='text' className='border p-3 rounded-lg' placeholder='Username' id='username'/> 
        <input type='email' className='border p-3 rounded-lg' placeholder='Email' id='email'/> 
        <input type='password' className='border p-3 rounded-lg' placeholder='Password' id='password'/> 
        <button className='bg-slate-700 text-white rounded-xl p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer font-semibold'>Delete Account</span>
        <span className='text-red-700 cursor-pointer font-semibold'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile;