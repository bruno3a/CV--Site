import React from 'react';

const Tooltip = ({ content }) => {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                    text-sm bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
      {content}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 
                      border-4 border-transparent border-t-gray-900" />
    </div>
  );
};

export default Tooltip;
