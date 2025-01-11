import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../utils/constant';
import { FaCar, FaCalendarAlt, FaPaintBrush, FaTag, FaUser, FaRocket, FaPlus } from 'react-icons/fa';

export default function CreateCar() {
  const [carForm, setCarForm] = useState({ model: '', date: '', color: '', price: '', owner: '', mission: '' });
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/allmissions`)
      .then((res) => {
        setMissions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching missions:", error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarForm({ ...carForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!carForm.model || !carForm.date || !carForm.color || !carForm.price || !carForm.owner || !carForm.mission) {
      console.error("Please fill in all fields.");
      return;
    }

    axios.post(`${baseURL}/save`, { ...carForm, mission: carForm.mission })
      .then((res) => {
        navigate('/cars');
      })
      .catch((error) => {
        console.error("Error adding car:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <form className="grid grid-cols-1 gap-6 max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <FaCar className="text-indigo-600 mr-2" />
          <input
            className="w-full border-none focus:outline-none"
            placeholder="Car Model"
            value={carForm.model}
            name="model"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <FaCalendarAlt className="text-green-600 mr-2" />
          <input
            className="w-full border-none focus:outline-none"
            placeholder="Car Date"
            value={carForm.date}
            name="date"
            type="datetime-local"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <FaPaintBrush className="text-blue-600 mr-2" />
          <input
            className="w-full border-none focus:outline-none"
            placeholder="Car Color"
            value={carForm.color}
            name="color"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <FaTag className="text-red-600 mr-2" />
          <input
            className="w-full border-none focus:outline-none"
            placeholder="Car Price"
            value={carForm.price}
            name="price"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <FaUser className="text-yellow-600 mr-2" />
          <input
            className="w-full border-none focus:outline-none"
            placeholder="Car Owner"
            value={carForm.owner}
            name="owner"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center border-b-2 border-gray-200 py-2">
          <FaRocket className="text-purple-600 mr-2" />
          <select
            className="w-full border-none focus:outline-none"
            value={carForm.mission}
            name="mission"
            onChange={handleChange}
          >
            <option value="">Select Mission</option>
            {missions.map((mission) => (
              <option key={mission._id} value={mission._id}>
                {mission.destination}
              </option>
            ))}
          </select>
        </div>

        <button
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
          type="submit"
        >
          <FaPlus className="mr-2" /> Add Car
        </button>
      </form>
    </div>
  );
}
