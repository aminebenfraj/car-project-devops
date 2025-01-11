import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { baseURL } from '../utils/constant';
import { TbEyeEdit } from "react-icons/tb";


function List({ id, car, date, color, price, owner, mission, fetchCars }) {
    const handleDeleteCar = () => {
        console.log("Deleting car with ID:", id);
        axios.delete(`${baseURL}/delete/${id}`)
            .then((res) => {
                console.log("Delete response:", res);
                fetchCars(); // Call fetchCars to refresh the list after deletion
            })
            .catch((err) => {
                console.error("Delete error:", err);
            });
    };

    return (
        <tr className="border-b border-gray-300">
            <td className="px-4 py-2">{car}</td>
            <td className="px-4 py-2">{date}</td>
            <td className="px-4 py-2">{color}</td>
            <td className="px-4 py-2">{price}</td>
            <td className="px-4 py-2">{owner}</td>
            <td className={`px-4 py-2 ${(mission && mission?.status === 'Pending') ? 'text-yellow-500' : 'text-emerald-400'}`} >{(mission && mission?.status != 'Completed') ? mission?.status : ''}</td>
            
        </tr>
    );
}

export default List;
