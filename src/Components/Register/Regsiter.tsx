import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import style from "./Register.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { UserType } from "@/types/UserType";
import { CircularProgress } from "@mui/material";
import Router, { useRouter } from "next/router";

function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const schema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .required("email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "email must be in format"),
    phoneNumber: yup.string().required("phone number must be there"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "minimum 6 character is Required")
      .max(12, "password should not exceed more than 12 character")
      .matches(/[a-z]/, "must contain atleast one small letter")
      .matches(/[A-Z]/, "must contain atleast one Capital Letter")
      .matches(/[/d]/, "must contain one digit"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onsubmit = async (data: UserType) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/register", data);
      toast.success(res.data.message);
      reset();
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.registerContainer}>
      <form className={style.register} onSubmit={handleSubmit(onsubmit)}>
        <div>
          Name:{" "}
          <input
            type="text"
            placeholder="Enter name"
            {...register("name", {
              required: { value: true, message: "name is required" },
            })}
          />
          {errors.name?.message && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}
        </div>
        <label htmlFor="">
          Email:
          <input
            type="text"
            placeholder="Enter email"
            {...register("email", {
              required: { value: true, message: "email is required" },
            })}
          />
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </label>
        <label htmlFor="">
          phone Number:
          <input
            type="number"
            placeholder="Enter phone number"
            {...register("phoneNumber", {
              required: { value: true, message: "phone number is required" },
            })}
          />
          {errors.phoneNumber?.message && (
            <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
          )}
        </label>
        <label htmlFor="">
          password
          <input
            type="text"
            placeholder="Enter password"
            {...register("password", {
              required: { value: true, message: "password is required" },
            })}
          />
          {errors.password?.message && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </label>
        <label htmlFor="">
          <button type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Register"
            )}
          </button>
        </label>
        <p>
          already have an account??
          <a onClick={() => router.push("/login")} style={{ color: "blue" }}>
            login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
