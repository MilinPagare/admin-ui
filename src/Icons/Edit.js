import React from "react";

const Edit = ({ onClick, size }) => {
  return (
    <svg
      onClick={onClick}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99991 3.23469L8.76547 5.00025M2.16742 8.06793L8.06778 2.16715C8.29063 1.94428 8.65233 1.94428 8.87518 2.16715L9.83286 3.1249C10.0557 3.34776 10.0557 3.70949 9.83286 3.93235L3.93193 9.83257C3.82508 9.94 3.67994 10 3.52852 10H2V8.47137C2 8.31994 2.06 8.17479 2.16742 8.06793Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
Edit.defaultProps = {
  size: 20,
};
export default Edit;
