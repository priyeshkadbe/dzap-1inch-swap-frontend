import { useTokenContext } from "@/context/TokenContext";
import { AiOutlineArrowDown } from "react-icons/ai";

export default function SwitchTokens() {

  const { buyingToken, sellingToken, buyingTokenAmount, sellingTokenAmount,
  setSellingToken,setBuyingToken,setSellingTokenAmount,setBuyingTokenAmount
  } = useTokenContext()

  const handleSwitch = () => {
    let token1 = sellingToken;
    let token2 = buyingToken;
    let amount = buyingTokenAmount;
    setBuyingTokenAmount(0);
    setSellingToken(token2);
    setBuyingToken(token1);
    setSellingTokenAmount(amount!);
  }

  return (
    <button
      className="flex justify-center  transition-transform ease-in-out -my-2"
      aria-label="Switch Tokens"
      onClick={() => handleSwitch()}
    >
      <AiOutlineArrowDown
        size={60}
        className="bg-[#20242A] rounded-full p-4 transition-transform duration-300 ease-in-out transform hover:rotate-180 "
      />
    </button>
  );


}