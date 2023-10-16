"use client";

import * as React from "react";
import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  metaMaskWallet
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";
import { serverConfig } from "@/config/serverConfig";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

const projectId = serverConfig.ALCHEMY_API_KEY!;

const { wallets } = getDefaultWallets({
  appName: "",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Swapping App",
};

// const connectors = connectorsForWallets([
//   ...wallets,
//   {
//     groupName: "Other",
//     wallets: [],
//   },
// ]);


const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet({
      projectId,
      chains
    })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme()}
        appInfo={demoAppInfo}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
