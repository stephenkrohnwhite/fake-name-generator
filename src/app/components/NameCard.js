"use client";

import React from "react";

const NameCard = ({ user }) => {
  return (
    <li className="py-2" key={user.name.last}>
      <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <label className="inline-block text-white py-1 space-x-1">
          Name: &nbsp;
        </label>
        <p className="inline-block">{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
        <br />
        <label className="inline-block text-white py-1  space-x-1">
          DOB: &nbsp;
        </label>
        <p className="inline-block">{`${user.dob.date
          .replace("T", " ")
          .replace("Z", "")}`}</p>
        <br />
        <label className="inline-block text-white py-1 space-x-1">
          Gender: &nbsp;
        </label>
        <p className="inline-block">{`${user.gender}`}</p>
        <br />
        <label className="inline-block text-white py-1 space-x-1">
          Email: &nbsp;
        </label>
        <p className="inline-block">{`${user.email}`}</p>
      </div>
    </li>
  );
};

export default NameCard;
