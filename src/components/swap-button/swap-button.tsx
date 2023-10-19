import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { style } from './style';

interface SwapButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick, loading }) => {
  return (
    <button className={style.button} onClick={onClick} disabled={loading}>
      {loading ? (
        <FaSpinner className="animate-spin text-gray-400" />
      ) : (
        <p className="text-md text-white">Swap</p>
      )}
    </button>
  );
};

export default SwapButton;
