// src/BookingTable.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookHouse } from '../Actions/Rental';

const BookingTable = () => {
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();
    const rental = JSON.parse(sessionStorage.getItem('rentals') || '{}');

    useEffect(() => {
        dispatch(bookHouse(rental._id));
    }, [dispatch, rental._id]);

    const booking = useSelector((state) => state.Rental.bookings);

    const formatDate = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Filter by house name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">House Name</th>
                        <th className="py-2 px-4 border-b">Customer Name</th>
                        <th className="py-2 px-4 border-b">Customer Mobile</th>
                        <th className="py-2 px-4 border-b">Customer Email</th>
                        <th className="py-2 px-4 border-b">Booking Date</th>
                    </tr>
                </thead>
                <tbody>
                    {booking && booking.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">
                                <img src={`http://localhost:4000/uploads/houses/${booking.apartment?.images[0]}`} alt={booking.houseName} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="py-2 px-4 border-b">{booking?.apartment.title}</td>
                            <td className="py-2 px-4 border-b">{booking.customerName}</td>
                            <td className="py-2 px-4 border-b">{booking.phone}</td>
                            <td className="py-2 px-4 border-b">{booking.email}</td>
                            <td className="py-2 px-4 border-b">{formatDate(booking.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;
