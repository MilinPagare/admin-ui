import React from "react";

const Delete = ({ onClick, size }) => {
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
        d="M10.0003 3.18623H1.99963M6.98444 5.43566V8.2484M5.01551 5.43566V8.2484M7.77084 10.5005H4.22911C3.6412 10.5005 3.15242 10.0479 3.10733 9.46169L2.62469 3.18737H9.37526L8.89262 9.46169C8.84753 10.0479 8.35874 10.5005 7.77084 10.5005ZM4.5936 1.49982H7.40634C7.71703 1.49982 7.96889 1.75168 7.96889 2.06236V3.18746H4.03106V2.06236C4.03106 1.75168 4.28292 1.49982 4.5936 1.49982Z"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
Delete.defaultProps = {
  size: 20,
};
export default Delete;
