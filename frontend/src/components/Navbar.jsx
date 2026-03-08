import { Link } from "react-router";
import { PlusIcon, ClipboardList } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-6 py-4 border-b border-slate-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left: Icon + Title */}
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-white" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold tracking-wide">
              Notice Board & Campus Announcements
            </h1>
            <span className="text-xs text-gray-300">
              Official Portal for College Notices
            </span>
          </div>
        </div>

        {/* Right: New Notice Button */}
        <Link to="/create" className="btn btn-primary flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span>New Notice</span>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;