import React from 'react';
import axios from 'axios';
import { BiTrash, BiEditAlt } from 'react-icons/bi';
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
            <td className="px-4 py-2">
                <Link to={`/edit/${id}`} className="icon text-red-500 hover:text-red-700 cursor-pointer">
                    <BiEditAlt />
                </Link>
                <span onClick={handleDeleteCar} className="icon text-red-500 hover:text-red-700 cursor-pointer">
                    <BiTrash />
                </span>
                {(mission && mission?.status != 'Completed') &&
                <Link to={`/mission/edit/${mission?._id}`} className="icon text-green-900 hover:text-red-700 cursor-pointer">
                    <TbEyeEdit />
                </Link>}
            </td>
        </tr>
    );
}

export default List;
