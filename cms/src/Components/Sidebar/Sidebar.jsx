import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { FiShoppingBag } from "react-icons/fi";
import { TbRosetteDiscount } from "react-icons/tb";

import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">به داشبورد خود خوش آمدید</h1>
      <ul className="sidebar-links">
        <NavLink to="/">
          <IoHomeOutline />
          صفحه اصلی
        </NavLink>
        <NavLink to="/products">
          <MdProductionQuantityLimits />
          محصولات
        </NavLink>
        <NavLink to="/comments">
          <FaRegComments />
          کامنت ها
        </NavLink>
        <NavLink to="/users">
          <HiOutlineUsers />
          کاربران
        </NavLink>
        <NavLink to="/orders">
          <FiShoppingBag />
          سفارشات
        </NavLink>
        <NavLink to="/discounts">
          <TbRosetteDiscount />
          تخفیف ها
        </NavLink>
      </ul>
    </div>
  );
}
