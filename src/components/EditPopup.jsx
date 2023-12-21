import React, { useState } from 'react'

const EditPopup = ({handleCancel, product, fetchCategories, fetchProducts, axios, categories}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    // Product Value Change
    function handleNameChange(e) {
        setUpdatedProduct({
            ...updatedProduct, // Copy the old fields (Not neccesary but advisable)
            "name": e.target.value // But Override this field
        });
    }

    function handleDescriptionChange(e) {
        setUpdatedProduct({
            ...updatedProduct, // Copy the old fields (Not neccesary but advisable)
            "description": e.target.value // But Override this field
        });
    }

    function handlePriceChange(e) {
        setUpdatedProduct({
            ...updatedProduct, // Copy the old fields (Not neccesary but advisable)
            "price": e.target.value // But Override this field
        });
    }

    function handleCategoryChange(e) {
        setUpdatedProduct({
            ...updatedProduct, // Copy the old fields (Not neccesary but advisable)
            "category": {
                "categoryId": e.target.value // But Override this field
            }
        });
    }

    const editProduct = async () => {
        try {
            await axios.put(`api/products/update/${product.productId}`, updatedProduct);
            // Fetch the updated product list after adding a new product
            await fetchProducts();
            await fetchCategories();
            console.log(updatedProduct.name + " has been updated.")
            // Additional logic after the product is successfully updated
        } catch (error) {
            console.error('Error updating product: ', error);
        }
    }

    const handleEdit = async () => {
        // e.preventDefault();

        await editProduct();
        setIsEditPopupOpen(false);
    };

    return (
        <div className="popup cursor-auto z-30 bg-black/50 fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center">
            {/* Popup content goes here */}
            <div className=' dark:bg-[#081220] bg-[#1A3661] dark:text-white text-black p-4 rounded-lg w-[50%]'>
                <p className='text-center font-semibold uppercase mb-5 text-white text-[1.2rem]'>Edit {updatedProduct.name}</p>
                <form className=' grid grid-cols-1 gap-y-1'>
                    <label className='text-white' htmlFor="name">Name:</label>
                    <input className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' type="text" placeholder='Name' value={updatedProduct.name} onChange={handleNameChange} name="name" id="name"/>
                    
                    <label className='text-white' htmlFor="description">Description:</label>
                    <input className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' type="text" placeholder='Description' value={updatedProduct.description} onChange={handleDescriptionChange} name="description" id="description"/>
                    
                    <label className='text-white' htmlFor="price">Price:</label>
                    <input className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' type="number" placeholder='Price' value={updatedProduct.price} onChange={handlePriceChange} name="price" id="price" />

                    <label className='text-white' htmlFor="category">Category:</label>
                    <select required className='mb-5 p-2 rounded-md dark:bg-slate-700 bg-slate-200' onChange={handleCategoryChange} name="category" id="category">
                        {/* <option selected dis value={product.category}>{product.category.categoryName}</option> */}
                        {categories.map((category) => (
                            // <option key={category.categoryId} value={category}>{category.categoryName}</option>
                            <option key={category.categoryId} selected={category.categoryId === product.category.categoryId && true} disabled={category.categoryId === product.category.categoryId && true} value={category}>{category.categoryName}</option>
                        ))}
                    </select>

                    <div className='flex items-center justify-between text-white py-2'>
                        <button className='outline outline-[1px] hover:bg-[#081220] focus:ring-[#081220] transition-all duration-300' disabled={updatedProduct.name.length === 0 || updatedProduct.description.length === 0 || updatedProduct.price.length === 0 || updatedProduct.category === null && true} type="submit" onClick={handleEdit}>Save Changes</button>
                        <button className='bg-[#081220] hover:bg-[#1b2637] outline-none focus:ring-[#081220]' title='Cancel' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPopup;