import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../utils/constant';
import { FaGlobeAmericas, FaHourglassHalf, FaCalendarCheck, FaCalendarPlus, FaEdit } from 'react-icons/fa';

export default function EditMission() {
    const [missionForm, setMissionForm] = useState({ destination: '', status: 'Pending', startTime: '', endTime: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`${baseURL}/missions/${id}`)
                .then((res) => {
                    // Convert ISO 8601 date strings to format accepted by input type="datetime-local"
                    const formattedStartTime = res.data.startTime.slice(0, 16); // Truncate seconds and milliseconds
                    const formattedEndTime = res.data.endTime.slice(0, 16); // Truncate seconds and milliseconds

                    setMissionForm({
                        destination: res.data.destination,
                        status: res.data.status,
                        startTime: formattedStartTime,
                        endTime: formattedEndTime
                    });
                })
                .catch((error) => {
                    console.error("Error getting mission:", error);
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMissionForm({ ...missionForm, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!missionForm.destination) {
            console.error("Please fill in all required fields.");
            return;
        }

        axios.put(`${baseURL}/missions/update/${id}`, missionForm)
            .then(() => {
                navigate('/cars');
            })
            .catch((error) => {
                console.error("Error updating mission:", error);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <form className="grid grid-cols-1 gap-6 max-w-m mx-auto bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
                <div className="flex items-center border-b-2 border-gray-200 py-2">
                    <FaGlobeAmericas className="text-blue-600 mr-2" />
                    <input
                        className="w-full border-none focus:outline-none"
                        placeholder="Destination"
                        value={missionForm.destination}
                        name="destination"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center border-b-2 border-gray-200 py-2">
                    <FaHourglassHalf className="text-orange-600 mr-2" />
                    <select
                        className="w-full border-none focus:outline-none"
                        value={missionForm.status}
                        name="status"
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="flex items-center border-b-2 border-gray-200 py-2">
                    <FaCalendarCheck className="text-green-600 mr-2" />
                    <input
                        className="w-full border-none focus:outline-none"
                        type="datetime-local"
                        value={missionForm.startTime}
                        name="startTime"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center border-b-2 border-gray-200 py-2">
                    <FaCalendarPlus className="text-red-600 mr-2" />
                    <input
                        className="w-full border-none focus:outline-none"
                        type="datetime-local"
                        value={missionForm.endTime}
                        name="endTime"
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
                    type="submit"
                >
                    <FaEdit className="mr-2" /> Update Mission
                </button>
            </form>
        </div>
    );
}
