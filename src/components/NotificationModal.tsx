/* eslint-disable @next/next/no-img-element */
import React from "react";
import { showTransactionHash } from "../../utils";
import { ITransactionHash } from "../_type_";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  hash?: ITransactionHash;
}

export default function NotificationModal({ isOpen, hash, onClose }: IProps) {
  const onNavigation = () => {
    if (window) {
      window.open(`https://testnet.bscscan.com/tx/${hash?.hash}`, "_blank");
    }
  };
  return (
    <div
      id="popup-modal"
      className={`${
        isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full bg-white/50`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto  m-auto mt-32 ">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-6 text-center">
            {hash?.isSuccess && (
              <h3 className="mb-5 text-xl font-medium text-green-800 dark:text-gray-400">
                (Your Transaction Successful!)
              </h3>
            )}
            {!hash?.isSuccess && (
              <h3 className="mb-5 text-xl font-medium text-red-800 dark:text-gray-400">
                (Your Transaction Failure!)
              </h3>
            )}
            <div
              className="border rounded-lg inline-block p-2 mb-3 hover:cursor-pointer"
              onClick={onNavigation}
            >
              {showTransactionHash(hash?.hash || "")}
            </div>
            <br />
            <button
              data-modal-toggle="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={() => onClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
