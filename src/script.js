import React, { useState, useEffect } from "react";
import items from "./products.json";
import companyLogo from "./company_logo.png";

// Navigation Bar Component
const NavigationBar = ({ setPageNum }) => (
  <div>
    <button onClick={() => setPageNum(1)} className="btn btn-red">Create</button>
    <button onClick={() => setPageNum(2)} className="btn btn-yellow">Read</button>
    <button onClick={() => setPageNum(3)} className="btn btn-green">Update</button>
    <button onClick={() => setPageNum(4)} className="btn btn-cobalt">Delete</button>
    <button onClick={() => setPageNum(5)} className="btn btn-light-gray">Info</button>
  </div>
);

// Create Screen Component
const CreateScreen = ({ createProduct }) => (
  <div>
    <h4>Create Product</h4>
    <div>
      <input type="text" placeholder="ID" id="id" className="form-control" required />
      <input type="text" placeholder="Title" id="title" className="form-control" required />
      <input type="text" placeholder="Price" id="price" className="form-control" required />
      <input type="text" placeholder="Description" id="description" className="form-control" required />
      <input type="text" placeholder="Category" id="category" className="form-control" required />
      <input type="text" placeholder="Image" id="image" class="form-control" required />
      <input type="text" placeholder="Rating" id="rating" class="form-control" required />
      <button onClick={createProduct} className="btn btn-blue">Submit</button>
    </div>
  </div>
);

// Read Screen Component
const ReadScreen = ({ filteredItems, searchQuery, setSearchQuery }) => (
  <div>
    <h4>Read Products</h4>
    <div>
      {filteredItems.map((item) => (
        <div key={item.id} className="row">
          <div className="col-2">
            <img className="img-fluid" src={item.image} alt={item.title} />
          </div>
          <div className="col">
            <span>{item.title}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
          <div className="col">
          </div>
        </div>
      ))}
      <input
      type="text"
      placeholder="Search by ID..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    </div>
  </div>
);

// Update Screen Component
const UpdateScreen = ({ searchID, setSearchID, updateProduct }) => (
  <div>
    <h4>Update Product</h4>
    <input
      type="text"
      placeholder="Enter ID to update..."
      value={searchID}
      onChange={(e) => setSearchID(e.target.value)}
    />
    <button onClick={() => updateProduct(searchID)} className="btn btn-blue">Fetch item to update</button>
  </div>
);

// Delete Screen Component
const DeleteScreen = ({ deleteProduct, searchID}) => (
  <div>
    <h4>Delete Product</h4>
    <input
      type="text"
      placeholder="Enter ID to delete..."
      onChange={(e) => deleteProduct(e.target.value)}
    />
    <button onClick={() => deleteProduct(searchID)} className="btn btn-blue">Fetch item to delete</button>
  </div>
);

// Info Screen Component
const InfoScreen = ({ getUniqueItems, cartTotal }) => (
  <div>
    <h2>Information</h2>
    <p>Thank you for your purchase!</p>
    <p>Items Purchased:</p>
    {getUniqueItems().map((item) => (
      <div key={item.id}>
        <img className="img-fluid" src={item.image} width={100} alt={item.title} />
        <span>{item.title} - Quantity: {item.quantity}</span>
      </div>
    ))}
    <p>Total Price: ${(cartTotal * 1.07).toFixed(2)}</p>
  </div>
);

// Main Shop Component
const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchID, setSearchID] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const calculateTotal = () => {
    setCartTotal(cart.reduce((total, item) => total + item.price, 0));
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery]);

  const createProduct = () => {
    // Product creation logic goes here
    console.log("Product created");
  };

  const updateProduct = (id) => {
    console.log(`Update product with ID: ${id}`);
  };

  const deleteProduct = (id) => {
    console.log(`Delete product with ID: ${id}`);
  };

  const getUniqueItems = () => {
    const uniqueItems = cart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    return uniqueItems;
  };

  return (
    <div>
      <img src={companyLogo} alt="Company Logo" style={{ width: "100%" }} />
      <NavigationBar setPageNum={setPageNum} />
      <div>
        {pageNum === 1 && <CreateScreen createProduct={createProduct} />}
        {pageNum === 2 && (
          <ReadScreen
            filteredItems={filteredItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {pageNum === 3 && (
          <UpdateScreen
            searchID={searchID}
            setSearchID={setSearchID}
            updateProduct={updateProduct}
          />
        )}
        {pageNum === 4 && <DeleteScreen deleteProduct={deleteProduct} />}
        {pageNum === 5 && (
          <InfoScreen
            getUniqueItems={getUniqueItems}
            cartTotal={cartTotal}
          />
        )}
      </div>
    </div>
  );
};

export default Shop;
