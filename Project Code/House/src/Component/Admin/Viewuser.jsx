import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ViewRental, UpdateRental } from '../Actions/Admin';

const ViewRents = () => {
  const [page, setPage] = useState(1);
  const usersPerPage = 2;

  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const gettingRentals = (username) => {
    dispatch(ViewRental(username));
  };

  useEffect(() => {
    gettingRentals(username);
  }, [dispatch, username]);

  const users = useSelector((state) => state.Admin.users);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Users List</h2>
        <div className="relative">
          <input
            type="search"
            placeholder="Search users"
            name="username"
            value={username}
            onChange={handleChange}
            className="pl-4 pr-10 py-2 text-sm text-gray-700 border"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className="absolute top-2 left-44 cursor-pointer border-l-2 border-black"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>
      </div>

      {/* Display as a table on medium and large screens */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="px-4 py-2 text-left border border-gray-300">Profile</th>
              <th className="px-4 py-2 text-left border border-gray-300">Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Email</th>
              <th className="px-4 py-2 text-left border border-gray-300">Address</th>
              <th className="px-4 py-2 text-left border border-gray-300">Phone No.</th>
              <th className="px-4 py-2 text-left border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">
                    <img
                      src={`http://localhost:4000/uploads/rentals/${user.profilePic}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.address}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
                  {user.status === 'active' ? (
                    <td className="px-4 py-2 border border-gray-300">Approved</td>
                  ) : (
                    <td className="px-4 py-2 border border-gray-300">
                      <select
                        name="status"
                        onChange={(e) => dispatch(UpdateRental(e.target.value, user._id))}
                      >
                        <option value="">select</option>
                        <option value="active">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Display as a grid on small screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:hidden">
        {users &&
          users.slice(indexOfFirstUser, indexOfLastUser).map((user, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img
                src={`http://localhost:5000/uploads/Customer/${user.profilePic}`}
                alt={user.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.address}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end py-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => setPage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2"
          onClick={() => setPage(page < Math.ceil(users.length / usersPerPage) ? page + 1 : page)}
          disabled={page >= Math.ceil(users.length / usersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewRents;
