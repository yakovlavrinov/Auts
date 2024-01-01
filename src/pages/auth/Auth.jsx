import React, { useState } from "react";

const Auth = () => {
  const [status, setStatus] = useState("login");
  return (
    <div className="auth">
      <div className="container">
        <form className="auth__form">
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
          <input type="email" placeholder="email" />

          {status === "register" && (
            <>
              <input type="text" placeholder="Имя" />
              <input type="phone" placeholder="телефон" />
            </>
          )}

          <input type="password" placeholder="пароль" />

          <button>
            {status === "register" ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
