import React, { useState } from 'react';
import { FaBars, FaBell, FaLeaf, FaTimes } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useMutation } from '@tanstack/react-query';

function Header() {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpErrorMessage,setSignUpErrorMessage]=useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    password:'',
    role:''
  })

  const [formDataSignUp, setFormDataSignUp] = useState({
    name: '',
    email: '',
    phone:'',
    password: '',
    role: ''
  })
  
const navigate=useNavigate();
const mutateforLogin=useMutation({
  mutationFn: async (data) => {
    const response = await axios.post(`http://localhost:3000/api/${formDataLogin.role}/login`, data);
    return response.data;
  },
  onError:({response})=>{
    console.log(response.data.message);
    setLoginErrorMessage(response.data.message);
  },
  onSuccess:(response)=>{
    console.log(response);
    localStorage.setItem("token",response.token);
    setLoginErrorMessage("")
    setIsLoginOpen(false);
    navigate(`/${formDataLogin.role}-home`);
  }
});


 function handleLogin(e){
  e.preventDefault();
  mutateforLogin.mutate(formDataLogin);
 }

 

const {mutate,isLoading}=useMutation({
  mutationFn: async(data)=>{
   const response= await axios.post(`http://localhost:3000/api/${formDataSignUp.role}/register`,data);
   return response.data;
    },
  onError:({response})=>{
    setSignUpErrorMessage(response.data.message);
  },
  onSuccess:()=>{
    setSignUpErrorMessage("")
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
    setFormDataSignUp({
      name: '',
      email: '',
      phone:'',
      password: '',
      role: ''
    })
  }  
  
})
 
function handleSignUpForm(e){
  e.preventDefault();
  mutate(formDataSignUp);
 }
if(isLoading){
   <div className='border border-t-0 border-gray-500 rounded-full w-13 h-13'></div>
}
  return (
    <>
      <header className="fixed z-50 w-full bg-white shadow-md">
        <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center gap-2 text-green-600">
            <FaLeaf className="text-2xl" />
            <span className="text-xl font-bold">AgriConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 lg:flex">
            <NavLink to="/" className="hover:text-green-600">Home</NavLink>
            <NavLink to="/features" className="hover:text-green-600">Features</NavLink>
            <NavLink to="/prices" className="hover:text-green-600">Market Prices</NavLink>
            <div className="flex items-center gap-4">
              <select 
                className="hidden bg-transparent border-none focus:ring-0 lg:flex"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
              </select>
              <button
                onClick={() => {
                  setIsSignUpOpen(true)
                  setIsLoginOpen(false)
                }
                }
                className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700">
                Sign Up
              </button>
              <button 
              onClick={() => {
                setIsLoginOpen(true)
                setIsSignUpOpen(false)}
              }
                className="px-6 py-2 text-green-600 border border-green-600 rounded-full hover:bg-green-50">
                Login
              </button>
              <button className="relative p-2 rounded-full hover:bg-green-50">
                <FaBell className="text-xl" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">3</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="text-2xl lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
        </nav>
      </header>
      {isLoginOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
          {/* Close Button */}
          <button
            className="absolute text-xl top-4 right-4"
            onClick={() => setIsLoginOpen(false)}
          >
            <FaTimes />
          </button>
      
          {/* Login Form */}
          <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            value={formDataLogin.email}
            onChange={(e)=>{
              setFormDataLogin({...formDataLogin,email:e.target.value})
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={formDataLogin.password}
            onChange={(e)=>{
              setFormDataLogin({...formDataLogin,password:e.target.value})
            }}
            required
          />

          <select className="w-full p-2 mb-2 border rounded"
          value={formDataLogin.role}
          onChange={(e)=>{
            setFormDataLogin({...formDataLogin,role:e.target.value})
          }}
          required
          >
              <option value=''>Select</option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
          </select>
          
          {loginErrorMessage!=="" && <div className='flex justify-center mb-3 font-semibold text-red-500'>{loginErrorMessage}</div>}
          
          <button type="submit" className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700">
            Login
          </button>
          </form>
      
          {/* Forgot Password */}
          <div className="mt-3 text-center">
            <button className="text-sm text-green-600 hover:underline">
              Forgot Password?
            </button>
          </div>
      
          {/* Sign Up Option */}
          <div className="mt-4 text-center">
            <span className="text-sm">Don't have an account? </span>
            <button
              className="text-sm font-semibold text-green-600 hover:underline"
              onClick={() => {
                setIsLoginOpen(false);
                setIsSignUpOpen(true); // Assuming you have a state for Sign Up modal
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      
      )}

      {/* Sign-Up Modal */}
      {isSignUpOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
              {/* Close Button */}
              <button
                className="absolute text-xl top-4 right-4"
                onClick={() => setIsSignUpOpen(false)}
              >
                <FaTimes />
              </button>

              {/* Signup Heading */}
              <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>

              {/* Input Fields */}
              <form onSubmit={handleSignUpForm}>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 mb-4 border rounded"
                value={formDataSignUp.name}
                onChange={(e)=>{
                  setFormDataSignUp({...formDataSignUp,name:e.target.value})
                }}
              required/>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
                value={formDataSignUp.email}
                onChange={(e)=>{
                  setFormDataSignUp({...formDataSignUp,email:e.target.value})
                }}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-2 mb-4 border rounded"
                value={formDataSignUp.phone}
                onChange={(e)=>{
                  setFormDataSignUp({...formDataSignUp,phone:e.target.value})
                }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                value={formDataSignUp.password}
                onChange={(e)=>{
                  setFormDataSignUp({...formDataSignUp,password:e.target.value})
                }}
                required
              />

              {/* Role Selection */}
              <select className="w-full p-2 mb-2 border rounded"
              value={formDataSignUp.role}
              onChange={(e)=>{
                setFormDataSignUp({...formDataSignUp,role:e.target.value})
              }} required>
                <option value=''>Select</option>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
              </select>
              
              {signUpErrorMessage!=="" && <div className='flex justify-center mb-2 text-red-500'>{signUpErrorMessage}</div>}
              {/* Signup Button */}
              <button type='submit' className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700">
                Sign Up
              </button>
              </form>

              

              {/* Already have an account? Login */}
              <p className="mt-4 text-center text-gray-600">
                Already have an account?{" "}
                <button
                  className="text-green-600 underline hover:text-green-700"
                  onClick={() => {
                    setIsSignUpOpen(false); // Close Sign Up Modal
                    setIsLoginOpen(true); // Open Login Modal
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}

      
      {/* Mobile Menu (Fixed the duplication) */}
      <div className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <button 
            className="absolute text-2xl top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <div className="flex flex-col gap-6 mt-12">
            <NavLink to="/" className='text-lg' onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/features" className="text-lg" onClick={() => setIsMenuOpen(false)}>Features</NavLink>
            <NavLink to="/prices" className="text-lg" onClick={() => setIsMenuOpen(false)}>Market Prices</NavLink>
            <select 
              className="bg-transparent border-none w-fit"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
            <div className="flex flex-col gap-4">
              <button
                onClick={() =>{
                  setIsSignUpOpen(true)
                  setIsMenuOpen(false)}}
                className="px-6 py-2 text-white bg-green-600 rounded-full">
                Sign Up
              </button>
              <button 
                onClick={() => {
                  setIsLoginOpen(true)
                  setIsMenuOpen(false);
                }} 
                className="px-6 py-2 text-green-600 border border-green-600 rounded-full">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
