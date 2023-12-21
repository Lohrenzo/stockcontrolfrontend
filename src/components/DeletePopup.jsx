import React from 'react'

const DeletePopup = ({handleCancel, fetchProducts, fetchCategories, product, axios, setIsDeletePopupOpen}) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`api/products/delete/${product.productId}`);
            // Fetch the updated product list after adding a new product
            await fetchProducts();
            await fetchCategories();
            console.log(product.name + " has been deleted.")
        } catch (error) {
            console.error('Error deleting product: ', error);
        }
        window.location.reload();
        setIsDeletePopupOpen(false);
    }

    return (
        <div className="popup cursor-auto z-30 bg-black/50 fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center text-white">
            {/* Popup content goes here */}
            <div className=' dark:bg-[#081220] bg-[#1A3661] text-white p-4 rounded-lg w-[50%]'>
                <p className='text-center font-semibold uppercase mb-5 text-[1.2rem]'>Are You Sure You Want To Delete {product.name}?</p>
                    <div className='flex items-center justify-between py-2'>
                    <button className='bg-[#ae1010] focus:ring-[#081220]' onClick={handleDelete}>Delete</button>
                    <button className='outline outline-[1px] hover:bg-[#081220] focus:ring-[#081220] transition-all duration-300' title='Cancel' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup;