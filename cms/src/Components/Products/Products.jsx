import { useEffect, useState } from "react";
import AddNewProducts from "../AddNewProducts/AddNewProducts";
import ProductsTable from "../ProductsTable/ProductsTable";


export default function Products() {

  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {

    getAllProducts()

  }, [])

  const getAllProducts = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/products/");

        if (!res.ok) {
            throw new Error(`خطا در دریافت داده‌ها: ${res.status}`);
        }

        const text = await res.text();

        const products = text ? JSON.parse(text) : [];

        setAllProducts(products.reverse());
    } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
    }
};

  return (
    <>
      <AddNewProducts getAllProducts={getAllProducts} />
      <ProductsTable getAllProducts={getAllProducts} setAllProducts={setAllProducts} allProducts={allProducts} />
    </>
  )
}
