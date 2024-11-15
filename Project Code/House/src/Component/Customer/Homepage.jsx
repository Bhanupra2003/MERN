import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import 'animate.css'; // Import Animate.css
import Customernavbar from './Customernavbar';
import { useDispatch, useSelector } from 'react-redux';
import { ViewHouse } from '../Actions/Customer';

const Homepage = () => {
  const [animateBooks, setAnimateBooks] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (!animateBooks) {
        setAnimateBooks(true);
      }
    };

    const booksSection = document.querySelector('.books-section');
    if (booksSection) {
      booksSection.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      if (booksSection) {
        booksSection.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [animateBooks]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewHouse());
  }, [dispatch]);

  const housess = useSelector((state) => state.Customer.house);

  const viewDetails = (id) => {
    window.location.href = `/housedetail/${id}`;
  }

  return (
    <div className="m-0 p-0">
      <Customernavbar />
      <div className="relative">
        <div className="mt-24 flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 px-4">
          <img src="/app.png" className="mt-8 sm:mt-0 w-full max-w-xs sm:max-w-full sm:max-h-[500px] rounded-2xl object-cover p-4" />
        </div>

        <div className="container mx-auto mt-16">
          <h2 className="text-4xl font-bold text-center mb-10">Rent Houses</h2>
          <div className="flex flex-wrap -mx-4">
            {housess && housess.map((house) => (
              <div className="w-full sm:w-1/3 p-4" key={house._id}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  {/* Slick carousel for house images */}
                  <Slider {...settings}>
                    {house.images.map((image, index) => (
                      <div key={index}>
                        <img src={`http://localhost:4000/uploads/houses/${image}`} alt={house.title} className="w-full h-48 object-cover cursor-pointer" onClick={() => viewDetails(house._id)} />
                      </div>
                    ))}
                  </Slider>
                  <div className="p-4">
                    <h4 className="text-xl font-semibold">{house.title}</h4>
                    <p className="text-gray-700">{house.location}</p>
                    <p className="text-gray-900 font-bold">{house.price}</p>
                    <p className="text-gray-600 mt-2">{house.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { window.location.href = '/searchbook' }} className="bg-blue-500 mb-4 text-white px-4 py-2 mt-4 rounded-lg">View All Houses</button>
        </div>

        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-bold">Company Name</h3>
                <p className="text-sm">Your tagline or slogan here.</p>
              </div>
              <div className="mb-4 md:mb-0">
                <h4 className="text-md font-semibold">Links</h4>
                <ul className="text-sm">
                  <li><a href="#" className="hover:underline">Home</a></li>
                  <li><a href="#" className="hover:underline">About Us</a></li>
                  <li><a href="#" className="hover:underline">Services</a></li>
                  <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="hover:underline">Facebook</a>
                  <a href="#" className="hover:underline">Twitter</a>
                  <a href="#" className="hover:underline">Instagram</a>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-600 pt-4 text-center">
              <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
