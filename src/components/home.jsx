import React, { useState, useRef, useEffect } from "react";
import Dash from "./dashboard";
import deleteimg from "../../assets/delete.svg"
import dishes from "./data/dishes.json";
const categories = [
  "Shirinlik",
  "Tovuq",
  "Gosht",
  "Osh",
  "Makaron",
  "Kebab",
  "Sut",
  "Non",
  "Ichimlik",
  "Baliq"
];
function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(false); 
  const searchRef = useRef();
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearch("");
    searchRef.current.value = "";
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleOrderClick = (dish) => {
    const index = orders.findIndex((order) => order.id === dish.id);
    if (index !== -1) {
      const newOrders = [...orders];
      newOrders[index].quantity++;
      setOrders(newOrders);
    } else {
      setOrders([...orders, { ...dish, quantity: 1 }]);
    }
    setTotal(total + dish.price);
  };
  const handleDeleteClick = (order) => {
    const newOrders = orders.filter((o) => o.id !== order.id);
    setOrders(newOrders);
    setTotal(total - order.price * order.quantity);
  };
  const handleContinueClick = () => {
    if (orders.length > 0) {
      setPayment(true);
    } else {
      alert("Iltimos, avval nima buyurtma qiling.");
    }
  };
  const handleBackClick = () => {
    setPayment(false);
  };
  const handleConfirmClick = () => {
    alert(`Sizning umumiy summaingiz ${total} so'm. Buyurtmangiz uchun rahmat!`);
    setOrders([]);
    setTotal(0);
    setPayment(false);
  };
  const filteredDishes = dishes.filter(
    (dish) =>
      (category === "All" || dish.category === category) &&
      dish.name.toLowerCase().includes(search.toLowerCase())
  );
 return (
    <>
      <div className="Home">
        <div className="flex">
        <div>
        <h1 className="text-3xl">Jaegar Resto</h1>
        <h3>Tuesday, 2 Feb 2024</h3></div>
        <div className="search">
          <input
            type="text"
            placeholder="Qidirish..."
            ref={searchRef}
            onChange={handleSearchChange}
          />
        </div></div>
        <div className="categories mt-6 mb-6">
          <button
            className={category === "All" ? "active" : ""}
            onClick={() => handleCategoryChange("All")}
          >
            Barchasi
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
            <div className="dishes">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="dish"><button onClick={() => handleOrderClick(dish)}>
              <img className="mb-2" src={dish.image} alt={dish.name} />
              <h2 className="text-2xl mb-2">{dish.name}</h2>
              <p className="text-base">{dish.price} so'm</p>
              <p className="text-base">{dish.stock} ta bor</p>
              </button>
            </div>
          ))}
        </div>
        <div className="Order">
          {payment ? ( 
            <div className="payment">
              <h4 className="text-5xl mb-4">To'lov</h4>
              <p>Umumiy: {total} so'm</p>
              <button style={{width: "77px", height: "34px", background: "#EA7C69",  marginTop: "10px"}} onClick={handleBackClick}>Ortga</button>
              <button style={{width: "88px", height: "34px", background: "#EA7C69",  marginLeft: "10px"}} onClick={handleConfirmClick}>Tasdiqlash</button>
            </div>
          ) : ( 
            <div className="Order">
                <h2 className="mb-2">Orders #34562</h2>
              <div className="order-buttons">
                <button>Dine In</button>
                <button>To Go</button>
                <button>Delivery</button>
              </div>
              <div className="list" style={{overflowY: "scroll", }}> 
                {orders.map((order) => (
                  <div key={order.id} className="order">
                    <div className="flex ">
              <img src={order.image} alt={order.name} />
                   <h4>{order.name}</h4></div>
                    <p>{order.price} so'm x {order.quantity} = {order.price * order.quantity} so'm</p>
                    <div className="flex items-center gap-x-4">
                     <label htmlFor="">
                     <input type="text" placeholder="Qo'shimcha izoh..." /> 
                    </label>
                    <button onClick={() => handleDeleteClick(order)}><img src={deleteimg} /></button>
                    </div>
                    
                  </div>
                ))}
              </div>
              <div className="summary">
                <p>Chegirma:                0 so'm</p>
                <p>Umumiy:                  {total} so'm</p>
                <button className="topay-btn" onClick={handleContinueClick}>To'lovga o'tish</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;