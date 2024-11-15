import axios from 'axios';
import {
    registerRequest, registerSuccess, registerFailure,
    loginRequest, loginSuccess, loginFailure,
    profileRequest, profileSuccess, profileFailure,
    updateProfileRequest, updateProfileSuccess, updateProfileFailure,
    houseRequest, houseSuccess, houseFailure,
    houseDetailRequest, houseDetailSuccess, houseDetailFailure,
    addhouseRequest, addhouseSuccess, addhouseFailure,
    updatehouseRequest, updatehouseSuccess, updatehouseFailure,
    deletehouseRequest, deletehouseSuccess, deletehouseFailure,
    bookhouseRequest, bookhouseSuccess, bookhouseFailure,
    changepasswordRequest, changepasswordSuccess, changepasswordFailure,
    logoutRequest, logoutSuccess, logoutFailure,
    dashboardRequest, dashboardSuccess, dashboardFailure
} from '../Slice/Rental';
import { toast } from 'react-toastify';

// Setting a base URL for axios
axios.defaults.baseURL = 'http://localhost:5000/api/rental';

// Helper function to handle errors
const handleError = (error, dispatch, failureAction) => {
    dispatch(failureAction(error.message));
    if (error.response?.data?.message) {
        error.response.data.message.forEach(err => toast.error(err));
    } else {
        toast.error(error.message);
    }
};

// Register
export const register = (data) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post('/register', data);
        dispatch(registerSuccess(response.data));
        response.data.message.forEach(mes => toast.success(mes));
        window.location.href = '/rent/login';
    } catch (error) {
        handleError(error, dispatch, registerFailure);
    }
};

// Login
export const Login = (email, password) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post('/login', { email, password });
        dispatch(loginSuccess(response.data));
        sessionStorage.setItem('rentals', JSON.stringify(response.data.data));
        response.data.message.forEach(mes => toast.success(mes));
        window.location.href = '/rents/dashboard';
    } catch (error) {
        handleError(error, dispatch, loginFailure);
    }
};

// Profile
export const Profile = (id) => async (dispatch) => {
    dispatch(profileRequest());
    try {
        const response = await axios.get(`/profile/${id}`);
        dispatch(profileSuccess(response.data));
    } catch (error) {
        handleError(error, dispatch, profileFailure);
    }
};

// Update Profile
export const UpdateProfile = (data, id) => async (dispatch) => {
    dispatch(updateProfileRequest());
    try {
        const response = await axios.put(`/updateprofile/${id}`, data);
        dispatch(updateProfileSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rent/dashboard';
    } catch (error) {
        handleError(error, dispatch, updateProfileFailure);
    }
};

// Add House
export const AddHouse = (data, id) => async (dispatch) => {
    dispatch(addhouseRequest());
    try {
        const response = await axios.post(`/addhouse/${id}`, data);
        dispatch(addhouseSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/dashboard';
    } catch (error) {
        handleError(error, dispatch, addhouseFailure);
    }
};

// Get House
export const GetHouse = (id) => async (dispatch) => {
    dispatch(houseRequest());
    try {
        const response = await axios.get(`/houses/${id}`);
        dispatch(houseSuccess(response.data));
    } catch (error) {
        handleError(error, dispatch, houseFailure);
    }
};

// House Detail
export const HouseDetail = (id) => async (dispatch) => {
    dispatch(houseDetailRequest());
    try {
        const response = await axios.get(`/housedetail/${id}`);
        dispatch(houseDetailSuccess(response.data));
    } catch (error) {
        handleError(error, dispatch, houseDetailFailure);
    }
};

// Update House
export const UpdateHouse = (data, id) => async (dispatch) => {
    dispatch(updatehouseRequest());
    try {
        const response = await axios.put(`/house/${id}`, data);
        dispatch(updatehouseSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/dashboard';
    } catch (error) {
        handleError(error, dispatch, updatehouseFailure);
    }
};

// Delete House
export const DeleteHouse = (id) => async (dispatch) => {
    dispatch(deletehouseRequest());
    try {
        const response = await axios.delete(`/deletehouse/${id}`);
        dispatch(deletehouseSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/viewhouse';
    } catch (error) {
        handleError(error, dispatch, deletehouseFailure);
    }
};

// Book House
export const bookHouse = (id) => async (dispatch) => {
    dispatch(bookhouseRequest());
    try {
        const response = await axios.get(`/booking/${id}`);
        dispatch(bookhouseSuccess(response.data));
        toast.success(response.data.message);
    } catch (error) {
        handleError(error, dispatch, bookhouseFailure);
    }
};

// Change Password
export const ChangePassword = (id, data) => async (dispatch) => {
    dispatch(changepasswordRequest());
    try {
        const response = await axios.put(`/changepassword/${id}`, data);
        dispatch(changepasswordSuccess(response.data));
        toast.success(response.data.message);
        window.location.href = '/rents/dashboard';
    } catch (error) {
        handleError(error, dispatch, changepasswordFailure);
    }
};

// Logout
export const logout = () => async (dispatch) => {
    dispatch(logoutRequest());
    try {
        const response = await axios.delete('/logout');
        dispatch(logoutSuccess(response.data));
        response.data.message.forEach(mes => toast.success(mes));
        sessionStorage.removeItem('rentals');
        window.location.href = '/';
    } catch (error) {
        handleError(error, dispatch, logoutFailure);
    }
};

// Dashboard
export const dashboardss = (id) => async (dispatch) => {
    dispatch(dashboardRequest());
    try {
        const response = await axios.get(`/dashboard/${id}`);
        dispatch(dashboardSuccess(response.data));
    } catch (error) {
        handleError(error, dispatch, dashboardFailure);
    }
};
