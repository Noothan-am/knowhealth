import React from "react";

function AdminCards() {
  return (
    <div className="flex flex-col mt-2 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-l hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex flex-col justify-between p-3 leading-normal">
        <h5 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
}

export default AdminCards;
