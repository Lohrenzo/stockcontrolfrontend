import React, { useEffect, useState } from 'react'

// React Router
import { Routes, Route } from 'react-router-dom';

// Axios
import axios from './apiCall/axios';

// React-cookie
import { useCookies } from "react-cookie";

// Web Pages
import ProductList from "./components/webpages/ProductList";
import Login from "./components/webpages/Login";
import Profile from './components/webpages/Profile';
import SignUpCustomer from './components/webpages/SignUpCustomer';

// Components
import NavBar from './components/NavBar';

// URLs
const Product_URL = "api/products";
const Category_URL = "api/categories";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["username", "userId", "authToken", "role", "cart"]);
  const [usernameCookie, setUsernameCookie] = useState(null);
  const [userIdCookie, setUserIdCookie] = useState(null);
  const [roleCookie, setRoleCookie] = useState(null);
  const [authTokenCookie, setAuthTokenCookie] = useState(null);

  const [addNewPopUp, setAddNewPopUp] = useState(false);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {

    // if (!userIdCookie || !usernameCookie || !roleCookie || authTokenCookie) {

    //   // Create cookies and set values to undefined
    //   setCookie('authToken', "undefined", { path: '/' });
    //   setCookie('username', "undefined", { path: '/' });
    //   setCookie('userId', "undefined", { path: '/' });
    //   setCookie('role', "undefined", { path: '/' });

    // } else {

      setUsernameCookie(getCookie("username"));
      setRoleCookie(getCookie("role"));
      setUserIdCookie(getCookie("userId"));
      setAuthTokenCookie(getCookie("authToken"));

    // }

  }, [])

// Function to get specific cookie by its name
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
  
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
  
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  
    return null; // Return null if the cookie with the specified name is not found
  }

  // Function to fetch products based on search keyword
  const fetchProductsBySearch = async () => {
    if (searchKeyword.length > 0) {
      try {
        const response = await axios.get(`api/products/description/${searchKeyword}`);
        setProducts(response?.data || []);
      } catch (error) {
        console.error('Error searching:', error);
        setProducts([]);
      }
    }
    else {
      fetchProducts();
      fetchCategories();
    }
  };


  const fetchProducts = async () => {
    try {
      const response = await axios.get(Product_URL);
      console.log(JSON.stringify(response?.data));
      setProducts(response?.data || []);
      console.log("Fetched Products");
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(Category_URL);
      console.log(JSON.stringify(response?.data));
      setCategories(response?.data || []);
      console.log("Fetched Categories");
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    () => {
      setUsernameCookie(getCookie("username"));
    }

    () => {
      setRoleCookie(getCookie("role"));
    }
    
  }, [usernameCookie, roleCookie])

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    fetchProductsBySearch();
  }, [searchKeyword])

  return (
    <section className='pb-0 overflow-x-hidden'>
    <NavBar roleCookie={roleCookie} setRoleCookie={setRoleCookie} setAuthTokenCookie={setAuthTokenCookie} userIdCookie={userIdCookie} setUserIdCookie={setUserIdCookie} usernameCookie={usernameCookie} setUsernameCookie={setUsernameCookie} getCookie={getCookie} handleSearchChange={handleSearchChange} searchKeyword={searchKeyword} setAddNewPopUp={setAddNewPopUp} />

    <Routes>
      <Route path='/' element={<ProductList products={products} setProducts={setProducts} categories={categories} fetchCategories={fetchCategories} fetchProducts={fetchProducts} addNewPopUp={addNewPopUp} setAddNewPopUp={setAddNewPopUp} userIdCookie={userIdCookie} setUserIdCookie={setUserIdCookie} roleCookie={roleCookie} setRoleCookie={setRoleCookie} setAuthTokenCookie={setAuthTokenCookie} usernameCookie={usernameCookie} setUsernameCookie={setUsernameCookie} getCookie={getCookie} />} />
      <Route path='/login' element={<Login fetchProducts={fetchProducts} fetchCategories={fetchCategories} />} />
      <Route path='/register' element={<SignUpCustomer fetchProducts={fetchProducts} fetchCategories={fetchCategories} />} />
      <Route path='/profile/:userId' element={<Profile />} />
    </Routes>
      
    </section>
  )
}

export default App
