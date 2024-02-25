import React, { useState, useRef, useEffect } from "react";
import dishes from "./data/dishes.json";
import axios from "axios"; 
import upimg from "../../assets/up.svg";
import downimg from "../../assets/down.svg";
import revenueimg from "../../assets/revenue.svg";
import dishorderimg from "../../assets/dishorder.svg";
import customerimg from "../../assets/Customer.svg";

function Dash() {
  const [revenue, setRevenue] = useState(0);
  const [dish, setDish] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [dashorders, setDashorders] = useState([]);
  useEffect(() => {
    const getDashorders = async () => {
      try {
        const res = await axios.get("/dashorders.json");
        const data = JSON.parse(res.data); 
        setDashorders(data);
      } catch (error) {
        console.error(error);
      }
    };
    getDashorders();
  }, []); 
  useEffect(() => {
    let totalRevenue = 0;
    dashorders.forEach((order) => {
      totalRevenue += order.price * order.quantity;
    });
    setRevenue(totalRevenue);
    let totalDish = 0;
    dishes.forEach((dish) => {
      totalDish += dish.stock;
    });
    setDish(totalDish);
    setCustomer(dashorders.length);
  }, [dashorders]); 
  const updateData = () => {
    const random = Math.floor(Math.random() * 21) - 10;
    setRevenue(revenue + random);
    setDish(dish - random);
    setCustomer(customer + random);
  };

  useEffect(() => {
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [revenue, dish, customer]);
  console.log(dashorders);
  return (
    <>
      <div className="Dash">
        <h1 className="text-3xl">Dashboard</h1>
        <h3>Tuesday, 2 Feb 2024</h3>
        <div className="boxes">
          <div className="box">
            <img src={revenueimg} alt="" />
            <h4>Total Revenue</h4>
            <p>{revenue} so'm</p>
            <p className={revenue > 0 ? "green" : "red"}>
              {revenue > 0 ? <img src={upimg} alt="" /> : <img src={downimg} />}
            </p>
          </div>
          <div className="box">
            <img src={dishorderimg} alt="" />
            <h4>Total Dish Ordered</h4>
            <p>{dish} ta</p>
            <p className={dish > 0 ? "green" : "red"}>
              {dish > 0 ? <img src={upimg} alt="" /> : <img src={downimg} />}
            </p>
          </div>
          <div className="box">
            <img src={customerimg} alt="" />
            <h4>Total Customer</h4>
            <p>{customer} ta</p>
            <p className={customer > 0 ? "green" : "red"}>
              {customer > 0 ? <img src={upimg} alt="" /> : <img src={downimg} />}
            </p>
          </div>
        </div>
        <div className="report">
          <h4>Order Report</h4>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Dish Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashorders.map((order) => (
                <tr key={order.id}>
                  <td>{order.customerId}</td>
                  <td>{order.dishName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price * order.quantity} so'm</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dash;
