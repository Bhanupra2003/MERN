import { useState } from 'react';
import Navbar from './Navbar';
import { register } from '../Actions/Customer';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("profile", image);
    
    dispatch(register(data));

    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    });
    setImage(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center p-6 mt-12 bg-gradient-to-r from-gray-100 to-blue-100 rounded-lg shadow-xl">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 w-full mt-6 md:mt-0 mr-2">
          <img
            src="/Register.jpeg"
            alt="Registration"
            className="w-full h-auto rounded-lg shadow-md transform transition duration-500 hover:scale-105"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full md:mr-4 mt-24 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleImage}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Company Info */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-extrabold">Company Name</h3>
              <p className="text-sm mt-2">Your tagline or slogan here.</p>
            </div>

            {/* Links Section */}
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition duration-300">Home</a></li>
                <li><a href="#" className="hover:text-blue-400 transition duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition duration-300">Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition duration-300">Contact</a></li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition duration-300">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="#" className="hover:text-blue-400 transition duration-300">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
                <a href="#" className="hover:text-blue-400 transition duration-300">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
