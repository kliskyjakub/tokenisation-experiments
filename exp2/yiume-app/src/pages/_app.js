import "@/styles/globals.css";
import CookieConsent from "react-cookie-consent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  argentWallet,
  ledgerWallet,
  trustWallet,
  coinbaseWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, arbitrumGoerli } from "@wagmi/core/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, provider } = configureChains(
  [arbitrum],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY })]
);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      argentWallet({ chains }),
      ledgerWallet({ chains }),
      trustWallet({ chains }),
      coinbaseWallet({ chains }),
      rainbowWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const myCustomTheme = {
  colors: {
    accentColor: "black",
    accentColorForeground: "white",
    actionButtonBorder: "white",
    actionButtonBorderMobile: "white",
    actionButtonSecondaryBackground: "black",
    closeButton: "white",
    closeButtonBackground: "black",
    connectButtonBackground: "black",
    connectButtonBackgroundError: "#B9201A",
    connectButtonInnerBackground: "#B9201A",
    connectButtonText: "white",
    connectButtonTextError: "white",
    connectionIndicator: "white",
    error: "white",
    generalBorder: "white",
    generalBorderDim: "white",
    menuItemBackground: "black",
    modalBackground: "black",
    modalBorder: "white",
    modalText: "white",
    modalTextSecondary: "gray",
  },
  fonts: {
    body: "Courier Prime",
  },
  radii: {
    connectButton: "10px",
  },
  shadows: {
    connectButton: "0",
    dialog: "0",
    profileDetailsAction: "0",
    selectedOption: "0",
    selectedWallet: "0",
    walletLogo: "0",
  },
};
const CustomAvatar = () => {
  return (
    <div
      style={{
        color: "white",
        fontSize: "14px",
      }}
    >
      &#46;&#43;&#42;&#94;
    </div>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={myCustomTheme}
        avatar={CustomAvatar}
      >
        <div className={"container"}>
          <Header />
          <CookieConsent
            location="center"
            buttonText="continue"
            overlay="true"
            cookieName="legal disclaimer"
            expires={30}
            style={{
              background: "black",
              color: "white",
              fontSize: "12px",
              textAlign: "center",
              top: "35vh",
              width: "60vw",
              left: "20vw",
              borderRadius: "10px",
              flex: "1",
              alignItems: "center",
              justifyContent: "center",
              display: "inherited",
              flexDirection: "column",
              border: "1px dashed white",
            }}
            buttonStyle={{
              color: "white",
              fontSize: "12px",
              borderRadius: "5px",
              background: "#B9201A",
              fontFamily: "Courier Prime",
            }}
          >
            <b>legal disclaimer</b>
            <br />
            <br />
            You are entering the yiume platform, an experimental, novel
            application on the Arbitrum blockchain.
            <br />
            <br />
            Using this platform involves risks related to blockchain
            applications and smart contracts that may result in an unexpected
            loss of funds or assets.
            <br />
            <br />
            By using this platform you agree and accept these risks and hereby
            indemnify the yiume platform and it&apos;s contributors from any
            potential loss experienced.
          </CookieConsent>
          <Component {...pageProps} />
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
