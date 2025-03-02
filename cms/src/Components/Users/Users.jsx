import { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import EditModal from "../EditModal/EditModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./Users.css";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [mainUser, setMainUser] = useState(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const [updateUserFirstname, setUpdateUserFirstname] = useState("");
  const [updateUserLastname, setUpdateUserLastname] = useState("");
  const [updateUsername, setUpdatetUsername] = useState("");
  const [updateUserPassword, setUpdateUserPassword] = useState("");
  const [updateUserPhone, setUpdateUserPhone] = useState("");
  const [updateUserCity, setUpdateUserCity] = useState("");
  const [updateUserEmail, setUpdateUserEmail] = useState("");
  const [updateUserAddress, setUpdateUserAddress] = useState("");
  const [updateUserScore, setUpdateUserScore] = useState("");
  const [updateUserBuy, setUpdateUserBuy] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    fetch("http://localhost:8000/api/users/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setAllUsers(result);
      });
  }

  const closeEditModal = () => {
    setIsShowEditModal(false);
  };
  const updateUser = (event) => {
    event.preventDefault();

    const newUserInfo = {
      firsname: updateUserFirstname,
      lastname: updateUserLastname,
      username: updateUsername,
      password: updateUserPassword,
      phone: updateUserPhone,
      city: updateUserCity,
      email: updateUserEmail,
      address: updateUserAddress,
      score: updateUserScore,
      buy: updateUserBuy,
    };

    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowEditModal(false);
        getAllUsers();
      });
  };

  const closeDetailsModal = () => {
    setIsShowDetailsModal(false);
  };

  const deleteUser = async () => {
    console.log("سابمیت (حذف) میشود");
    console.log(userId);

    try {
      const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: "DELETE",
      });

      const text = await res.text();
      const result = text ? JSON.parse(text) : {};

      console.log("نتیجه حذف:", result);

      setIsShowDeleteModal(false);
      getAllUsers();
    } catch (error) {
      console.error("خطا در حذف :", error);
    }
  };
  const closeDeleteModal = () => {
    setIsShowDeleteModal(false);
  };

  return (
    <div className="users">
      {allUsers.length ? (
        <div>
          <h1 className="users-title">لیست کاربران</h1>
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>نام و نام خانوادگی</th>
                  <th>نام کاربری</th>
                  <th>رمز عبور</th>
                  <th>شماره تماس</th>
                  <th>ایمیل</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.firsname} {user.lastname}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="users-table-button-wrapper">
                        <button
                          onClick={() => {
                            setIsShowDetailsModal(true);
                            setMainUser(user);
                          }}
                        >
                          جزییات
                        </button>
                        <button
                          onClick={() => {
                            setIsShowEditModal(true);
                            setUserId(user.id);

                            setUpdateUserFirstname(user.firsname);
                            setUpdateUserLastname(user.lastname);
                            setUpdatetUsername(user.username);
                            setUpdateUserPassword(user.password);
                            setUpdateUserPhone(user.phone);
                            setUpdateUserCity(user.city);
                            setUpdateUserEmail(user.email);
                            setUpdateUserAddress(user.address);
                            setUpdateUserScore(user.score);
                            setUpdateUserBuy(user.buy);
                          }}
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            setUserId(user.id);
                          }}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateUser}>
          <div className="edit-proructs-form-group">
            <label>
              نام جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUserFirstname}
                onChange={(event) => setUpdateUserFirstname(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <label>
              نام خانوادگی جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUserLastname}
                onChange={(event) => setUpdateUserLastname(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <label>
              پسورد جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUsername}
                onChange={(event) => setUpdateUserPassword(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <label>
              تلفن جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUserPassword}
                onChange={(event) => setUpdateUserPhone(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <label>
              شهر محل زندگی جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUserCity}
                onChange={(event) => setUpdateUserCity(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <label>
              ایمیل جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUserEmail}
                onChange={(event) => setUpdateUserEmail(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <label>
              آدرس جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUserAddress}
                onChange={(event) => setUpdateUserAddress(event.target.value)}
              />
            </label>
          </div>
          <div className="edit-proructs-form-group">
            <label>
              میزان خرید جدید کاربر را وارد نمایید:
              <input
                type="text"
                className="edit-product-input"
                value={updateUserBuy}
                onChange={(event) => setUpdateUserBuy(event.target.value)}
              />
            </label>
          </div>
        </EditModal>
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="details-modal-table">
            <thead>
              <tr>
                <th>محل زندگی کاربر</th>
                <th>آدرس کاربر</th>
                <th>امتیاز کاربر در سایت</th>
                <th>میزان خرید کاربرد از سایت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainUser.city}</td>
                <td>{mainUser.address}</td>
                <td>{mainUser.score}</td>
                <td>{mainUser.buy.toLocaleString("fa-IR")} تومان </td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="حذف کاربر"
          submitAction={deleteUser}
          cancelAction={closeDeleteModal}
        ></DeleteModal>
      )}
    </div>
  );
}
