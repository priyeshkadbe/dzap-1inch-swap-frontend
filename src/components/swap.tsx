import Image from "next/image";
import { RiSettings3Fill, RiWalletLine } from "react-icons/ri";
import {
  AiOutlineDown,
  AiOutlinePlus,
  AiOutlineInfoCircle,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { LiaEqualsSolid } from "react-icons/lia";
import { FaGasPump } from "react-icons/fa";
import { TbTilde } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import ethLogo from "../assets/eth.png";
import Link from "next/link";
import { useTokenContext } from "@/context/TokenContext";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";

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

export default function Swap() {
  const {
    tokens,
    sellingToken,
    buyingToken,
    sellingTokenPrice,
    buyingTokenPrice,
    setBuyingToken,
    sellingTokenAmount,
    setSellingTokenAmount,
    buyingTokenAmount,
    gasFees
  } = useTokenContext();

  useEffect(() => {}, [
    sellingToken,
    buyingToken,
    sellingTokenPrice,
    buyingTokenPrice,
    buyingTokenAmount,
    gasFees
  ]);

    const { address, isConnected } = useAccount();

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Swap</div>
          <div className="flex gap-x-4">
            <IoMdRefresh />
            <AiOutlinePlus />
            <HiAdjustmentsHorizontal />
          </div>
        </div>
        {/* You sell */}
        <div className={style.container}>
          <div className={style.selectorContainer}>
            <h4 className="text-sm text-gray-500">You sell</h4>
            <div className={style.selector}>
              <Link href="/select-selling-token">
                {sellingToken ? (
                  <div className={style.selectorDropdown}>
                    <div className="h-6 w-6">
                      <img src={sellingToken.logoURI} alt="token logo" />
                    </div>
                    <h4 className="text-sm">{sellingToken.symbol}</h4>
                    <AiOutlineDown
                      size={18}
                      // className={style.selectorDropdown}
                    />
                  </div>
                ) : (
                  <div className={style.selectorDropdown}>
                    <h4 className="text-sm">Select Token</h4>
                    <AiOutlineDown
                      size={18}
                      // className={style.selectorDropdown}
                    />
                  </div>
                )}
              </Link>
              <input
                type="text"
                placeholder="0"
                className={style.input}
                onChange={(e) => setSellingTokenAmount(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between">
              {sellingToken && (
                <h4 className="text-sm text-gray-500 capitalize">
                  {" "}
                  {sellingToken.name}
                </h4>
              )}
              {sellingTokenPrice && (
                <h4 className="text-sm text-gray-500 capitalize">
                  {"~"}
                  {/* {sellingTokenPrice.price.slice(0, 6)} */}
                  {Number(sellingTokenAmount) * Number(sellingTokenPrice.price)}
                </h4>
              )}{" "}
            </div>
          </div>
        </div>
        {/* Arrow */}
        <div className="flex justify-center">
          <AiOutlineArrowDown
            className="text-lg text-white bg-gray-700 p-2 rounded-full"
            size={16}
          />
        </div>
        {/* You buy */}
        <div className={style.container}>
          <div className={style.selectorContainer}>
            <h4 className="text-sm text-gray-500">You buy</h4>
            <div className={style.selector}>
              <Link href="/select-buying-token">
                {buyingToken ? (
                  <div className={style.selectorDropdown}>
                    <div className="h-6 w-6">
                      <img
                        src={buyingToken.logoURI}
                        alt="token logo"
                        //  className="h-6 w-6"
                      />
                    </div>
                    <h4 className="text-sm">{buyingToken.symbol}</h4>
                    <AiOutlineDown
                      size={18}
                      // className={style.selectorDropdown}
                    />
                  </div>
                ) : (
                  <div className={style.selectorDropdown}>
                    <h4 className="text-sm">Select Token</h4>
                    <AiOutlineDown
                      size={18}
                      // className={style.selectorDropdown}
                    />
                  </div>
                )}
              </Link>
              <input
                type="text"
                placeholder="0"
                className={style.input}
                value={buyingTokenAmount ?? 0}
                disabled
              />
            </div>
            <div className="flex justify-between">
              {buyingToken && (
                <h4 className="text-sm text-gray-500 capitalize">
                  {" "}
                  {buyingToken.name}
                </h4>
              )}
              {buyingTokenPrice && (
                <h4 className="text-sm text-gray-500 capitalize">
                  {"~"}
                  {Number(buyingTokenAmount) * Number(buyingTokenPrice.price)}
                </h4>
              )}{" "}
            </div>
          </div>
        </div>
        {/* Rate */}
        <div className={style.rateContainer}>
          <div className="flex items-center justify-between">
            <AiOutlineInfoCircle className={style.icon} size={12} />
            {/* <p className="text-sm pl-1 text-gray-600">1</p> */}
            <p className="text-sm text-gray-600">1 {sellingToken?.name}</p>
            <LiaEqualsSolid className={style.icon} size={16} />
            <p className="text-gray text-sm text-gray-600">
              {buyingTokenAmount} {buyingToken?.name}{" "}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <FaGasPump className="text-sm text-gray-600" />
            <div className="text-sm flex items-center text-gray-600">
              <TbTilde className="text-sm" />
              {gasFees}
            </div>
          </div>
        </div>

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
    </div>
  );
}
