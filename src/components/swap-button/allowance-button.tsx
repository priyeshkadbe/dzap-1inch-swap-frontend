import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { style } from './style';

interface AllowanceButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

const AllowanceButton: React.FC<AllowanceButtonProps> = ({
  onClick,
  loading,
}) => {
  return (
    <button className={style.button} onClick={onClick} disabled={loading}>
      {loading ? (
        <FaSpinner className="animate-spin text-gray-400" />
      ) : (
        <p className="text-md text-white">Grant Permission to Swap</p>
      )}
    </button>
  );
};

export default AllowanceButton;
