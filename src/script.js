import React, { useState, useEffect } from "react";
import items from "./products.json";
import companyLogo from "./company_logo.png";

// Navigation Bar Component
const NavigationBar = ({ setPageNum }) => (
  <div>
    <button onClick={() => setPageNum(1)} className="btn btn-red">
      Create
    </button>
    <button onClick={() => setPageNum(2)} className="btn btn-yellow">
      Read
    </button>
    <button onClick={() => setPageNum(3)} className="btn btn-green">
      Update
    </button>
    <button onClick={() => setPageNum(4)} className="btn btn-cobalt">
      Delete
    </button>
    <button onClick={() => setPageNum(5)} className="btn btn-light-gray">
      Info
    </button>
  </div>
);

// Create Screen Component
const CreateScreen = ({ onSubmit }) => {
  // Define states for each input field
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");

  // Handle the form submission
  const handleSubmit = () => {
    const newProduct = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    };

    // Pass the new product to the parent component's onSubmit function
    onSubmit(newProduct);
  };

  return (
    <div>
      <h4>Create Product</h4>
      <div>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="text"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="form-control"
          required
        />
        <button onClick={handleSubmit} className="btn btn-blue">
          Submit
        </button>
      </div>
    </div>
  );
};

// Read Screen Component
const ReadScreen = ({ filteredItems, searchQuery, setSearchID, searchID, readProduct, readProducts }) => {
  const [getAllClicked, setGetAllClicked] = useState(false);
  const [searchedItem, setSearchedItem] = useState(null);

  const handleGet = () => {
    readProduct(searchID)
      .then((item) => {
        if (item) {
          setSearchedItem(item);
        } else {
          setSearchedItem(null); // Clear searchedItem if not found
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setSearchedItem(null); // Clear searchedItem if error occurs
      });

    setGetAllClicked(false);
  };

  return (
    <div>
      <h4>Read Products</h4>
      <div>
        {getAllClicked ? (
          filteredItems.map((item) => (
            <div key={item.id} className="row">
              <div className="col-2">
                <img className="img-fluid" src={item.image} alt={item.title} />
              </div>
              <div className="col">
                <span>{item.title}</span>
                <span>{item.price !== null ? `$${item.price.toFixed(2)}` : 'Price not available'}</span>
              </div>
              <div className="col"></div>
            </div>
          ))
        ) : searchedItem ? (
          <div key={searchedItem.id} className="row">
            <div className="col-2">
              <img className="img-fluid" src={searchedItem.image} alt={searchedItem.title} />
            </div>
            <div className="col">
              <span>{searchedItem.title}</span>
              <span>{searchedItem.price !== null ? `$${searchedItem.price.toFixed(2)}` : 'Price not available'}</span>
            </div>
            <div className="col"></div>
          </div>
        ) : null}
        <input
          type="text"
          placeholder="Search by ID..."
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
        />
        <button onClick={handleGet} className="btn btn-blue">Get</button>
        <button onClick={() => { readProducts(); setGetAllClicked(true); }} className="btn btn-blue">Get All</button>
      </div>
    </div>
  );
};

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
    <button onClick={() => updateProduct(searchID)} className="btn btn-blue">
      Fetch item to update
    </button>
  </div>
);

// Delete Screen Component
const DeleteScreen = ({ deleteProduct, searchID }) => (
  <div>
    <h4>Delete Product</h4>
    <input
      type="text"
      placeholder="Enter ID to delete..."
      onChange={(e) => searchID = e.target.value}
    />
    <button onClick={() => deleteProduct(searchID)} className="btn btn-blue">
      Fetch item to delete
    </button>
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
        <img
          className="img-fluid"
          src={item.image}
          width={100}
          alt={item.title}
        />
        <span>
          {item.title} - Quantity: {item.quantity}
        </span>
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
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [items, setItems] = useState([]); // Initialize items state as an empty array

  // Function to fetch products and set the items state
  const fetchProducts = async () => {
    try {
      const products = await readProducts();
      setItems(products); // Set the items state here
      setFilteredItems(products); // Set filteredItems as well
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Run once on component mount to fetch products

  const calculateTotal = () => {
    setCartTotal(cart.reduce((total, item) => total + item.price, 0));
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  // useEffect(() => {
  //   const filtered = items.filter((item) =>
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredItems(filtered);
  // }, [searchQuery, items]); // Include items in the dependency array


  const createProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:8081/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
  
      if (response.ok) {
        console.log('Product added successfully');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const updateProduct = async (id, updatedProductData) => {
    try {
      const response = await fetch(`http://localhost:8081/updateProduct/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });
      
      if (response.ok) {
        console.log(`Product with ID ${id} updated successfully`);
        // Optionally, you can perform any additional actions after updating
      } else {
        console.error(`Failed to update product with ID ${id}`);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/deleteProduct/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(`Product with ID ${id} deleted successfully`);
        // Optionally, you can perform any additional actions after deletion
      } else {
        console.error(`Failed to delete product with ID ${id}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const readProducts = async () => {
    try {
      const response = await fetch('http://localhost:8081/readProducts');
      if (response.ok) {
        const products = await response.json();
        console.log('All products:', products);
        // Handle the products data as needed (display on UI, etc.)
        return products
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const readProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:8081/readProduct/${id}`);
        if (response.ok) {
            const product = await response.json();
            console.log('Product with ID', id, ':', product);
            return product; // Return the product data
        } else {
            console.error(`Failed to fetch product with ID ${id}`);
            return null; // Return null if product retrieval fails
        }
    } catch (error) {
        console.error('Network error:', error);
        return null; // Return null if an error occurs
    }
};

  //Create onsubmit function placeholder
  const onSubmit = async (newProduct) => {
  if (pageNum === 1) {
    // Call createProduct function if pageNum is 1
    await createProduct(newProduct);
  } else if (pageNum === 3) {
    await updateProduct(newProduct.id);
  } else if (pageNum === 4) {
    // Call deleteProduct function if pageNum is 4
    await deleteProduct(newProduct.id);
  }
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
        {pageNum === 1 && <CreateScreen createProduct={createProduct} onSubmit={onSubmit} />}
        {pageNum === 2 && (
          <ReadScreen
            filteredItems={filteredItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchID={searchID}
            setSearchID={setSearchID}
            readProduct={readProduct}
            readProducts={readProducts}
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
          <InfoScreen getUniqueItems={getUniqueItems} cartTotal={cartTotal} />
        )}
      </div>
    </div>
  );
};

export default Shop;