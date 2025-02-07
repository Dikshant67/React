import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function Header() {
  return (
    <header className="header footer">
      <h1> Fast React Pizza Co.</h1>
    </header>
  );
}
function Footer() {
  const hour = new Date().getHours();

  const openHour = 20;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>We're currently Closed for orders</p>
      )}
      <div className="order">
        <button className="btn">Order</button>
      </div>
    </footer>
  );
  // if (hour >= openHour && hour <= closeHour) alert("We are currently Open!!  ");
  // else alert("We are currently Closed!!");
  // if (isOpen) {
  //   return (
  //     <footer className="footer">
  //       {new Date().toLocaleTimeString()}. We're currently open for orders`
  //     </footer>
  //   );
  // } else {
  //   return (
  //     <footer className="footer">
  //       {new Date().toLocaleTimeString()}. We're currently Closed for orders`
  //     </footer>
  //   );
  // }

  // return React.createElement("footer", null, "We're currently open for orders");
}
function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open for orders from {openHour}.00 to {closeHour}.00
      </p>
    </div>
  );
}
function Menu() {
  const pizzas = pizzaData;
  const noOfPizza = pizzas.length;
  // const pizzaData =
  return (
    <div className="menu">
      <h2>Our Menu </h2>
      {/* {pizzaData.map((pizza) => (
        <Pizza key={pizza.name} {...pizza} />
        ))} */}
      {noOfPizza > 0 && (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name}></Pizza>
            ))}
          </ul>
        </>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="/pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza funghi"
        ingredients="Tomato, mozarella, mushrooms, and onion"
        photoName="/pizzas/funghi.jpg"
        price={100}
      /> */}
    </div>
  );
}
function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <div>
        <img
          // eslint-disable-next-line no-octal-escape
          src={pizzaObj.photoName}
          alt={pizzaObj.name}
        />
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients} </p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//React before 18
// React.render(<App/>);
//React strict mode is used to make sure that we are using
//all the updated parts of react api and to check the bugs in the
//application,renders twice
