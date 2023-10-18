import { useTokenContext } from '@/context/TokenContext';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { ethers } from 'ethers';

export default function SwitchTokens() {
  const {
    buyingToken,
    sellingToken,
    buyingTokenAmount,
    sellingTokenAmount,
    setSellingToken,
    setBuyingToken,
    setSellingTokenAmount,
    setBuyingTokenAmount,
  } = useTokenContext();

  const handleSwitch = () => {



    if (
      sellingToken !== null &&
      sellingToken !== undefined &&
      buyingToken !== null &&
      buyingToken !== undefined &&
      buyingTokenAmount !== null &&
      buyingTokenAmount !== undefined &&
      buyingTokenAmount !== '0'
    ) {
      setBuyingToken(null);
      setSellingToken(null);
      setSellingTokenAmount("0");
      let token1 = sellingToken;
      let token2 = buyingToken;
      let amount = buyingTokenAmount;
      setSellingToken(token2);
      setBuyingToken(token1);
      setSellingTokenAmount(amount);
    }

    

  };

  return (
    <button
      className="flex justify-center rounded-full items-center absolute right-[42%] top-[40%]   transition-transform ease-in-out -my-2"
      aria-label="Switch Tokens"
      onClick={() => handleSwitch()}
    >
      <AiOutlineArrowDown
        size={60}
        className="bg-[#191B1F] rounded-full p-4 transition-transform duration-300 ease-in-out transform hover:rotate-180 "
      />
    </button>
  );
}
