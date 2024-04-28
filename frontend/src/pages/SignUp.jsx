import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const password = watch("password", "");

  const handleConfirmPassword = (value) => {
    if (value === password) {
      setPasswordError("");
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-900 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-white">Username</label>
            <input
              type="text"
              {...register("username", { required: true, minLength: 3 })}
            />
            {errors.username && errors.username.type === "required" && (
              <span>Username is required</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span>Username must be at least 3 characters</span>
            )}
          </div>
          <div>
            <label className="text-white">Email</label>
            <input
              type="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === "required" && (
              <span>Email is required</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span>Invalid email format</span>
            )}
          </div>
          <div>
            <label className="text-white">Password</label>
            <input
              type="password"
              {...register("password", {
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
          <div>
            <label className="text-white">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => handleConfirmPassword(value),
              })}
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <span>Password confirmation is required</span>
              )}
            {passwordError && <span>{passwordError}</span>}
          </div>
          <button
            className="text-white"
            type="submit"
            disabled={passwordError || isSubmitting}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
