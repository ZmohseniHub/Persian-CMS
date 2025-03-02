import ErrorBox from "../ErrorBox/ErrorBox";
import { useEffect, useState } from "react";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import "./Comments.css";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [IsShowRejactModal, setIsShowRejactModal] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [commentId, setCommentId] = useState(null);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
      .then((comments) => {
        console.log(comments);
        setAllComments(comments);
      });
  }

  const closeDetailsModal = () => {
    setIsShowDetailsModal(false);
  };

  const closeDeleteAction = () => {
    setIsShowDeleteModal(false);
  };

  const deleteComment = () => {
    console.log("comment deleted");

    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowDeleteModal(false);
        getAllComments();
      });
  };

  const closeEditModal = () => {
    setIsShowEditModal(false);
  };

  const updateComments = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: commentBody,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowEditModal(false);
        getAllComments();
      });

    console.log("comments updated");
  };

  const closeAcceptAction = () => {
    setIsShowAcceptModal(false);
  };

  const confitmAcceptAcction = () => {
    console.log("confirm accept action");

    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowAcceptModal(false);
        getAllComments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const closeRejetAction = () => {
    setIsShowRejactModal(false);
  };
  const confitmRejectAcction = () => {
    console.log("rejct");

    fetch(`http://localhost:8000/api/comments/reject/${commentId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowRejactModal(false);
        getAllComments();
      });
  };

  return (
    <div className="comments">
      {allComments.length ? (
        <div className="comments-table-wrapper">
          <table className="coments-table">
            <thead>
              <tr className="coments-table-tr">
                <th>اسم کاربر</th>
                <th>محصول</th>
                <th>متن کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
              </tr>
            </thead>
            <tbody>
              {allComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDetailsModal(true);
                        setCommentBody(comment.body);
                      }}
                    >
                      دیدن متن
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td className="comment-table-button-wrapper">
                    <button>پاسخ</button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setCommentId(comment.id);
                        setCommentBody(comment.body);
                      }}
                    >
                      ویرایش
                    </button>
                    {comment.isAccept === 0 ? (
                      <button
                        onClick={() => {
                          setIsShowAcceptModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        تایید
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsShowRejactModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        رد کامنت
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setCommentId(comment.id);
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <p className="comments-details-modal-body">{commentBody}</p>
        </DetailsModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          submitAction={deleteComment}
          cancelAction={closeDeleteAction}
          title="حذف کامنت"
        ></DeleteModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateComments}>
          <div className="edit-proructs-form-group">
            <input
              type="text"
              className="edit-product-input"
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}
            />
          </div>
        </EditModal>
      )}
      {isShowAcceptModal && (
        <DeleteModal
          cancelAction={closeAcceptAction}
          submitAction={confitmAcceptAcction}
          title="تایید کامنت"
        />
      )}
      {IsShowRejactModal && (
        <DeleteModal
          cancelAction={closeRejetAction}
          submitAction={confitmRejectAcction}
          title="رد کامنت"
        />
      )}
    </div>
  );
}
