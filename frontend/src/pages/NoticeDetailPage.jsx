import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const NoticeDetailPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [expirydate, setExpirydate] = useState("");
  const [postedby, setPostedby] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await api.get(`/notices/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDepartment(res.data.department);
        setPriority(res.data.priority);
        setExpirydate(res.data.expirydate?.substring(0,10));
        setPostedby(res.data.postedby);
        setStatus(res.data.status);
      } catch (error) {
        toast.error("Failed to fetch notice");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this notice?"))
      return;
    try {
      await api.delete(`/notices/${id}`);
      toast.success("Notice deleted successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to delete notice");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/notices/${id}`, {
        title, description, department, priority, expirydate, postedby, status,
      });
      toast.success("Notice updated successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to update notice");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <button onClick={() => (window.location.href = "/")} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back
          </button>

          <div className="card bg-base-100">
            <div className="card-body">
            <h2 className="card-title text-2xl mb-4"> Edit Notice </h2>

              <input type="text" className="input input-bordered mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea className="textarea textarea-bordered mb-4" value={description} onChange={(e) => setDescription(e.target.value)} />
              <input type="text" className="input input-bordered mb-4" value={department} onChange={(e) => setDepartment(e.target.value)} />
              <input type="date" className="input input-bordered mb-4" value={expirydate} onChange={(e) => setExpirydate(e.target.value)} />

              <select className="select select-bordered mb-4" value={priority} onChange={(e) => setPriority(e.target.value)} >
                <option>High</option>
                <option>Normal</option>
                <option>Low</option>
              </select>

              <input type="text" className="input input-bordered mb-4" value={postedby} onChange={(e) => setPostedby(e.target.value)} />

              <select className="select select-bordered mb-4" value={status} onChange={(e) => setStatus(e.target.value)} >
                <option>Active</option>
                <option>Expired</option>
              </select>

              <div className="card-actions justify-between">
                <button onClick={handleDelete} className="btn btn-error btn-outline" >
                  <Trash2Icon className="size-5" /> Delete
                </button>

                <button className="btn btn-primary" disabled={saving} onClick={handleSave} >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;