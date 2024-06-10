
import React from "react";

const RequestModa = ({ title, children, onClose, onConfirm ,  setAdditionalInfo }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>{children}</div>

        <textarea onChange={(e)=>setAdditionalInfo(e.target.value)} className="border w-full mt-4 p-2" placeholder="Addition Information" name="" id="" cols="30" rows="5"></textarea>

        <div className="flex justify-end mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md mr-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModa;
