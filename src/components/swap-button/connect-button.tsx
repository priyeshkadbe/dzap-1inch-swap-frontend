import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { style } from './style';

interface ConnectButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ onClick, loading }) => {
  return (
    <button className={style.button} onClick={onClick} disabled={loading}>
      {loading ? (
        <FaSpinner className="animate-spin text-gray-400" />
      ) : (
        <p className="text-md text-white">Connect to MetaMask</p>
      )}
    </button>
  );
};

export default ConnectButton;
