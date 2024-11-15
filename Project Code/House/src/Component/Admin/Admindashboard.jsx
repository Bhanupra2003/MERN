import React, { useEffect } from "react";
import Chart from 'react-apexcharts'; 
import { useDispatch, useSelector } from "react-redux";
import { dashboards as fetchDashboards } from "../Actions/Admin";

const Admindashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboards());
  }, [dispatch]);

  const dashboards = useSelector((state) => state.Admin.dashboard);

  // Dummy data (used when dashboards data is not available)
  const dummyData = {
    movies: 100,
    ratings: 250,
    users: 150,
    orders: 200,
    appartmentMonthwise: [
      { _id: 1, count: 20 },
      { _id: 2, count: 30 },
      { _id: 3, count: 25 },
      { _id: 4, count: 50 },
      { _id: 5, count: 45 },
      { _id: 6, count: 40 },
    ],
    rentalmonthwise: [
      { _id: 1, count: 10 },
      { _id: 2, count: 15 },
      { _id: 3, count: 5 },
      { _id: 4, count: 25 },
      { _id: 5, count: 20 },
      { _id: 6, count: 15 },
    ],
    customerMonthwise: [
      { _id: 1, count: 10 },
      { _id: 2, count: 20 },
      { _id: 3, count: 15 },
      { _id: 4, count: 30 },
      { _id: 5, count: 25 },
      { _id: 6, count: 20 },
    ],
    rental: 120,
    customer: 80,
    appartment: 90,
  };

  // Use dashboards if available, otherwise use dummy data
  const data = dashboards || dummyData;

  const summaryData = [
    { title: 'No. of rents', value: data?.rental || 0 },
    { title: 'No. of users', value: data?.customer || 0 },
    { title: 'No. of houses', value: data?.appartment || 0 },
  ];

  const chartOptions1 = {
    chart: {
      type: 'line',
      height: 350,
    },
    series: [{
      name: 'Appartment Monthwise',
      data: data?.appartmentMonthwise?.map((item) => item.count) || []
    }],
    xaxis: {
      categories: data?.appartmentMonthwise?.map((item) => item._id) || []
    }
  };

  const chartOptions2 = {
    chart: {
      type: 'bar',
      height: 350,
    },
    series: [{
      name: 'Offer Data',
      data: data?.rentalmonthwise?.map((item) => item.count) || []
    }],
    xaxis: {
      categories: data?.rentalmonthwise?.map((item) => item._id) || []
    }
  };

  const chartOptions3 = {
    chart: {
      type: 'area',
      height: 350,
    },
    series: [{
      name: 'Customers',
      data: data?.customerMonthwise?.map((item) => item.count) || []
    }],
    xaxis: {
      categories: data?.customerMonthwise?.map((item) => item._id) || []
    }
  };

  const chartOptions4 = {
    chart: {
      type: 'pie',
      height: 350,
    },
    series: [data?.rental, data?.customer, data?.appartment].filter(item => item !== undefined),
    labels: ['No. of Rents', 'No. of Users', 'No. of Houses'],
  };

  return (
    <div className="dashboard p-4 overflow-auto">
      <div className="summary-row grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div className="summary-box bg-white shadow-lg rounded-lg p-6 text-center" key={index}>
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="card-column grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions1} series={chartOptions1.series} type={chartOptions1.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions2} series={chartOptions2.series} type={chartOptions2.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions3} series={chartOptions3.series} type={chartOptions3.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions4} series={chartOptions4.series} type={chartOptions4.chart.type} />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
