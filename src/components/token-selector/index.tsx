"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useTokenContext } from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import { Token } from "@/types";
import { useFetchTokens } from "@/hooks/useFetchTokens";
import { RotatingLines } from "react-loader-spinner";
import Image from "next/image";

interface TokenSelectorProps {
  onSelectToken: (token: Token) => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ onSelectToken }) => {
  const { tokens, loading, error } = useFetchTokens();
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);
  const router = useRouter();

  useEffect(() => {
    setFilteredTokens(tokens);
  }, [tokens]);

  useEffect(() => {}, [loading]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
    const filtered = tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(value.toLowerCase()) ||
        token.symbol.toLowerCase().includes(value.toLowerCase()) ||
        token.address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTokens(filtered);
  };

  const handleTokenSelection = (token: Token) => {
    onSelectToken(token);
    console.log("token address", token);
    router.push("/");
  };

  return (
    <div className="w-screen flex items-center justify-center mt-14">
      <div className="flex flex-col bg-[#191B1F] w-[30rem] rounded-2xl p-4">
        <div className="px-2 flex items-center justify-between font-semibold text-xl">
          <Link href="/">
            <IoIosArrowBack />
          </Link>
          <div>Search A Token</div>
          <div className="flex  gap-x-4"></div>
        </div>

        <div className="outline outline-1 my-4 outline-gray-600 focus:outline-blue-800 rounded-md flex justify-between items-center py-2 px-4">
          <AiOutlineSearch className="text-md" />
          <input
            type="text"
            placeholder="search by name or paste address"
            className="bg-transparent outline-none flex-1 px-4 "
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <div className="mt-2 border-t-2 p-2 h-96 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            filteredTokens.map((token, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 hover:bg-gray-600 rounded-md"
                onClick={() => handleTokenSelection(token)}
              >
                <div className="flex items-center">
                  <img
                    src={token.logoURI}
                    alt={token.name}
                    className="h-12 w-12"
                  />
                  <div className="flex flex-col p-2">
                    <h4>{token.name}</h4>
                    <p>{token.symbol}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSelector;
