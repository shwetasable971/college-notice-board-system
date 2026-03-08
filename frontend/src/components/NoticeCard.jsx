import React, { useState } from "react";
import { Link } from "react-router";
import { Edit2Icon, Trash2Icon, UserIcon, Building, Pin } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoticeCard = ({ notice, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const priorityColors = { High: "bg-red-500", Normal: "bg-blue-500", Low: "bg-green-500" };
  const statusColors = { Active: "bg-green-500", Draft: "bg-yellow-500", Expired: "bg-gray-500" };

  const handleDelete = async () => {
    try {
      if(!notice?._id) {
      toast.error("Invalid notice ID");
      return;
      }
      await api.delete(`/notices/${notice._id}`);
      toast.success("Notice deleted successfully!");
      if(onDelete) {
        onDelete(notice._id);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to delete notice");
    } finally {
      setShowModal(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-GB", options);
  };

  return (
      <>
      {/* CARD */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 h-full flex flex-col">
        
        {/* Title + Status */}
       <div className="flex justify-between items-start mb-2">
  
        {/* Left: Pin + Title */}
       <div className="flex items-center gap-2">
        {notice.priority === "High" && (
          <span className="flex items-center gap-1 text-xs px-3 py-1 bg-yellow-500 text-white rounded full font-semibold">
           <Pin className="w-3 h-3" /> 
          </span>
        
     )}
        <h2 className="font-bold text-lg">{notice.title}</h2>
   </div>

        {/* Right: Status Badge */}
      <span className={`text-xs px-3 py-1 rounded-full text-white font-medium ${statusColors[notice.status]}`} >
    {notice.status}
     </span>
     </div>

        {/* Full Description */}
        <p className="text-sm text-gray-700 mb-2">{notice.description}</p>

        {/* Department + Posted By + Date */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Building className="w-4 h-4 text-gray-500" />
          <span>{notice.department}</span>
          <span className="flex items-center gap-1">
            <UserIcon className="w-3 h-3" /> {notice.postedBy || "Admin"} | {formatDate(notice.publishDate || new Date())}
          </span>
        </div>

        {/* Priority Badge */}
        <div className="mb-2">
         <span className={`text-xs px-2 py-0.5 rounded-md font-medium
         ${notice.priority === "High"
         ? "bg-red-500 text-white"
         : notice.priority === "Normal"
         ? "bg-blue-500 text-white"
         : "bg-gray-500 text-white"
         }`}>
        {notice.priority} 
         </span>
        </div>

        {/* Edit/Delete  Icons */}
        <div className="flex justify-end gap-2">
          <Link to={`/edit/${notice._id}`} className="btn btn-sm btn-outline btn-primary p-2">
            <Edit2Icon className="w-4 h-4" />
          </Link>
          <button onClick={() => setShowModal(true)} className="btn btn-sm btn-outline btn-error p-2">
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2Icon className="size-5" /> Delete Notice
            </h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete <span className="font-semibold">{notice.title}</span>? <br />
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}>
                <Trash2Icon className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
    
  );
};

export default NoticeCard;