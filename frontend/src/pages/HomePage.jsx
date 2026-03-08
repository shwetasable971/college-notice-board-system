import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import NoticeCard from "../components/NoticeCard";
import toast from "react-hot-toast";

const HomePage = () => {
  const [notices, setNotices] = useState([]);
  const handleDeleteFromUI = (id) => {
  setNotices((prev) =>
    prev.filter((notice) => notice._id !== id)
  );
};
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get("/notices");

        const visibleNotices = res.data.filter(
          (n) => !n.expiryDate || new Date(n.expiryDate) >= new Date()
        );

        visibleNotices.sort((a, b) => {
          const order = { High: 1, Normal: 2, Low: 3 };
          return order[a.priority] - order[b.priority];
        });
        setNotices(visibleNotices);
      } catch {
        toast.error("Failed to fetch notices");
      }
    };
    fetchNotices();
  }, []);

  const filtered = notices.filter((n) => {
    const matchesSearch = n.title?.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === "All" || n.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || n.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto px-6 py-8">

       <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input type="text" placeholder="Search by title..." className="input input-bordered flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="select select-bordered" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
          <select className="select select-bordered" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? <p className="text-center text-gray-500">No notices available.</p> : filtered.map((n) => <NoticeCard key={n._id} notice={n} onDelete={handleDeleteFromUI} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;