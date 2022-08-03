import React from "react";
import "./Table.css";
import Edit from "../../Icons/Edit";
import Delete from "../../Icons/Delete";

const Table = ({
  usersData,
  selectedUsers,
  handleCheckBox,
  deleteSingleRow,
  setEditable,
  editingUsers,
  changeUserDetails,
}) => {
  return (
    <>
      {usersData.map((item) => (
        <tr
          key={item.id}
          className={selectedUsers[item.id] ? "tr-active" : null}
        >
          <td>
            <input
              type="checkbox"
              checked={selectedUsers[item.id]}
              onChange={() => {
                handleCheckBox(item);
              }}
            />
          </td>
          <td>
            {editingUsers[item.id] ? (
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(event) => {
                  changeUserDetails(event, item);
                }}
              />
            ) : (
              item.name
            )}
          </td>
          <td>
            {editingUsers[item.id] ? (
              <input
                type="text"
                name="email"
                value={item.email}
                onChange={(event) => {
                  changeUserDetails(event, item);
                }}
              />
            ) : (
              item.email
            )}
          </td>
          <td>
            {editingUsers[item.id] ? (
              <select
                name="role"
                value={item.role}
                onChange={(event) => {
                  changeUserDetails(event, item);
                }}
              >
                <option value="admin">admin</option>
                <option value="member">member</option>
              </select>
            ) : (
              item.role
            )}
          </td>
          <td>
            <button
              className={`edit-delete-btn ${
                selectedUsers[item.id] ? "tr-active" : null
              }`}
            >
              <Edit
                onClick={() => {
                  setEditable(item);
                }}
              />
            </button>
            <button
              className={`edit-delete-btn ${
                selectedUsers[item.id] ? "tr-active" : null
              }`}
            >
              <Delete
                onClick={() => {
                  deleteSingleRow(item);
                }}
              />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default Table;
