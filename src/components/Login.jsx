import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index/'
import { useDispatch } from 'react-redux'
import {AuthService} from '../appwrite/auth' 
import {useForm} from 'react-hook-form'




function Login() {

     const Navigate = useNavigate();
     const dispatch = useNavigate();
      const {register, handleSubmit}=useForm();

     const  login= async(data)=>
    { 
      serError("");
      try
      {
        const session= await authService.login(data);
        if (session)
        {
            const  userData =await authService.getCurrentUser();
            if (userData) dispatch (authLogin(userData))
            navigate("/")
        }
      }
      catch(error)
      {
         setError(error.message);
      } 
    }  



  return (

    <div clasName={`mx-auto w-full max-w-lg bg-gray-100  rounded-xl p-10 border border/10 `} >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black   `} >
        <div className='mb-2 flex justify-center      ' >
            <span className='inline-block w-full max-w-[100px]       ' >
              <Logo />  
            </span>

        </div>


      <h2 className="text-center text-xl font-bold leading-tight " >
    </h2>

    <p className="mt-2 text-center text-base  text-black/60     " >
        Don&apos;t have any account?nbsp; 
      <Link
        to="/signup"
        className="font-medium text-primary transition-all duration-200 hover:underline   "
      >
      </Link>
      </p>

     {error && <p className="text-red-500 text-center">{error}</p>}

    <form onSubmit={handleSubmit(login)} className="mt-8"   >
       <div className=" space-y-5 "  >
    
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email", {
        required: "Email is required",
         validate: (value) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
         "Enter a valid email address"
        })}
        />

     <Input
         label="Password"
         placeholder="Enter your Password"
          type="password"
          {...register("password", {
          required: "Password is required",
          validate: (value) =>
           /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value) ||
           "Password must be 8 characters with uppercase, number and special character"
  })}
/>

        <Button type="sumit"  className="w-full" />Sign In<Button/>
 

        </div>
        </form>




      </div>
    </div>
  )
}

export default Login
