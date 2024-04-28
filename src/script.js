import React, { useState, useEffect } from "react";
import items from "./products.json";
import companyLogo from "./company_logo.png";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchID, setSearchID] = useState(""); // State to store the input ID for CRUD operations
  const [filteredItems, setFilteredItems] = useState(items);
  const [showCart, setShowCart] = useState(false); // State to control cart screen visibility
  const [pageNum, setPageNum] = useState(1); // State to track pages
  const createPage = 1;
  const readPage = 2;
  const updatePage = 3;
  const deletePage = 4;
  const infoPage = 5;

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
  const createProduct = () => {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;
    const rating = document.getElementById("rating").value;

    // // Validation checks
    // if (!id.trim()) {
    //   alert("Please enter your full name.");
    //   return;
    // }
    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(title)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }
    // if (!/^\d{16}$/.test(price)) {
    //   alert("Please enter a valid 16-digit card number.");
    //   return;
    // }
    // if (!category.trim()) {
    //   alert("Please enter your address.");
    //   return;
    // }
    // if (!rating.trim()) {
    //   alert("Please enter your city.");
    //   return;
    // }

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

  if (pageNum === infoPage) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={companyLogo} alt="Company Logo" style={{ width: "100%" }} />{" "}
        <div style={{ textAlign: "left" }}>
          {/* NAV BAR */}
          <div>
            <button onClick={() => setPageNum(1)} className="btn btn-red">
              <span className="button-text">Create</span>
            </button>
            <button onClick={() => setPageNum(2)} className="btn btn-yellow">
              <span className="button-text">Read</span>
            </button>
            <button onClick={() => setPageNum(3)} className="btn btn-green">
              <span className="button-text">Update</span>
            </button>
            <button onClick={() => setPageNum(4)} className="btn btn-cobalt">
              <span className="button-text">Delete</span>
            </button>
            <button
              onClick={() => setPageNum(5)}
              className="btn btn-light-gray"
            >
              <span className="button-text">Info</span>
            </button>
          </div>
        </div>
        <h2>Info</h2>
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
        {/* <p>
          ID: {document.getElementById("id").value}
          <br />
          Title: {document.getElementById("title").value}
          <br />
          Price:{document.getElementById("price").value}
          <br />
          Description: {document.getElementById("description").value}
          <br />
          Category: {document.getElementById("category").value}
          <br />
          Image: {document.getElementById("image").value}
          <br />
          Rating: {document.getElementById("rating").value}
        </p> */}
      </div>
    );
  }

  if (pageNum === updatePage) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={companyLogo} alt="Company Logo" style={{ width: "100%" }} />{" "}
      </div>
      
    );
  }

  if (pageNum === deletePage) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={companyLogo} alt="Company Logo" style={{ width: "100%" }} />{" "}
        <div style={{ textAlign: "left" }}>
          {/* NAV BAR */}
          <div>
            <button onClick={() => setPageNum(1)} className="btn btn-red">
              <span className="button-text">Create</span>
            </button>
            <button onClick={() => setPageNum(2)} className="btn btn-yellow">
              <span className="button-text">Read</span>
            </button>
            <button onClick={() => setPageNum(3)} className="btn btn-green">
              <span className="button-text">Update</span>
            </button>
            <button onClick={() => setPageNum(4)} className="btn btn-cobalt">
              <span className="button-text">Delete</span>
            </button>
            <button
              onClick={() => setPageNum(5)}
              className="btn btn-light-gray"
            >
              <span className="button-text">Info</span>
            </button>
          </div>
        </div>
        <h2>Info</h2>
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
        {/* <p>
          ID: {document.getElementById("id").value}
          <br />
          Title: {document.getElementById("title").value}
          <br />
          Price:{document.getElementById("price").value}
          <br />
          Description: {document.getElementById("description").value}
          <br />
          Category: {document.getElementById("category").value}
          <br />
          Image: {document.getElementById("image").value}
          <br />
          Rating: {document.getElementById("rating").value}
        </p> */}
      </div>
    );
  }



  return (
    <div>
      <img src={companyLogo} alt="Company Logo" style={{ width: "100%" }} />{" "}
      <div>
        <div className="card"></div>
        <div className="row"></div>
        {pageNum === readPage ? (
          <div>
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col">
                    <h4>
                      {/* NAV BAR */}
                      <div>
                        <button
                          onClick={() => setPageNum(1)}
                          className="btn btn-red"
                        >
                          <span className="button-text">Create</span>
                        </button>
                        <button
                          onClick={() => setPageNum(2)}
                          className="btn btn-yellow"
                        >
                          <span className="button-text">Read</span>
                        </button>
                        <button
                          onClick={() => setPageNum(3)}
                          className="btn btn-green"
                        >
                          <span className="button-text">Update</span>
                        </button>
                        <button
                          onClick={() => setPageNum(4)}
                          className="btn btn-cobalt"
                        >
                          <span className="button-text">Delete</span>
                        </button>
                        <button
                          onClick={() => setPageNum(5)}
                          className="btn btn-light-gray"
                        >
                          <span className="button-text">Info</span>
                        </button>
                      </div>
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
            {/* NAV BAR */}
            <div>
              <button onClick={() => setPageNum(1)} className="btn btn-red">
                <span className="button-text">Create</span>
              </button>
              <button onClick={() => setPageNum(2)} className="btn btn-yellow">
                <span className="button-text">Read</span>
              </button>
              <button onClick={() => setPageNum(3)} className="btn btn-green">
                <span className="button-text">Update</span>
              </button>
              <button onClick={() => setPageNum(4)} className="btn btn-cobalt">
                <span className="button-text">Delete</span>
              </button>
              <button
                onClick={() => setPageNum(5)}
                className="btn btn-light-gray"
              >
                <span className="button-text">Info</span>
              </button>
            </div>
            <div>
              {pageNum === createPage && (
                <div>
                  <h4>Create Item</h4>
                  {cartItems}
                  <div>
                    <div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            placeholder="ID"
                            id="id"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            placeholder="Title"
                            id="title"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            placeholder="Price"
                            id="price"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            placeholder="Description"
                            id="description"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            placeholder="Category"
                            id="category"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            placeholder="Image"
                            id="image"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            placeholder="Rating"
                            id="rating"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <button
                            onClick={createProduct}
                            className="btn btn-blue"
                          >
                            <span className="button-text">Submit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        {pageNum === readPage && (
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Enter ID..."
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
            />
          </div>
        )}
        {pageNum === readPage && (
          <button onClick={() => setPageNum(1)} className="btn btn-blue">
            <span className="button-text">Checkout</span>
          </button>
        )}
      </div>
      Retro Revival Store&copy;
    </div>
  );
};

export default Shop;
