/* eslint-disable react/prop-types */
import { useState } from "react"
import { BsCursorText, BsClipboard2HeartFill } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { MdOutlineInventory } from "react-icons/md";
import { FaFileImage } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { IoMdColorPalette } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

import "./AddNewProducts.css"

export default function AddNewProducts({ getAllProducts }) {

    const [newProductTitle, setNewProductTitle] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("")
    const [newProductCount, setNewProductCount] = useState("")
    const [newProductImg, setNewProductImg] = useState("")
    const [newProductPopularity, setNewProductPopularity] = useState("")
    const [newProductSale, setNewProductSale] = useState("")
    const [newProductColors, setNewProductColors] = useState("")
    const [newProductCategory, setNewProductCategory] = useState("")

    const newProductsInfos = {
        title: newProductTitle,
        price: Number(newProductPrice),
        count: Number(newProductCount),
        img: newProductImg,
        popularity: Number(newProductPopularity),
        sale: Number(newProductSale),
        colors: Number(newProductColors),
        categoryID: Number(newProductCategory)
    }

    const addNewProduct = (event) => {

        event.preventDefault()
        console.log(newProductsInfos);

        fetch(`http://localhost:8000/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProductsInfos)
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                getAllProducts()
                emptyInputs()
            })
    }

    function emptyInputs () {

        setNewProductTitle("")
        setNewProductPrice("")
        setNewProductCount("")
        setNewProductImg("")
        setNewProductPopularity("")
        setNewProductSale("")
        setNewProductColors("")
        setNewProductCategory("")
    }
    return (
        <div className="add-products">
            <h1 className="add-products-title">افزودن محصول جدید</h1>
            <form className="add-products-form" action="#">
                <div className="add-products-form-wrapper">
                    <div className="add-products-form-group">
                        <BsCursorText className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="اسم محصول را بنویسید" value={newProductTitle} onChange={(event) => setNewProductTitle(event.target.value)} />
                    </div>
                    <div className="add-products-form-group">
                        <ImPriceTags className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="قیمت محصول را بنویسید" value={newProductPrice} onChange={(event) => setNewProductPrice(event.target.value)} />
                    </div>
                    <div className="add-products-form-group">
                        <MdOutlineInventory className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="موجودی محصول را بنویسید" value={newProductCount} onChange={(event) => setNewProductCount(event.target.value)} />
                    </div>
                    <div className="add-products-form-group">
                        <FaFileImage className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="آدرس عکس محصول را بنویسید" value={newProductImg} onChange={(event) => setNewProductImg(event.target.value)} />
                    </div>
                    <div className="add-products-form-group">
                        <BsClipboard2HeartFill className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="میزان محبوبیت محصول را بنویسید" value={newProductPopularity} onChange={(event) => setNewProductPopularity(event.target.value)} />
                    </div>
                    <div className="add-products-form-group">
                        <FcSalesPerformance className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="میزان فروش محصول را بنویسید" value={newProductSale} onChange={(event) => setNewProductSale(event.target.value)} />
                    </div>
                    <div className="add-products-form-group">
                        <IoMdColorPalette className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="رنگ بندی محصول را بنویسید" value={newProductColors} onChange={(event) => setNewProductColors(event.target.value)} />
                    </div>
                    <div className="add-products-form-group">
                        <BiCategory className="add-products-form-group-svg" />
                        <input className="add-products-form-input" type="text" placeholder="دسته بندی محصول را بنویسید(1.گوشی 2.لپتاپ 3.عمومی)" value={newProductCategory} onChange={(event) => setNewProductCategory(event.target.value)} />
                </div>
                </div>
                <button className="add-products-form-btn" onClick={addNewProduct}>ثبت محصول</button>
            </form>
        </div>
    )
}
