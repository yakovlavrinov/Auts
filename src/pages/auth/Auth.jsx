import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/reducers/authSlice";

const Auth = () => {
  const [status, setStatus] = useState("login");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const authUserFunc = (data) => {
    dispatch(authUser({ user: data, params: status }));
  };

  return (
    <div className="auth">
      <div className="container">
        <form
          onSubmit={handleSubmit(authUserFunc)}
          noValidate
          className="auth__form"
        >
          <ul>
            <li
              style={{ color: status === "login" ? "red" : "black" }}
              onClick={() => setStatus("login")}
            >
              Вход
            </li>
            <li
              style={{ color: status === "register" ? "red" : "black" }}
              onClick={() => setStatus("register")}
            >
              Регистрация
            </li>
          </ul>
          <label>
            <input
              {...register("email", {
                required: {
                  message: "Email обязательно к заполнению",
                  value: true,
                },
                minLength: {
                  message: "Минимум 10 символов",
                  value: 10,
                },
                pattern: {
                  message: "Напишите правильно свой email",
                  value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/,
                },
              })}
              type="email"
              placeholder="email"
            />
            <span>{errors?.email?.message}</span>
          </label>

          {status === "register" && (
            <>
              <label>
                <input
                  {...register("name", {
                    required: {
                      message: "Имя обязательно к заполнению",
                      value: true,
                    },
                    minLength: {
                      message: "Минимум 3 символа",
                      value: 3,
                    },
                  })}
                  type="text"
                  placeholder="Имя"
                />
                <span>{errors?.name?.message}</span>
              </label>

              <label>
                <input type="phone" placeholder="телефон" />
              </label>
            </>
          )}
          <label>
            <input
              {...register("password", {
                required: {
                  message: "Пароль обязательно к заполнению",
                  value: true,
                },
                pattern: {
                  message:
                    "Пароль должен содержать не мение 8 символов, заглавную букву, число, символ!",
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/,
                },
              })}
              type="password"
              placeholder="пароль"
            />
            <span>{errors?.password?.message}</span>
          </label>

          <button type="submit">
            {status === "register" ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
