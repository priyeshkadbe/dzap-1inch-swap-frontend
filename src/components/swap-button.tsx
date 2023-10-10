import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface SwapButtonProps {
  onClick: () => void;
  isConnected: boolean;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick, isConnected }) => {
  return (
    <>
      {isConnected ? (
        <button
          className="w-full flex justify-center items-center gap-x-4 bg-blue-400 rounded-xl py-4 hover:bg-blue-900 text-blue-600 hover:text-white"
          onClick={onClick}
        >
          <p className="text-md text-white">swap</p>
        </button>
      ) : (
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      )}
    </>
  );
};

export default SwapButton;
