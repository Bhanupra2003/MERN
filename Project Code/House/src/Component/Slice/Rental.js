import { createSlice } from "@reduxjs/toolkit";

const RentalSlice = createSlice({
    name: "Rental",
    initialState: {
        loading: false,
    },
    reducers: {
        registerRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        registerSuccess: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        registerFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        loginRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        loginSuccess: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        loginFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        profileRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        profileSuccess: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        profileFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        viewHouseRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        viewHouseSuccess: (state, actions) => {
            console.log(actions.payload.data, 'payload');
            return {
                ...state,
                loading: false,
                house: actions.payload.data
            };
        },
        viewHouseFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        updateProfileRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        updateProfileSuccess: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        updateProfileFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        viewhousedetailsRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        viewhousedetailsSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                detailshouse: actions.payload.data
            };
        },
        addhouseRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        addhouseSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                house: actions.payload.data // You can modify this as per your requirements
            };
        },
        addhouseFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        viewhousedetailsFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        bookHouseRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        bookHouseSuccess: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        bookHouseFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        viewBookingRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        viewBookingSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                bookings: actions.payload.data
            };
        },
        viewBookingFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        logoutRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        logoutSuccess: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        logoutFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        changepasswordRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        changepasswordSuccess: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        changepasswordFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
        searchRequest: (state) => {
            return {
                ...state,
                loading: true
            };
        },
        searchSuccess: (state, actions) => {
            return {
                ...state,
                loading: false,
                search: actions.payload.data
            };
        },
        searchFailure: (state) => {
            return {
                ...state,
                loading: false
            };
        },
    }
});

const { reducer, actions } = RentalSlice;

export const { 
    registerRequest, registerSuccess, registerFailure, 
    loginRequest, loginSuccess, loginFailure, 
    profileRequest, profileSuccess, profileFailure, 
    viewHouseRequest, viewHouseSuccess, viewHouseFailure, 
    updateProfileRequest, updateProfileSuccess, updateProfileFailure, 
    viewhousedetailsRequest, viewhousedetailsSuccess, viewhousedetailsFailure, 
    bookhouseRequest, bookhouseSuccess, bookhouseFailure, 
    viewBookingRequest, viewBookingSuccess, viewBookingFailure, 
    logoutRequest, logoutSuccess, logoutFailure, 
    changepasswordFailure, changepasswordRequest, changepasswordSuccess, 
    searchFailure, searchRequest, searchSuccess,dashboardRequest, dashboardSuccess, dashboardFailure,
    addhouseRequest, addhouseSuccess, addhouseFailure,houseRequest,deletehouseRequest, deletehouseSuccess, deletehouseFailure,
    houseSuccess,houseDetailRequest, houseDetailSuccess, houseDetailFailure,updatehouseRequest, updatehouseSuccess, updatehouseFailure,
    houseFailure,// Add these new actions here
} = actions;

export default reducer;