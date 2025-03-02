/* eslint-disable react/prop-types */
import { useState } from "react";

import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import ErrorBox from "./../ErrorBox/ErrorBox";

import { BsCursorText, BsClipboard2HeartFill } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { MdOutlineInventory } from "react-icons/md";
import { FaFileImage } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { IoMdColorPalette } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

import "./ProductsTable.css";

export default function ProductsTable({ allProducts, getAllProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [updateProductTitle, setUpdateProductTitle] = useState("");
  const [updateProductPrice, setUpdateProductPrice] = useState("");
  const [updateProductCount, setUpdateProductCount] = useState("");
  const [updateProductImg, setUpdateProductImg] = useState("");
  const [updateProductPopularity, setUpdateProductPopularity] = useState("");
  const [updateProductSale, setUpdateProductSale] = useState("");
  const [updateProductColors, setUpdateProductColors] = useState("");
  const [updateProductCategory, setUpdateProductCategory] = useState("");

  const deleteModalSubmitAction = async () => {
    console.log("سابمیت (حذف) میشود");

    try {
      const res = await fetch(
        `http://localhost:8000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const text = await res.text();
      const result = text ? JSON.parse(text) : {};

      console.log("نتیجه حذف:", result);

      setIsShowDeleteModal(false);
      getAllProducts();
    } catch (error) {
      console.error("خطا در حذف محصول:", error);
    }
  };

  const deleteModalCancelAction = () => {
    console.log("کنسل میشود");
    setIsShowDeleteModal(false);
  };

  const closeDetailsModal = () => {
    console.log("جزییات مدال بسته شد");
    setIsShowDetailsModal(false);
  };

  const closeEditModal = () => {
    console.log("جزییات مدال بسته شد");
    setIsShowEditModal(false);
  };

  const updateProductInfos = async (event) => {
    event.preventDefault();

    const newProductsInfos = {
      title: updateProductTitle,
      price: Number(updateProductPrice),
      count: Number(updateProductCount),
      img: updateProductImg,
      popularity: Number(updateProductPopularity),
      sale: Number(updateProductSale),
      colors: Number(updateProductColors),
      categoryID: Number(updateProductCategory),
    };

    await fetch(`http://localhost:8000/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductsInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        closeEditModal();
      });
    console.log("محصول ویرایش شد");
  };
  return (
    <>
      {allProducts.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="products-table-data-tr">
                <td>
                  <img
                    src={product.img}
                    alt="oil"
                    className="products-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price.toLocaleString("fa-IR")} تومان</td>
                <td>{product.count}</td>
                <td className="products-table-btn-wrapper">
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      setMainProductInfos(product);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setProductId(product.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);

                      setProductId(product.id);
                      setUpdateProductTitle(product.title);
                      setUpdateProductPrice(product.price);
                      setUpdateProductCount(product.count);
                      setUpdateProductImg(product.img);
                      setUpdateProductPopularity(product.popularity);
                      setUpdateProductSale(product.sale);
                      setUpdateProductColors(product.colors);
                      setUpdateProductCategory(product.categoryID);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ محصولی یافت نشد" />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
          title="حذف محصول"
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="details-modal-table">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainProductInfos.popularity} %</td>
                <td>{mainProductInfos.sale.toLocaleString("fa-IR")} تومان </td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateProductInfos}>
          <div className="edit-proructs-form-group">
            <BsCursorText />
            <label>
              عنوان جدید محصول را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateProductTitle}
                onChange={(event) => setUpdateProductTitle(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <ImPriceTags />
            <label>
              مبلغ جدید محصول را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateProductPrice}
                onChange={(event) => setUpdateProductPrice(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <MdOutlineInventory />
            <label>
              :موجودی جدید محصول را وارد نمایید
              <input
                type="text"
                className="edit-product-input"
                value={updateProductCount}
                onChange={(event) => setUpdateProductCount(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <FaFileImage />
            <label>
              آدرس کاور جدید محصول را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateProductImg}
                onChange={(event) => setUpdateProductImg(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <BsClipboard2HeartFill />
            <label>
              میزان محبوبیت جدید محصول را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateProductPopularity}
                onChange={(event) =>
                  setUpdateProductPopularity(event.target.value)
                }
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <FcSalesPerformance />
            <label htmlFor="">
              :میزان فروش جدید محصول را وارد نمایید
              <input
                type="text"
                className="edit-product-input"
                value={updateProductSale}
                onChange={(event) => setUpdateProductSale(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <IoMdColorPalette />
            <label>
              :تعداد رنگ بندی جدید محصول را وارد نمایید
              <input
                type="text"
                className="edit-product-input"
                value={updateProductColors}
                onChange={(event) => setUpdateProductColors(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <BiCategory />
            <label>
              :شماره دسته بندی جدید محصول را وارد نمایید
              <input
                type="text"
                className="edit-product-input"
                value={updateProductCategory}
                onChange={(event) =>
                  setUpdateProductCategory(event.target.value)
                }
              />
            </label>
          </div>
        </EditModal>
      )}
    </>
  );
}
