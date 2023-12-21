import React, { useEffect, useState } from 'react'

// Axios
import axios from '../../apiCall/axios'

// Components
import EditDeleteBtn from '../EditDeleteBtn'
import NavBar from '../NavBar';

// Icons
import { MdDelete, MdEditSquare, MdExpandMore, MdExpandLess, MdTune } from "react-icons/md";
import EditPopup from '../EditPopup';
import DeletePopup from '../DeletePopup';
// import { FaRegEdit } from "react-icons/fa";


const ProductList = ({categories, products, setProducts, fetchProducts, fetchCategories, addNewPopUp, setAddNewPopUp, getCookie, userIdCookie, setUserIdCookie, usernameCookie, setUsernameCookie, roleCookie, setRoleCookie, setAuthTokenCookie}) => {
  const [filtersPopUp, setFiltersPopUp] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  // const [updatedProduct, setUpdatedProduct] = useState(newProduct);
  const [filterByCategoryPopUp, setFilterByCategoryPopUp] = useState(false);
  // const [usernameCookie, setUsernameCookie] = useState("");
  // const [roleCookie, setRoleCookie] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const closeFilterByCategoryPopUp = () => {
    setFilterByCategoryPopUp(false);
  }

  const clearFilter = async () => {
    await fetchProducts(); 
    await fetchCategories();
    closeFilterByCategoryPopUp();
    setFiltersPopUp(false);
    console.log("Filter Cleared");
  }

  useEffect(() => {
    console.log({"Product content changed": newProduct});
  }, [newProduct])

  // Product Value Change
  function handleSkuChange(e) {
    setNewProduct({
      ...newProduct, // Copy the old fields (Not neccesary but advisable)
      "sku": e.target.value // But Override this field
    });
  }

  function handleNameChange(e) {
    setNewProduct({
      ...newProduct, // Copy the old fields (Not neccesary but advisable)
      "name": e.target.value // But Override this field
    });
  }

  function handleDescriptionChange(e) {
    setNewProduct({
      ...newProduct, // Copy the old fields (Not neccesary but advisable)
      "description": e.target.value // But Override this field
    });
  }

  function handlePriceChange(e) {
    setNewProduct({
      ...newProduct, // Copy the old fields (Not neccesary but advisable)
      "price": e.target.value // But Override this field
    });
  }

  function handleCategoryChange(e) {
    setNewProduct({
      ...newProduct, // Copy the old fields (Not neccesary but advisable)
      "category": {
        "categoryId": e.target.value // But Override this field
      }
    });
  }

  const addProduct = async () => {
    try {
      await axios.post("api/products/create", newProduct);
      console.log(newProduct.name + " has been added.")
      // Fetch the updated product list after adding a new product
      await fetchProducts();
      await fetchCategories();
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await addProduct();
      setAddNewPopUp(false);
    } catch {
      console.log("Error Adding This Product")
    }
  };

    
  const handleCancel = async () => {
    // await fetchProducts();
    // await fetchCategories();
    setIsDeletePopupOpen(false);
    setIsEditPopupOpen(false);
  }

  const toggleDeletePopup = () => {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  };
  
  const toggleEditPopup = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
  };


  return (
    <section className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-[7rem] h-[100vh] w-[100vw] flex flex-col items-center'>
      {/* <NavBar roleCookie={roleCookie} setRoleCookie={setRoleCookie} setAuthTokenCookie={setAuthTokenCookie} userIdCookie={userIdCookie} setUserIdCookie={setUserIdCookie} usernameCookie={usernameCookie} setUsernameCookie={setUsernameCookie} getCookie={getCookie} handleSearchChange={handleSearchChange} searchKeyword={searchKeyword} setAddNewPopUp={setAddNewPopUp} /> */}
      {products == null || products.length == 0 ? <></> :
        <section className='w-[80%] relative'>
          <p className='text-[1.7rem] font-bold mb-6 text-center'>
            Product List
          </p>

          <span onClick={() => setFiltersPopUp(!filtersPopUp)} className='flex items-center justify-center border-b-2 py-1 px-2 cursor-pointer gap-x-1 absolute top-2 right-3 text-[1.1rem]'>
            Filters <MdTune style={{fontSize: "1.6rem"}} />
          </span>

          {filtersPopUp &&
            <div className='bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white absolute z-10 right-0 top-10 border shadow-md p-4 rounded-lg'>
              <div onClick={() => setFilterByCategoryPopUp(!filterByCategoryPopUp)} className='flex flex-row items-center justify-center gap-x-2 cursor-pointer'>
                Filter By Category {filterByCategoryPopUp ? <MdExpandLess style={{fontSize: "1.4rem"}} /> : <MdExpandMore style={{fontSize: "1.4rem"}} />}
              </div>
              {filterByCategoryPopUp && 
                <div className='py-3'>
                  <p className='capitalize border-b cursor-pointer opacity-60 hover:opacity-95' onClick={clearFilter}>Clear Filter</p>
                  {categories.map((category) => (
                    <p className=' border-b cursor-pointer' onClick={
                      async () => {
                        try {
                          const response = await axios.get("api/products/category/"+category.categoryId);
                          console.log(JSON.stringify(response?.data));
                          setProducts(response?.data || null);
                          console.log("Filtered Products By ID: " + category.categoryId);
                        } catch (error) {
                          console.error('Error filtering products:', error);
                          setProducts([]);
                        }
                        closeFilterByCategoryPopUp();
                        setFiltersPopUp(false);
                      }
                    } key={category.categoryId}>
                      {category.categoryName}
                    </p>
                  ))}
                </div>
              }
            </div>
          }


        </section>
      }

      <>
        
        {/* <button className='flex flex-row gap-x-1 justify-center items-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={() => setFilterByCategoryPopUp(!filterByCategoryPopUp)}>Filter By Category {filterByCategoryPopUp ? <MdExpandLess style={{fontSize: "1.4rem"}} /> : <MdExpandMore style={{fontSize: "1.4rem"}} />}</button> */}

        
      </>

      {products == null || products.length == 0 ? 
      <p className='text-[1.7rem] flex items-center justify-center h-[100vh] w-[100vw]'>
        No Product Available !!
      </p> :
      <section className='w-full flex flex-col items-center'>

        <table className='w-[80%] border-2'>
          <tbody>
            <tr className='text-left font-bold text-[1.2rem] border-b-2'>
              <th className='p-2'>ID</th>
              <th className='p-2'>SKU</th>
              <th className='p-2'>Name</th>
              <th className='p-2'>Description</th>
              <th className='p-2'>Category</th>
              <th className='p-2'>Price (&#163;)</th>
              {roleCookie === "ADMIN" && 
              <>
                <th className='p-2'>Edit</th>
                <th className='p-2'>Delete</th>
              </>
              }
            </tr>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr className='text-left border-b' key={product.productId}>
                  <td className='p-2'>{product.productId}</td>
                  <td className='p-2 uppercase'>{product.sku}</td>
                  <td className='p-2'>{product.name}</td>
                  <td className='p-2'>{product.description}</td>
                  <td className='p-2 capitalize'>{product.category.categoryName}</td>
                  <td className='p-2'>{product.price}</td>
                  {roleCookie === "ADMIN" && 
                  <>
                    <td className='p-2 cursor-pointer' title={`Edit ${product.name}`}>
                      <div onClick={toggleEditPopup} className="flex justify-center items-center hover:bg-slate-300 hover:scale-110 transition-all duration-200 w-fit rounded-md p-2">
                        <EditDeleteBtn fetchProducts={fetchProducts} fetchCategories={fetchCategories} categories={categories} action="toEdit" icon={MdEditSquare} />
                      </div>
                    </td>
                    <td className='p-2 cursor-pointer text-[red]' title={`Delete ${product.name}`}>
                      <div onClick={toggleDeletePopup} className="flex justify-center items-center hover:bg-slate-300 hover:scale-110 transition-all duration-200 w-fit rounded-md p-2">
                        <EditDeleteBtn  fetchProducts={fetchProducts} fetchCategories={fetchCategories} categories={categories} action="toDelete" icon={MdDelete} />
                      </div>
                    </td>
                  </>
                  }

                  {isEditPopupOpen && <EditPopup fetchProducts={fetchProducts} fetchCategories={fetchCategories} axios={axios} categories={categories} handleCancel={handleCancel} product={product} />}
            
                  {isDeletePopupOpen && <DeletePopup fetchProducts={fetchProducts} fetchCategories={fetchCategories} axios={axios} setIsDeletePopupOpen={setAddNewPopUp} handleCancel={handleCancel} product={product} />}
                </tr>
              ))
            ) : (
              <tr>
                <td className='text-center p-4' colSpan={roleCookie === "ADMIN" ? 8 : 6}>No products available</td>
              </tr>
            )}
          </tbody>
        </table>  
      </section>
      }


      {/* <button title='Add A New Product' className='fixed right-6 top-[50%] px-6 py-12 rounded-lg capitalize text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={() => setIsPoppedUp(true)}>Add New Product</button> */}

      {/* Pop Up */}
      {addNewPopUp && (
        <div className="popup cursor-auto z-30 bg-black/50 absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center">
          {/* Popup content goes here */}
          <div className=' dark:bg-[#081220] bg-[#1A3661] dark:text-white text-black p-4 rounded-lg w-[50%]'>
            <form className=' grid grid-cols-1 gap-y-1'>
              <label className='text-white' htmlFor="sku">SKU (Stock Keeping Unit):</label>
              <input required className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' type="text" placeholder='SKU' onChange={handleSkuChange} name="sku" id="sku"/>
              
              <label className='text-white' htmlFor="name">Name:</label>
              <input required className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' type="text" placeholder='Name' onChange={handleNameChange} name="name" id="name"/>
              
              <label className='text-white' htmlFor="description">Description:</label>
              <input required className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' type="text" placeholder='Description' onChange={handleDescriptionChange} name="description" id="description"/>
              
              <label className='text-white' htmlFor="price">Price:</label>
              <input required className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' type="number" placeholder='Price' onChange={handlePriceChange} name="price" id="price" />

              <label className='text-white' htmlFor="category">Category:</label>
              <select required className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' name="category" onChange={handleCategoryChange} id="category">
                <option disabled selected value={null}>Choose a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                  // <option key={category.categoryId} value={{"categoryId": Number(category.categoryId),"categoryName": category.categoryName}}>{category.categoryName}</option>
                ))}
              </select>

              <div className='flex items-center justify-between text-white py-2'>
                <button type='submit' onClick={handleAdd} className='outline outline-[1px] hover:bg-[#081220] focus:ring-[#081220] transition-all duration-300'>Submit</button>
                <button className='bg-[#081220] hover:bg-[#1b2637] outline-none focus:ring-[#081220]' type='reset' title='Cancel' onClick={() => setAddNewPopUp(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  )
}

export default ProductList;