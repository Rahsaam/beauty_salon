import React from 'react'

const MenuItem = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2 mt-6">
      <span>{icon}</span>
      <span className='text-sm font-light'>{text}</span>
    </div>
  );
};

export default MenuItem;
