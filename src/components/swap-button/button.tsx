import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { style } from './style';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  loading: boolean;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  loading,
  text,
}) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
      {loading ? (
        <FaSpinner className="animate-spin text-gray-400" />
      ) : (
        <p className="text-md text-white">{text}</p>
      )}
    </button>
  );
};

export default Button;
