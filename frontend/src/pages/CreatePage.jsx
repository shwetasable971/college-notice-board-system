import api from "../lib/axios";
import { ArrowLeftIcon, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

const CreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [expiryDate, setExpiryDate] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchNotice = async () => {
      try {
        const res = await api.get(`/notices/${id}`);
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setDepartment(data.department);
        setPriority(data.priority);
        setExpiryDate(data.expiryDate ? data.expiryDate.split("T")[0] : "");
        setPostedBy(data.postedBy || "");
        setStatus(data.status || "Active");
      } catch {
        toast.error("Failed to load notice");
      }
    };
    fetchNotice();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !postedBy || !expiryDate) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await api.put(`/notices/${id}`, {
          title, description, department, priority, expiryDate, postedBy, status,
       });
        toast.success("Notice updated successfully!");
      } else {
        await api.post("/notices", {
          title, description, department, priority, expiryDate, postedBy, publishDate: new Date().toISOString().split("T")[0], status,
        });
        toast.success("Notice created successfully!");
      }
      navigate("/");
    } catch {
      toast.error("Failed to save notice");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  try {
    await api.delete(`/notices/${id}`);
    toast.success("Notice deleted successfully!");
    setShowDeleteModal(false);
    navigate("/");
  } catch (error) {
    toast.error("Delete failed");
  }
};

 return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6 flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" /> Back to Notices
          </Link>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4"> {id ? "Edit Notice" : "Create New Notice"} </h2>

            {/* Delete Button */}
            {id && (
           <div className="flex justify-end mb-4">
           <button type="button" onClick={() => setShowDeleteModal(true)} className="btn btn-outline btn-error flex items-center gap-2" >
           <Trash2 size={18} />
            Delete
            </button>
          </div>
          )}

               <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="w-24 font-medium text-gray-700 mb-1"> Title </label>
                  <input type="text" className="flex-1 border border-gray-300 rounded-md px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                {/* Description */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="w-24 font-medium text-gray-700 mb-1"> Description </label>
                  <textarea rows="4" className="flex-1 border border-gray-300 rounded-md px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                {/* Department */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="w-24 font-medium text-gray-700 mb-1"> Department </label>
                  <input type="text" className="flex-1 border border-gray-300 rounded-md px-3 py-2" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>

                {/* Priority */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="w-24 font-medium text-gray-700 mb-1"> Priority </label>
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2" value={priority} onChange={(e) => setPriority(e.target.value)} >
                    <option>High</option>
                    <option>Normal</option>
                    <option>Low</option>
                  </select>
                </div>

                {/* Expiry Date */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="w-24 font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input type="date" className="flex-1 border border-gray-300 rounded-md px-3 py-2" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                </div>

                {/* Posted By */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="w-24 font-medium text-gray-700 mb-1">
                    Posted By
                  </label>
                  <input type="text" className="flex-1 border border-gray-300 rounded-md px-3 py-2" value={postedBy} onChange={(e) => setPostedBy(e.target.value)} required />
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 mb-4">
                  <label className="w-24 font-medium text-gray-700 mb-1"> Status </label>
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading} >
                    {loading
                      ? id
                        ? "Updating..."
                        : "Creating..."
                      : id
                        ? "Update Notice"
                        : "Create Notice"}
                  </button>
                </div>
              </form>
              {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-base-100 p-6 rounded-xl shadow-xl w-96">
      
      <h3 className="text-lg font-bold text-error mb-4 flex items-center gap-2">
        <Trash2 size={20} /> Delete Notice </h3>

      <p className="text-gray-600 mb-6">
        Are you sure you want to delete <br />
        <span className="font-semibold">"{title}"</span>? <br />
        This action cannot be undone. </p>

      <div className="flex justify-end gap-3">
        <button onClick={() => setShowDeleteModal(false)} className="btn btn-ghost" > Cancel </button>
        <button onClick={handleDelete} className="btn btn-error"> Delete </button>
       </div>
      </div>
    </div>
      )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;