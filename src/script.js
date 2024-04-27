import React, { useState, useEffect } from "react";
import items from "./products.json";
import companyLogo from "./company_logo.png";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [showCart, setShowCart] = useState(false); // State to control cart screen visibility
  const [orderConfirmed, setOrderConfirmed] = useState(false); // State to track order confirmation

  useEffect(() => {
    total();
  }, [cart]);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  // Function to calculate the quantity of a specific item in the cart
  const calculateQuantity = (id) => {
    return cart.filter((item) => item.id === id).length;
  };

  // Function to get a list of unique items in the cart along with their quantities
  const getUniqueItems = () => {
    const uniqueItems = cart.reduce((acc, curr) => {
      if (!acc.find((item) => item.id === curr.id)) {
        acc.push({
          id: curr.id,
          title: curr.title,
          price: curr.price,
          image: curr.image,
          quantity: calculateQuantity(curr.id),
        });
      }
      return acc;
    }, []);
    return uniqueItems;
  };

  const cartItems = getUniqueItems().map((el) => (
    <div key={el.id}>
      <img className="img-fluid" src={el.image} width={150} alt={el.title} />
      <span>
        {el.title} - ${el.price} (Quantity: {el.quantity})
      </span>
      <button onClick={() => removeFromCart(el)} className="btn btn-pink">
        <span className="button-text">Remove</span>
      </button>
    </div>
  ));

  const listItems = filteredItems.map((el) => (
    <div className="row border-top border-bottom" key={el.id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={el.image} alt={el.title} />
        </div>
        <div className="col">
          <div className="product-name">{el.title}</div>
          <div className="row">{el.category}</div>
        </div>
        <div className="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
            className="btn btn-pink"
          >
            {" "}
            <span style={{ fontWeight: "bold" }} className="button-text">
              -
            </span>{" "}
          </button>{" "}
          <button
            type="button"
            variant="light"
            onClick={() => addToCart(el)}
            className="btn btn-blue"
          >
            {" "}
            <span style={{ fontWeight: "bold" }} className="button-text">
              +
            </span>{" "}
          </button>
        </div>
        <div className="col">
          ${el.price} <span className="close">&#10005;</span>
          {calculateQuantity(el.id)}
        </div>
      </div>
    </div>
  ));

  // Function to handle checkout button click
  const handleCheckout = () => {
    setShowCart(true); // Switch to cart screen
  };

  // Function to handle return button click
  const handleReturn = () => {
    setShowCart(false); // Switch back to browse screen
  };

  // Define handleSubmit function
  const handleSubmit = () => {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const address = document.getElementById("address").value;
    const address2 = document.getElementById("address2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    // Validation checks
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }
    if (!city.trim()) {
      alert("Please enter your city.");
      return;
    }
    if (!state.trim()) {
      alert("Please enter your state.");
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      alert("Please enter a valid 5-digit zip code.");
      return;
    }

    // If all validations pass, submit the order
    submitOrder();
  };

  // Define submitOrder function
  const submitOrder = () => {
    // Placeholder function for submitting the order
    setOrderConfirmed(true); // Set the order confirmation state to true
  };

  // Function to handle return to browsing and clear cart
  const handleReturnToBrowsing = () => {
    setShowCart(false); // Switch back to browse screen
    setCart([]); // Clear the cart
    setOrderConfirmed(false); // Reset order confirmation state
  };

  if (orderConfirmed) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={companyLogo} alt="Company Logo" style={{ width: "100%" }} />{" "}
        <h2>Order Confirmed!</h2>
        <p>Congratulations on your purchase!</p>
        <p>Items Purchased:</p>
        <div>
          {getUniqueItems().map((item) => (
            <div key={item.id} className="row">
              <div className="col">
                <img
                  className="img-fluid"
                  src={item.image}
                  width={100}
                  alt={item.title}
                />
              </div>
              <div className="col">{item.title}</div>
              <div className="col">Quantity: {item.quantity}</div>
            </div>
          ))}
        </div>
        <p>Total Price: ${(cartTotal + cartTotal * 0.07).toFixed(2)}</p>
        <p>User Information:</p>
        <p>
          Full Name: {document.getElementById("fullName").value}
          <br />
          Email: {document.getElementById("email").value}
          <br />
          Card Number:{" "}
          {"**** **** **** " +
            document.getElementById("cardNumber").value.substr(-4)}
          <br />
          Address: {document.getElementById("address").value}
          <br />
          Address 2: {document.getElementById("address2").value}
          <br />
          City: {document.getElementById("city").value}
          <br />
          State: {document.getElementById("state").value}
          <br />
          Zip: {document.getElementById("zip").value}
        </p>
        <button onClick={handleReturnToBrowsing} className="btn btn-blue">
          <span className="button-text">Browse More Items</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <img src={companyLogo} alt="Company Logo" style={{ width: "100%" }} />{" "}
      <div>
        <div className="card"></div>
        <div className="row">
          {!showCart && (
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
        {!showCart ? (
          <div>
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      <b>Shopping Cart</b>
                    </h4>
                  </div>
                </div>
              </div>
              <div>{listItems}</div>
            </div>
          </div>
        ) : (
          <div className="col-md-8">
            <h4>Cart</h4>
            {cartItems}
            <div>
              <p>Subtotal: ${cartTotal.toFixed(2)}</p>
              <p>Tax (7%): ${(cartTotal * 0.07).toFixed(2)}</p>
              <p>Total: ${(cartTotal + cartTotal * 0.07).toFixed(2)}</p>
            </div>
            <div>
              <div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      placeholder="Full Name"
                      id="fullName"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      placeholder="Credit/Debit Card Number"
                      id="cardNumber"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      placeholder="Address"
                      id="address"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      placeholder="Address 2"
                      id="address2"
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      placeholder="City"
                      id="city"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      placeholder="State"
                      id="state"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      placeholder="Zip"
                      pattern="[0-9]{5}"
                      title="Zip code should be 5 digits"
                      id="zip"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button onClick={handleSubmit} className="btn btn-blue">
                      <span className="button-text">Submit Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        {!showCart && (
          <button onClick={handleCheckout} className="btn btn-blue">
            <span className="button-text">Checkout</span>
          </button>
        )}
        {showCart && (
          <button onClick={handleReturn} className="btn btn-pink">
            <span className="button-text">Return</span>
          </button>
        )}
      </div>
      Retro Revival Store&copy;
    </div>
  );
};

export default Shop;
