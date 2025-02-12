import React from 'react';

const Right = ({ onPlusClick }) => {
  return (
    <div className='w-full lg:w-1/4 bg-gray-100 p-4"'>
    <div className="w-72 bg-gray-100 my-52 h-48 rounded-3xl relative">
      <div className="bg-white w-full h-full rounded-3xl mt-8 relative flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <svg
            className="w-12 h-12 self-center cursor-pointer hover:scale-105 transition-all"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            onClick={onPlusClick}
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Right;
