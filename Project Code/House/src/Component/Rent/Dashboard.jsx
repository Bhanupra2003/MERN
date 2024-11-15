// src/Dashboard.js
import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { dashboardss } from '../Actions/Rental';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const rental = sessionStorage.getItem('rentals');
  const rentals = JSON.parse(rental || '{}');

  useEffect(() => {
    dispatch(dashboardss(rentals._id));
  }, [dispatch, rentals._id]);

  const dashboards = useSelector((state) => state.Rental.dashboard);

  // Dummy data to use if dashboards are not available
  const dummyData = {
    totalRentals: 10,
    totalBookings: 20,
    monthWiseBookings: [
      { _id: 'Jan', count: 5 },
      { _id: 'Feb', count: 8 },
      { _id: 'Mar', count: 6 },
      { _id: 'Apr', count: 12 },
      { _id: 'May', count: 7 },
    ],
    monthWiseRentals: [
      { _id: 'Jan', count: 4 },
      { _id: 'Feb', count: 9 },
      { _id: 'Mar', count: 5 },
      { _id: 'Apr', count: 11 },
      { _id: 'May', count: 6 },
    ],
  };

  const data = dashboards || dummyData;

  const summaryData = [
    { title: 'No. of house', value: data.totalRentals },
    { title: 'No. of booking', value: data.totalBookings },
  ];

  const chartOptions2 = {
    chart: {
      type: 'bar',
      height: 350,
    },
    series: [{
      name: 'MonthWise Bookings',
      data: data.monthWiseBookings.map((item) => item.count),
    }],
    xaxis: {
      categories: data.monthWiseBookings.map((item) => item._id),
    },
  };

  const chartOptions3 = {
    chart: {
      type: 'area',
      height: 350,
    },
    series: [{
      name: 'MonthWise Rentals',
      data: data.monthWiseRentals.map((item) => item.count),
    }],
    xaxis: {
      categories: data.monthWiseRentals.map((item) => item._id),
    },
  };

  const chartOptions4 = {
    chart: {
      type: 'pie',
      height: 350,
    },
    series: [data.totalRentals, data.totalBookings],
    labels: ['No. of house', 'No. of booking'],
  };

  return (
    <div className="dashboard p-4 overflow-auto">
      <div className="summary-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div className="summary-box bg-white shadow-lg rounded-lg p-6 text-center" key={index}>
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="card-column grid grid-cols-1 md:grid-cols-2 gap-4">
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
}

export default Dashboard;
