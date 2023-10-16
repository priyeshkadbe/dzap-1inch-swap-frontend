'use client';
import { useEffect, useState, ChangeEvent } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import { useTokenContext } from '@/context/TokenContext';
import { useRouter } from 'next/navigation';
import { Token } from '@/types';
import { useFetchTokens } from '@/hooks/useFetchTokens';
import { RotatingLines } from 'react-loader-spinner';
import Image from 'next/image';
import TokenItem from './token-item';
import TokenList from './token-list';
import SearchInput from './search-input';
import Header from './header';
import Layout from './layout';
import { route } from '@/api-routes/api-routes';

interface TokenSelectorProps {
  onSelectToken: (token: Token) => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ onSelectToken }) => {

  const { tokens } = useTokenContext();
  

  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredTokens, setFilteredTokens] = useState<Token[]|null>([]);
  const router = useRouter();
  useEffect(() => {
    setFilteredTokens(tokens);
  }, [tokens]);

  useEffect(() => {}, [ tokens]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
    const filtered = tokens?.filter(
      (token: any) =>
        token.name.toLowerCase().includes(value.toLowerCase()) ||
        token.symbol.toLowerCase().includes(value.toLowerCase()) ||
        token.address.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredTokens(filtered??null);
  };

  const handleTokenSelection = (token: Token) => {
    onSelectToken(token);
    console.log('token address', token);
    router.push('/');
  };

  return (
    <Layout>
      <Header />
      <SearchInput
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
      />
      <TokenList
        filteredTokens={filteredTokens!}
        handleTokenSelection={handleTokenSelection}
      />
    </Layout>
  );
};

export default TokenSelector;
