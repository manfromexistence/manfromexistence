"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface SubmitModalProps {
  show: boolean;
  setShowSubmitModal: Dispatch<SetStateAction<boolean>>;
}

const SubmitModal = ({ setShowSubmitModal, show }: SubmitModalProps) => {
  return (
    <>
      {show && (
        <div
          className="bg-black/20 fixed inset-0 w-full h-dvh z-50 backdrop-blur-sm flex items-center justify-center"
          onClick={(e) =>
            e.target === e.currentTarget && setShowSubmitModal(false)
          }
        >
          <div className="bg-white md:w-[40%] w-11/12 shadow-xl p-6 rounded-md">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xl font-semibold">Submit a resource</h2>
              <button
                className="w-6 h-6 border rounded-lg flex items-center justify-center"
                onClick={() => setShowSubmitModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <p>
              Submit a resource for other freelancers. If we like it too, we’ll
              feature it on Freelance Things.
            </p>
            <div className="flex items-center justify-center flex-col gap-4 pt-6">
              <input
                placeholder="Enter the title of the resource"
                className="outline-none focus:outline-none py-2 px-4 w-full rounded-md flex-1 border focus:border-black/80"
              />
              <input
                placeholder="Enter the resource link"
                className="outline-none focus:outline-none py-2 px-4 w-full rounded-md flex-1 border focus:border-black/80"
              />
              <textarea
                rows={6}
                placeholder="Enter the resource description (optional)"
                className="outline-none focus:outline-none py-2 px-4 w-full rounded-md flex-1 border focus:border-black/80"
              />
              <button
                className="bg-black/90 text-white rounded-md px-4 py-2 w-full"
                onClick={() => setShowSubmitModal(false)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitModal;
