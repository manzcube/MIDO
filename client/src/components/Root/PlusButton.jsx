import React from "react";

const PlusButton = ({ onClick, open }) => {
  return (
    <button
      className="rounded text-white bg-sky-900 hover:text-sky-900 hover:bg-white transition-all duration-200"
      onClick={onClick}
    >
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width={3}
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      )}
    </button>
  );
};

export default PlusButton;
