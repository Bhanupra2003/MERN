import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ViewBooking } from '../Actions/Customer';
import Customernavbar from './Customernavbar';

const RentHistory = () => {
    const dispatch = useDispatch();
    const customer = JSON.parse(sessionStorage.getItem('customer') || '{}');

    // Fetching booking data on component mount
    useEffect(() => {
        if (customer?.data?._id) {
            dispatch(ViewBooking(customer.data._id));
        }
    }, [dispatch, customer]);

    const booking = useSelector((state) => state.Customer.bookings);

    // Formatting date
    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toDateString();
    };

    return (
        <div>
            <Customernavbar />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Rent History</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {booking && booking.map((history) => (
                        <div key={history.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                            {/* Display house image */}
                            <img
                                src={`http://localhost:4000/uploads/houses/${history?.apartment?.images[0]}`}
                                alt={history?.apartment?.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">{history?.apartment?.title}</h3>
                            <p className="text-gray-600 mb-1">
                                <strong>Rent Date:</strong> {formatDate(history.createdAt)}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Mobile No:</strong> {history?.apartment?.contact}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Location:</strong> {history?.apartment?.location}
                            </p>
                            <p className="text-gray-600">
                                <strong>Rent Price:</strong> {history?.apartment?.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RentHistory;
