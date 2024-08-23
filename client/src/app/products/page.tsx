"use client";

import { useCreateProductsMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react"
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import useDebounce from "@/app/(hooks)/debounce";

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: products, isError, isLoading } = useGetProductsQuery(debouncedSearchTerm);

    const [createProduct] = useCreateProductsMutation();
    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData);
    }

    if (isLoading) {
        return <div className="py-4">Loading...</div>
    }

    if (isError || !products) {
        return <div className="text-center text-red-500 py-4">
            Failed to fetch products
        </div>
    }
    return (
        <div className="mx-auto pb-5 w-full">
            {/* SEARCH BAR */}
            <div className="mb-6">
                <div className="relative">
                    <input 
                    type="search" 
                    placeholder="Search Products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-2 w-full border-2 border-gray-300 bg-white rounded focus:outline-none focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* HEADER BAR */}
            <div className="flex justify-between items-center mb-6">
                <Header name="Products" />
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
                    Create Product
                </button>
            </div>

            {/* BODY PRODUCTS LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {isLoading ? (<div>Loading...</div>) : (
                    products?.map((product) => (
                        <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
                            <div className="flex flex-col items-center">
                                img
                                <h3 className="text-lg text-gray-900 font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-gray-800">
                                    ${product.price.toFixed(2)}
                                </p>
                                <div className="text-sm text-gray-600 mt-1">
                                    Stock: {product.stockQuantity}
                                </div>
                                {product.rating && (
                                    <div className="flex items-center mt-2">
                                        <Rating rating={product.rating} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL */}
            <CreateProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProduct} />
        </div>
    )
}

export default Products