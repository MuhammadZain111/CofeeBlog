import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { Button, Input, Logo } from './index/'





function Signup() 
{
   
     const Navigate = useNavigate();
     const { register, handleSubmit, formState: { errors } } = useForm();
     const [error, setError] = useState("");
     const [success, setSuccess] = useState("");

    const create = async (data) => {
      setError("");
      setSuccess("");
      try {
         const userData = await authService.createAccount(data);
         if (userData) {
           setSuccess("Account created successfully! Please log in.");
           setTimeout(() => {
             Navigate("/login");
           }, 2000);
         }
      } catch (error) {
        console.log("Sign up error:", error);
        setError(error.message);
      }
    }

    return (
 
     <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`} >
         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`} >
           <div className='mb-2 flex justify-center      ' >
               <span className='inline-block w-full max-w-[100px]       ' >
                 <Logo />  
               </span>
   
           </div>
   
   
         <h2 className="text-center text-xl font-bold leading-tight">Sign up to create account</h2>
   
<p className="mt-2 text-center text-base text-black/60">
           Already have an account?&nbsp;
         <Link
           to="/login"
           className="font-medium text-primary transition-all duration-200 hover:underline"
         >
           Login
         </Link>
         </p>
   
         {error && <p className="text-red-500 text-center">{error}</p>}
         {success && <p className="text-green-500 text-center">{success}</p>}
   
       <form onSubmit={handleSubmit(create)} className="mt-8"   >
          <div className=" space-y-5 "  >
       


         <Input
           label="Name"
           placeholder="Enter your name"
           type="text"
           {...register("name", {
             required: "Name is required",
           })}
           error={errors.name?.message}
         />
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
           error={errors.email?.message}
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
           error={errors.password?.message}
         />

           <Button type="submit" className="w-full cursor-pointer  ">Sign Up</Button>

           </div>
           </form>

         </div>
       </div>
  )
}

export default Signup
