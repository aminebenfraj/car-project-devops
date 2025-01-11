import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/constant";


export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const getUser = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${baseURL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`${baseURL}/auth/login`, form)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        getUser();
        { user.isAdmin ? navigate("/cars") : navigate("/cars-user") }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col max-w-lg w-full p-8 rounded-lg shadow-lg bg-white text-gray-700">
        <div className="mb-10 text-center">
          <h1 className="my-3 text-3xl font-semibold">Connexion</h1>
          <p className="text-md text-gray-500">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                id="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-violet-500 "
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:ring-violet-500 "
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-md shadow bg-blue-500 text-white font-medium focus:outline-none  "
            >
              Connexion
            </button>
            <p className="text-sm text-center">
              Pas encore inscrit ?
              <Link
                to="/register"
                className="font-medium text-blue-500 "
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
