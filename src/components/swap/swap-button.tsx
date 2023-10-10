import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import  {style}  from "./style";

type SwapButtonProps = {
  isConnected: boolean;
};



const SwapButton: React.FC<SwapButtonProps> = ({ isConnected }) => {

  useEffect(() => {
  },[isConnected])

   return (
     <div>
       {isConnected ? (
         <button className={style.button}>
           <p className="text-md text-white">swap</p>
         </button>
       ) : (
         <div className="flex justify-center">
           <ConnectButton />
         </div>
       )}
     </div>
   );
};

export default SwapButton;
