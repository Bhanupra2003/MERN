import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetHouse, DeleteHouse } from '../Actions/Rental';

const RentHouseGrid = () => {
  const dispatch = useDispatch();

  // Fetch houses from the API
  const rental = sessionStorage.getItem('rentals');
  const rentals = rental ? JSON.parse(rental) : null;

  useEffect(() => {
    if (rentals) {
      dispatch(GetHouse(rentals._id));
    }
  }, [dispatch, rentals]);

  const housess = useSelector((state) => state.Rental.houses);

  console.log(housess, "houses");

  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal and set the selected house
  const openModal = (house) => {
    setSelectedHouse(house);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHouse(null);
  };

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(DeleteHouse(id));
  };

  // Handle edit action (You can add more logic here for editing)
  const handleEdit = (id) => {
    window.location.href = `/rents/addhouse/${id}`;
  };

  return (
    <div className="container mx-auto p-4">
      <NavLink to={'/rents/addhouse'} className='text-xl font-serif border bg-blue-500 p-2 rounded-lg mb-3 text-white'>
        Add Rent House
      </NavLink>

      <h2 className="text-3xl font-bold mb-6 text-center">Rent House Grid</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {housess?.map((house, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            {/* House Image and title */}
            <img
              src={`http://localhost:4000/uploads/houses/${house.images[0]}`}
              alt={house.title}
              className="w-full h-48 object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(house)}
            />
            <h3 className="text-lg font-semibold mt-2">{house.title}</h3>
            <p className="text-gray-700"><strong>Location:</strong> {house.location}</p>
            <p className="text-gray-700"><strong>Price:</strong> ₹{house.price}/month</p>
            
            {/* Action buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(house._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(house._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for showing house details */}
      {isModalOpen && selectedHouse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">{selectedHouse.title}</h3>
            <img
              src={`http://localhost:4000/uploads/houses/${selectedHouse.images[0]}`}
              alt={selectedHouse.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Location:</strong> {selectedHouse.location}</p>
              <p><strong>Price:</strong> ₹{selectedHouse.price}/month</p>
              <p><strong>Type:</strong> {selectedHouse.type}</p>
              <p><strong>Bedrooms:</strong> {selectedHouse.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {selectedHouse.bathrooms}</p>
              <p><strong>Square Footage:</strong> {selectedHouse.squareFootage} sqft</p>
              <p><strong>Available From:</strong> {selectedHouse.availableFrom}</p>
              <p><strong>Deposit:</strong> ₹{selectedHouse.deposit}</p>
              <p><strong>Lease Term:</strong> {selectedHouse.leaseTerm}</p>
              <p><strong>Facilities:</strong> {selectedHouse.facilities.join(", ")}</p>
              <p><strong>Heating:</strong> {selectedHouse.heating}</p>
              <p><strong>Cooling:</strong> {selectedHouse.cooling}</p>
              <p><strong>Pet Policy:</strong> {selectedHouse.petPolicy}</p>
              <p><strong>Security:</strong> {selectedHouse.security}</p>
              <p><strong>Nearby Schools:</strong> {selectedHouse.nearbySchools}</p>
              <p><strong>Public Transport:</strong> {selectedHouse.publicTransport}</p>
              <p><strong>Shopping Centers:</strong> {selectedHouse.shoppingCenters}</p>
              <p><strong>Grocery Stores:</strong> {selectedHouse.groceryStores}</p>
              <p><strong>Contact:</strong> {selectedHouse.contact}</p>
              <p><strong>Website:</strong> <a href={`https://${selectedHouse.website}`} className="text-blue-600">{selectedHouse.website}</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentHouseGrid;
