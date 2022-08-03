import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import "./LandingPage.css";

const AdminUi = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(5);
  const [pageLimit, setPageLimit] = useState(5);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [editingUsers, setEditingUsers] = useState({});

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredUsers = usersData.filter((item) => {
    if (
      item.name.toLowerCase().search(searchKeyWord) > -1 ||
      item.email.toLowerCase().search(searchKeyWord) > -1 ||
      item.role.toLowerCase().search(searchKeyWord) > -1
    ) {
      return item;
    }
  });

  const pages = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const currentPageUsers = filteredUsers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    getUsersData();
  }, []);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const getUsersData = async () => {
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const users = await response.json();
    setUsersData(users);
    setSelectedUsers(
      users.reduce(
        (newSelectedUsers, user) => ({ ...newSelectedUsers, [user.id]: false }),
        {}
      )
    );
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageLimit === 0) {
      setMinLimit(minLimit - pageLimit);
      setMaxLimit(maxLimit - pageLimit);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(pages[0]);
  };

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxLimit) {
      setMaxLimit(maxLimit + pageLimit);
      setMinLimit(minLimit + pageLimit);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(pages[pages.length - 1]);
  };

  const handleSearch = (event) => {
    const searchElement = event.target.value.toLowerCase();
    setSearchKeyWord(searchElement);
  };

  const handleCheckBox = (item) => {
    if (selectedUsers[item.id]) {
      setSelectedUsers({ ...selectedUsers, [item.id]: false });
    } else {
      setSelectedUsers({ ...selectedUsers, [item.id]: true });
    }
  };

  const handleCheckAll = (event) => {
    let newSelectedUsers = { ...selectedUsers };
    currentPageUsers.forEach((item) => {
      newSelectedUsers[item.id] = event.target.checked;
    });
    setSelectedUsers({ ...selectedUsers, ...newSelectedUsers });
  };

  const deleteRows = () => {
    const arr = usersData.filter((item) => !selectedUsers[item.id]);
    setUsersData([...arr]);
  };

  const deleteSingleRow = (item) => {
    const arr = usersData.filter((obj) => {
      if (obj.id !== item.id) {
        return obj;
      }
    });
    setUsersData([...arr]);
  };

  const setEditable = (item) => {
    if (editingUsers[item.id]) {
      setEditingUsers({ ...editingUsers, [item.id]: false });
    } else {
      setEditingUsers({ ...editingUsers, [item.id]: true });
    }
  };

  const changeUserDetails = (event, item) => {
    let newUserData = [...usersData];
    let userIndex = usersData.findIndex((obj) => obj.id === item.id);
    newUserData[userIndex][event.target.name] = event.target.value;
    setUsersData(newUserData);
  };

  return (
    <div className="parent-div">
      <input
        className="searchBox"
        type="text"
        placeholder="Search by name, email or role"
        value={searchKeyWord}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  !currentPageUsers.find((user) => !selectedUsers[user.id])
                }
                onChange={handleCheckAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <Table
            usersData={currentPageUsers}
            selectedUsers={selectedUsers}
            handleCheckBox={handleCheckBox}
            deleteSingleRow={deleteSingleRow}
            setEditable={setEditable}
            editingUsers={editingUsers}
            changeUserDetails={changeUserDetails}
          />
        </tbody>
      </table>
      <div className="del-page-btn">
        <button className="del-btn" onClick={deleteRows}>
          Delete Selected
        </button>
        <div className="page-btn">
          <button
            disabled={currentPage === pages[0] ? true : false}
            className={currentPage === pages[0] ? "disable" : "notactive"}
            onClick={handleFirstPage}
          >
            {"<<"}
          </button>
          <button
            disabled={currentPage === pages[0] ? true : false}
            className={currentPage === pages[0] ? "disable" : "notactive"}
            onClick={handlePrevBtn}
          >
            {"<"}
          </button>
          {pages.map((item) => {
            if (item > minLimit && item < maxLimit + 1) {
              return (
                <button
                  key={item}
                  id={item}
                  className={currentPage === item ? "active" : "notactive"}
                  onClick={(event) => handleClick(event)}
                >
                  {item}
                </button>
              );
            } else {
              return null;
            }
          })}
          <button
            disabled={currentPage === pages[pages.length - 1] ? true : false}
            className={
              currentPage === pages[pages.length - 1] ? "disable" : "notactive"
            }
            onClick={handleNextBtn}
          >
            {">"}
          </button>
          <button
            disabled={currentPage === pages[pages.length - 1] ? true : false}
            className={
              currentPage === pages[pages.length - 1] ? "disable" : "notactive"
            }
            onClick={handleLastPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUi;
