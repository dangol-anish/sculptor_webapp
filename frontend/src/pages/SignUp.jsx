import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // form submission
  const onSubmit = async (signUpDetails) => {
    try {
      const signUpResponse = await axios.post(
        "http://localhost:3000/api/auth/signup",
        signUpDetails
      );
      console.log(signUpResponse);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const password = watch("password", "");

  return (
    <>
      <div className="min-h-screen bg-zinc-900 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* for username */}
          <div>
            <label className="text-white">Username</label>
            <input
              type="text"
              {...register("userName", { required: true, minLength: 3 })}
            />
            {errors.username && errors.username.type === "required" && (
              <span>Username is required</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span>Username must be at least 3 characters</span>
            )}
          </div>
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
            {errors.email && errors.email.type === "pattern" && (
              <span>Invalid email format</span>
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
            {errors.password && errors.password.type === "pattern" && (
              <span>
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, one special character, and be at
                least 8 characters long
              </span>
            )}
          </div>
          {/* for password confirmation */}
          <div>
            <label className="text-white">Confirm Password</label>
            <input
              type="password"
              autoComplete=""
              {...register("confirmUserPassword", {
                required: true,
              })}
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <span>Password confirmation is required</span>
              )}
            {passwordError && <span>{passwordError}</span>}
          </div>
          {/* submit button */}
          <button className="text-white" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
