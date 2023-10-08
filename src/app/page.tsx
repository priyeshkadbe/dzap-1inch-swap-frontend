"use client";
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
import Swap from "@/components/swap";

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `flex flex-col bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: ` items-center bg-[#20242A] my-3 rounded-2xl p-4 text-3xl  border border-[#20242A] hover:border-[#41444F]  `,
  YouBuyContainer: ` items-center bg-transparent my-3 rounded-2xl p-4 text-3xl  border border-[#20242A] hover:border-[#41444F]  `,

  transferPropInput: ` bg-transparent placeholder:text-[#B2B9D2] outline-none text-end  text-2xl direction-rtl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

export default function Home() {
  return <Swap />;
}
