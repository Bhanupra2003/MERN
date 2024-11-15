import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ViewHouse, UpdateHouse } from '../Actions/Admin';

const HouseDetails = () => {
  const dispatch = useDispatch();

  const changeStatus = (id, newStatus) => {
    dispatch(UpdateHouse(newStatus, id));
  };

  useEffect(() => {
    dispatch(ViewHouse());
  }, [dispatch]);

  const house = useSelector((state) => state.Admin.adminhouses);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">House Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-3 px-4">S No</th>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Address</th>
              <th className="text-left py-3 px-4">House Title</th>
              <th className="text-left py-3 px-4">Deposit</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {house?.map((house, index) => (
              <tr key={house.id} className="border-t border-gray-300">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  <img
                    src={`http://localhost:4000/uploads/houses/${house?.images[0]}`}
                    alt="House"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{house.location}</td>
                <td className="py-3 px-4">{house.title}</td>
                <td className="py-3 px-4">{house.deposit}</td>
                <td className="py-3 px-4">{house.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      house.adminstatus === 'Approved'
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {house.adminstatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      changeStatus(
                        house._id,
                        house.adminstatus === 'Pending' ? 'Approved' : 'Pending'
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {house.adminstatus === 'Pending' ? 'Approve' : 'Revoke'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseDetails;
