import React from "react";
import Link from "next/navigation";
import { AiOutlineDown } from "react-icons/ai";
import { Token } from "../types"; // Define Token type if not already defined
interface TokenSelectorProps {
  token: Token | null;
  onSelect: () => void;
}

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `flex flex-col bg-[#191B1F] w-[30rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  container: `px-2 py-4 bg-[#20242A] my-3 rounded-2xl border border-[#20242A] hover:border-[#41444F]`,
  selectorContainer: `flex flex-col gap-y-2 `,
  selector: `flex justify-between items-center gap-x-2 `,
  selectorDropdown: `text-gray-300 cursor-pointer flex items-center gap-x-2 bg-[#44556f] p-2 rounded-md `,
  input: `bg-transparent text-xl text-end outline-none`,
  rateContainer: `bg-gray-800 rounded-xl my-4 p-3 flex justify-between items-center`,
  icon: `text-gray-600`,
  button: `w-full flex justify-center items-center gap-x-4 bg-blue-400 rounded-xl py-4 hover:bg-blue-900 text-blue-600 hover:text-white`,
};


const TokenSelector: React.FC<TokenSelectorProps> = ({ token, onSelect }) => {
  return (
    <div className={style.selectorDropdown} onClick={onSelect}>
      {token ? (
        <>
          <div className="h-6 w-6">
            <img src={token.logoURI} alt="token logo" />
          </div>
          <h4 className="text-sm">{token.symbol}</h4>
        </>
      ) : (
        <h4 className="text-sm">Select Token</h4>
      )}
      <AiOutlineDown size={18} />
    </div>
  );
};

export default TokenSelector;

