import { ArrowLeftIcon } from "lucide-react";

const NoticeNotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl p-8 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Notice Not Found
        </h2>

        <p className="mb-6 text-gray-500">
          The notice you are looking for does not exist or may have been deleted.
        </p>

        <button className="btn btn-primary">
          <ArrowLeftIcon className="size-5" />
          Back
        </button>

      </div>
    </div>
  );
};

export default NoticeNotFound;