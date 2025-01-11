import React, { useState } from 'react';
import { FaFacebookSquare, FaInstagram, FaCar, FaShieldAlt, FaMoneyBillWave, FaBars, FaTimes } from 'react-icons/fa';

export default function Home() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            {/* Navigation Bar */}
            <nav className="text-white bg-gradient-to-r from-indigo-400 to-green-700 shadow-lg">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        {/* Website Logo */}
                        <a href="/" className="flex items-center py-4 px-2 text-white">
                            <FaCar className="text-3xl text-white mr-2" />
                            <span className="font-bold text-xl">CarPark</span>
                        </a>
                        {/* Primary Navbar items */}
                        <div className="hidden md:flex space-x-4">
                            <a href="#services" className="py-4 px-2 text-white hover:text-gray-100 transition duration-300">Services</a>
                            <a href="#about" className="py-4 px-2 text-white hover:text-gray-100 transition duration-300">About</a>
                            <a href="#contact" className="py-4 px-2 text-white hover:text-gray-100 transition duration-300">Contact</a>
                        </div>
                    </div>
                    {/* Right-aligned items */}
                    <div className="flex items-center">
                        {/* Login Button */}
                        {/* <a href='/client/src/pages/Login.js' className="text-white hover:text-gray-100 transition duration-300 mr-4">Login</a> */}
                        {/* Mobile menu button */}
                        <button className="md:hidden text-white hover:text-gray-100 transition duration-300" onClick={toggleMobileMenu}>
                            {showMenu ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>
                {/* mobile menu */}
                <div className={`${showMenu ? 'block' : 'hidden'} bg-green-500 md:hidden`}>
                    <ul className="space-y-2">
                        <li><a href="#services" className="block text-white py-3 px-4 hover:bg-green-600 transition duration-300">Services</a></li>
                        <li><a href="#about" className="block text-white py-3 px-4 hover:bg-green-600 transition duration-300">About</a></li>
                        <li><a href="#contact" className="block text-white py-3 px-4 hover:bg-green-600 transition duration-300">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* Home Button */}
            <div className="flex justify-center items-center bg-white py-20 ">
                <a href="/login" className="bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition duration-300">Login</a>
            </div>

            {/* Main Content */}
            {/* Services Section */}
            <div id="services" className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-green-500 mb-12">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service Card 1 */}
                        <div className="text-white bg-gradient-to-r from-indigo-400 to-green-700 shadow-lg p-8 rounded-lg flex flex-col items-center">
                            <FaCar className="text-5xl text-white mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Convenient Parking</h3>
                            <p className="text-white text-center">We offer convenient parking solutions tailored to your needs, ensuring a stress-free experience every time you park with us.</p>
                        </div>
                        {/* Service Card 2 */}
                        <div className="text-white bg-gradient-to-r from-indigo-400 to-green-700 shadow-lg p-8 rounded-lg flex flex-col items-center">
                            <FaShieldAlt className="text-5xl text-white mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Secure Facilities</h3>
                            <p className="text-white text-center">Our parking facilities are equipped with state-of-the-art security measures, providing a safe environment for your vehicle.</p>
                        </div>
                        {/* Service Card 3 */}
                        <div className="text-white bg-gradient-to-r from-indigo-400 to-green-700 shadow-lg p-8 rounded-lg flex flex-col items-center">
                            <FaMoneyBillWave className="text-5xl text-white mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Affordable Pricing</h3>
                            <p className="text-white text-center">We offer competitive pricing options, ensuring that you get great value for your money every time you park with us.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div id="about" className="bg-gray-200 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-green-500 mb-12">About Us</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We are dedicated to providing convenient and secure car parking solutions to our customers. With our state-of-the-art facilities and friendly staff, we ensure a hassle-free parking experience for every vehicle owner.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-white bg-gradient-to-r from-indigo-400 to-green-700 shadow-lg p-8 rounded-lg flex flex-col items-center py-8">
                <div id="contact" className="max-w-6xl mx-auto px-4 flex justify-center items-center">
                    <a href="https://www.instagram.com/amine_benfraj_/" target="_blank" rel="noopener noreferrer" className="text-white mr-4 hover:text-gray-100 transition duration-300">
                        <FaInstagram className="text-3xl" />
                    </a>
                    <a href="https://www.facebook.com/benfraj.aminee/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
                        <FaFacebookSquare className="text-3xl" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
