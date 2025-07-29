import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import style from "./Login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { UserType } from "@/types/UserType";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "email must be in format"),

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
    const { email, password } = data;
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      console.log(res.error);
    } else {
      console.log("authorized", res);
      router.push("/");
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("hey");
  //       const res = await axios.get("/api/register");
  //       console.log("console", res.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <div className={style.loginContainer}>
      <form className={style.login} onSubmit={handleSubmit(onsubmit)}>
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
          <button type="submit">
            {loading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Login"
            )}
          </button>
        </label>
        <p>
          don't have an account??{" "}
          <a onClick={() => router.push("/register")} style={{ color: "blue" }}>
            Register
          </a>
        </p>{" "}
      </form>
    </div>
  );
}

export default Login;
