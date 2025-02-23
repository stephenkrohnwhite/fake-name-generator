"use client";

import React, { useState, useEffect } from "react";
import NameCard from "./NameCard";

const NameList = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(5);
  const [filterValue, setFilterValue] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let res = await fetch(`https://randomuser.me/api?results=${userCount}`);
        let data = await res.json();
        setUsers(data.results);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, [userCount]);

  const getMaxUserOptions = () => {
    let userOptions = [];
    for (let i = 0; i < 10; i++) {
      userOptions.push(
        <option key={i + 1} className="text-white bg-slate-600" value={i + 1}>
          {i + 1}
        </option>
      );
    }
    return userOptions;
  };

  const handleMaxUserChange = ({ target }) => {
    let { value } = target;
    setUserCount(value);
  };

  const handleFilterChange = ({ target }) => {
    let { value } = target;
    setFilterValue(value);
  };

  const filterUserByName = (user) => {
    let name = `${user.name.first} ${user.name.last}`;
    name = name.toLowerCase();
    if (name.includes(filterValue.toLowerCase())) {
      return true;
    } else return false;
  };

  const handlePageClick = ({ target }) => {
    let { name } = target;
    let index;
    let totalPages = Math.ceil(users.length / 5);
    if (name === "previous" && pageIndex !== 1) {
      index = pageIndex - 1;
      setPageIndex(index);
    } else if (name === "next" && pageIndex < totalPages) {
      index = pageIndex + 1;
      setPageIndex(index);
    }
  };

  const filterByPageIndex = (index) => {
    let pageMax = pageIndex * 5;
    let pageMin = pageMax - 5;
    if (index >= pageMin && index < pageMax) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <h1 className="text-white text-6xl ">Fake Name Generator</h1>
      <div className="flex">
        <div className="flex flex-col w-2/3 gap-2 px-4">
          <ul>
            {users &&
              users.map((user, index) => {
                if (filterByPageIndex(index) && filterValue === null) {
                  return <NameCard key={user.name.last} user={user} />;
                } else if (filterValue !== null && filterUserByName(user)) {
                  return <NameCard key={user.name.last} user={user} />;
                } else return null;
              })}
          </ul>
          <div className="flex justify-center">
            <button
              className="flex-col px-3"
              name="previous"
              onClick={handlePageClick}
            >
              Previous
            </button>
            <button
              className="flex-col px-3"
              name="next"
              onClick={handlePageClick}
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-2 px-4 text-white">
          <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-70 pt-2">
            <label>Change # of Total Users</label>
            <select
              className="text-black rounded w-32"
              onChange={handleMaxUserChange}
              value={userCount}
            >
              {getMaxUserOptions()}
            </select>
            <br />
            <label className="pt-4">Filter Users By Name</label>
            <input
              className="rounded text-black"
              onChange={handleFilterChange}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default NameList;
