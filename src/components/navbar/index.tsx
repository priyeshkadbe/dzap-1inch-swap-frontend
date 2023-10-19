'use client';
import { useWallet } from '@/context/WalletContext';

function Navbar() {
  const { walletState, setWalletState } = useWallet();

  return (
    <div className="w-full bg-[#1D2233] h-16 md:h-24">
      <div className="flex mx-auto justify-between items-center  p-2 px-4 md:p-6 md:w-2/3">
        <h1 className="text-xl md:text-3xl text-gray-100">Swap</h1>
        <div className="flex gap-x-4 justify-center items-center">
          {walletState.accountAddress && (
            <p>
              {'connected Address : '}
              {walletState.accountAddress}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
