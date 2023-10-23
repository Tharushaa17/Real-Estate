import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [] = useState(null);
  const handleChaneges = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/api/auth/sing-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up..</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' className='border p-3 rounded-lg' placeholder='Username' id='username' onChange={handleChaneges}/>
        <input type='email' className='border p-3 rounded-lg' placeholder='Email' id='email' onChange={handleChaneges}/>
        <input type='password' className='border p-3 rounded-lg' placeholder='Password' id='password' onChange={handleChaneges}/>
        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign UP...'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account ? </p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp