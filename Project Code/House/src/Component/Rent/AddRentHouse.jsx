import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddHouse, UpdateHouse } from '../Actions/Rental';
import { useParams } from 'react-router-dom';

const AddRentHouse = () => {
    const [houseDetails, setHouseDetails] = useState({
        title: "",
        price: "",
        location: "",
        type: "",
        facilities: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        squareFootage: "",
        availableFrom: "",
        parkingAvailable: "",
        petPolicy: "",
        heating: "",
        cooling: "",
        deposit: "",
        leaseTerm: "",
        nearbySchools: "",
        publicTransport: "",
        shoppingCenters: "",
        groceryStores: "",
        security: "",
        contact: "",
        website: ""
    });

    const handleInputChange = (e) => {
        setHouseDetails({ ...houseDetails, [e.target.name]: e.target.value });
    };

    const [images, setImages] = useState(null);

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const dispatch = useDispatch();

    const rental = sessionStorage.getItem('rentals');
    const ids = rental ? JSON.parse(rental) : null;
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', houseDetails.title);
        data.append('price', houseDetails.price);
        data.append('location', houseDetails.location);
        data.append('type', houseDetails.type);
        data.append('facilities', houseDetails.facilities);
        images && Array.from(images).forEach((image) => data.append('images', image));
        data.append('description', houseDetails.description);
        data.append('bedrooms', houseDetails.bedrooms);
        data.append('bathrooms', houseDetails.bathrooms);
        data.append('squareFootage', houseDetails.squareFootage);
        data.append('availableFrom', houseDetails.availableFrom);
        data.append('parkingAvailable', houseDetails.parkingAvailable);
        data.append('petPolicy', houseDetails.petPolicy);
        data.append('heating', houseDetails.heating);
        data.append('cooling', houseDetails.cooling);
        data.append('deposit', houseDetails.deposit);
        data.append('leaseTerm', houseDetails.leaseTerm);
        data.append('nearbySchools', houseDetails.nearbySchools);
        data.append('publicTransport', houseDetails.publicTransport);
        data.append('shoppingCenters', houseDetails.shoppingCenters);
        data.append('groceryStores', houseDetails.groceryStores);
        data.append('security', houseDetails.security);
        data.append('contact', houseDetails.contact);
        data.append('website', houseDetails.website);

        if (id) {
            dispatch(UpdateHouse(data, id));
        } else {
            dispatch(AddHouse(data, ids._id));
        }
    };

    const title = id ? "Update Rent House" : "Add Rent House";

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div>
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={houseDetails.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="1BHK Apartment in Mumbai"
                        required
                    />
                </div>
                {/* Repeat other form fields as in original component */}
                <div>
                    <label className="block mb-2">Images </label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="/house1.png, /house2.png"
                    />
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        {id ? "Update House" : "Add House"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRentHouse;
