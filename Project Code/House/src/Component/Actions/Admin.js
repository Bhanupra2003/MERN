import axios from "axios";
import { toast } from "react-toastify";
import {
  loginRequest, loginSuccess, loginFailure, viewrentalRequest, viewrentalSuccess, viewrentalFailure, updaterentalRequest, updaterentalSuccess, updaterentalFailure,
  viewcustomerRequest, viewcustomerSuccess, viewcustomerFailure, logoutrequest, logoutsuccess, logoutfailure,
  viewHouseFailure, viewHouseRequest, viewHouseSuccess, dashboardFailure, dashboardRequest, dashboardSuccess
} from "../Slice/Admin";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const res = await axios.post('/api/admin/login', { email, password });
    dispatch(loginSuccess(res.data));

    if (Array.isArray(res.data.message)) {
      res.data.message.forEach((mes) => toast.success(mes));
    }

    setTimeout(() => {
      window.location.href = '/admin/dashboard';
    }, 1000);

  }
  catch (error) {
    const errorMessage = error.response?.data?.message || ["An unexpected error occurred."];
    dispatch(loginFailure({ message: errorMessage }));

    if (Array.isArray(errorMessage)) {
      errorMessage.forEach((err) => toast.error(err));
    } else {
      toast.error(errorMessage);
    }
  }
};




 

export const ViewRental = (name) => async (dispatch) => {
  try {
    dispatch(viewrentalRequest());
    const res = await axios.get(`/api/admin/rentals?name=${name}`);
    dispatch(viewrentalSuccess(res.data));
    res.data.message.forEach((mes) => toast.success(mes));
  } catch (error) {
    dispatch(viewrentalFailure(error));
    error.response.data.message.forEach((err) => toast.error(err));
  }
};

export const UpdateRental = (data, id) => async (dispatch) => {
  try {
    dispatch(updaterentalRequest());
    const res = await axios.put(`/api/admin/rental/${id}`, {
      status: data
    });
    dispatch(updaterentalSuccess(res.data));
    res.data.message.forEach((mes) => toast.success(mes));
  } catch (error) {
    dispatch(updaterentalFailure(error));
    error.response.data.message.forEach((err) => toast.error(err));
  }
};

export const ViewCustomer = (name) => async (dispatch) => {
  try {
    dispatch(viewcustomerRequest());
    const res = await axios.get(`/api/admin/customers?name=${name}`);
    dispatch(viewcustomerSuccess(res.data));
    res.data.message.forEach((mes) => toast.success(mes));
  } catch (error) {
    dispatch(viewcustomerFailure(error));
    error.response.data.message.forEach((err) => toast.error(err));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutrequest());
    const res = await axios.post('/api/admin/logout');
    dispatch(logoutsuccess(res.data));
    res.data.message.forEach((mes) => toast.success(mes));
    window.location.href = '/';
  } catch (error) {
    dispatch(logoutfailure(error));
    error.response.data.message.forEach((err) => toast.error(err));
  }
};

export const ViewHouse = () => async (dispatch) => {
  try {
    dispatch(viewHouseRequest());
    const res = await axios.get('/api/admin/apartments');
    dispatch(viewHouseSuccess(res.data));
    res.data.message.forEach((mes) => toast.success(mes));
  } catch (error) {
    dispatch(viewHouseFailure(error));
    error.response.data.message.forEach((err) => toast.error(err));
  }
};

export const UpdateHouse = (status, id) => async (dispatch) => {
  try {
    dispatch(viewHouseRequest());
    const res = await axios.put(`/api/admin/apartment/${id}`, { status });
    dispatch(viewHouseSuccess(res.data));
    res.data.message.forEach((mes) => toast.success(mes));
  } catch (error) {
    dispatch(viewHouseFailure(error));
    error.response.data.message.forEach((err) => toast.error(err));
  }
};

export const dashboards = () => async (dispatch) => {
  console.log('dashboard');
  try {
    dispatch(dashboardRequest());
    const res = await axios.get('/api/admin/dashboard');
    dispatch(dashboardSuccess(res.data));
    console.log(res);
    res.data.message.forEach((mes) => toast.success(mes));
  } catch (error) {
    dispatch(dashboardFailure(error));
    error.response.data.message.forEach((err) => toast.error(err));
  }
};
