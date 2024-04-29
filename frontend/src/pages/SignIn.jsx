import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // form submission
  const onSubmit = async (signUpDetails) => {
    try {
      const signUpResponse = await axios.post(
        "http://localhost:3000/api/auth/signin",

        signUpDetails,
        { withCredentials: true }
      );
      // console.log(signUpDetails);
      console.log(signUpResponse);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-zinc-900 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* for email */}
          <div>
            <label className="text-white">Email</label>
            <input
              type="email"
              {...register("userEmail", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <span>Email is required</span>
            )}
          </div>
          {/* for password */}
          <div>
            <label className="text-white">Password</label>
            <input
              type="password"
              autoComplete=""
              {...register("userPassword", {
                required: true,
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <span>Password is required</span>
            )}
          </div>

          {/* submit button */}
          <button className="text-white" type="submit">
            Sign In
          </button>
        </form>
        <Link className="text-white" to="/sign-up">
          Go to Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
