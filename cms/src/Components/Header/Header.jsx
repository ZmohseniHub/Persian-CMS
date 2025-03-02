import { TbBrightnessUpFilled } from "react-icons/tb";
import { FaRegBell } from "react-icons/fa";

import "./Header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="admin-profile">
                <img src="/img/saeedi.jpeg" alt="admin profile" />
                <div className="admin-profile-info">
                    <h1>محمد امین سعیدی</h1>
                    <h3>برنامه نویس فرانت اند</h3>
                </div>
            </div>
            <div className="header-left">
                <div className="search-box">
                    <input type="text" placeholder="جست و جو کنید" />
                    <button>جست و جو</button>
                </div>
                <button className="header-left-icon"><TbBrightnessUpFilled /></button>
                <button className="header-left-icon"><FaRegBell /></button>
            </div>
        </div>
    )
}
