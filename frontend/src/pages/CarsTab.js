import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaCarAlt, FaPalette, FaDollarSign, FaUserTie, FaTools, FaCar } from 'react-icons/fa';
import { FaPerson } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";


import List from '../components/List';
import { baseURL } from '../utils/constant';

export default function CarsTab() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState(null);


    const fetchCars = async () => {
        try {
            const response = await axios.get(`${baseURL}/get`);
            setCars(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }
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
        getUser();
        axios
            .get(`${baseURL}/get`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                fetchCars();
            });
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    return (
        <main className="w-full h-fit min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 ">
            <div className='container p-4 mx-auto'>
                <FaCar className="text-3xl text-green mr-20 " />
                <h1 className="text-4xl font-bold text-indigo-700 mb-6">Car Management</h1>
                <div className="flex justify-center gap-4 mb-8">
                    <a href="/create" className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
                        <FaPlusCircle />
                        <span className="ml-2">Create Car</span>
                    </a>
                    <a href="/mission/create" className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
                        <FaPlusCircle />
                        <span className="ml-2">Create Mission</span>
                    </a>
                    <a href="" className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
                        <button onClick={handleLogout} className="flex items-center px-4 -mb-1 ">Se deconnecter</button>
                    </a>
                </div>
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="table-auto w-full">
                        <thead className="text-white bg-gradient-to-r from-indigo-600 to-green-600">
                            <tr>
                                <TableHeader icon={<FaCarAlt />} text="Model" />
                                <TableHeader icon={<MdDateRange />} text="Date" />
                                <TableHeader icon={<FaPalette />} text="color" />
                                <TableHeader icon={<FaDollarSign />} text="price" />
                                <TableHeader icon={<FaPerson />} text="owner" />
                                <TableHeader icon={<MdOutlineWorkHistory />} text="mission" />
                                <TableHeader icon={<FaTools />} text="action" />
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {cars.map((car) => (
                                <List
                                    key={car._id}
                                    id={car._id}
                                    car={car.model}
                                    date={car.date}
                                    color={car.color}
                                    price={car.price}
                                    owner={car.owner}
                                    mission={car?.mission}

                                    fetchCars={fetchCars}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

// Custom Table Header Component
const TableHeader = ({ icon, text }) => (
    <th className="px-4 py-3">
        <div className="flex items-center">
            {icon}
            <span className="ml-2">{text}</span>
        </div>
    </th>
);
