import { useEffect, useState } from "react";
// IMP START - Quick Start
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CustomChainConfig, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// IMP END - Quick Start
import Web3 from "web3";

import "./App.css";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import { SolanaPrivateKeyProvider, SolanaWallet } from "@web3auth/solana-provider";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Navbar2 from "./Components/Navbar2";
import Payment from "./Components/Payment";


// IMP START - SDK Initialization
// IMP START - Dashboard Registration
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

const chainConfig = {
  chainId: "0x2", // Please use 0x1 for Mainnet
  rpcTarget: "https://api.devnet.solana.com",
  chainNamespace: CHAIN_NAMESPACES.SOLANA,
  displayName: "Solana Testnet",
  blockExplorerUrl: "https://explorer.solana.com",
  ticker: "SOL",
  tickerName: "Solana",
  logo: "https://images.toruswallet.io/solana.svg",
};


const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: { chainConfig: chainConfig }
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
});
// IMP END - SDK Initialization   

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.initModal();
        // IMP END - SDK Initialization
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    // IMP START - Login
    const web3authProvider = await web3auth.connect();
    // IMP END - Login
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getAccounts = async () => {


    const solanaWallet = new SolanaWallet(web3auth.provider!);

// Get user's Solana public address
const accounts = await solanaWallet.requestAccounts();

console.log("accoutes",accounts)


return accounts



  };

  const getBalance = async () => {


    const solanaWallet = new SolanaWallet(web3auth.provider!);

    // Get user's Solana public address
    const accounts = await solanaWallet.requestAccounts();
    
    const connectionConfig = await solanaWallet.request<string[], CustomChainConfig>({
      method: "solana_provider_config",
      params: [],
    });
    
    
    const connection = new Connection(connectionConfig.rpcTarget);
    
    // Fetch the balance for the specified public key
    const balance = await connection.getBalance(new PublicKey(accounts[0]));
    return balance
  };

  // Pass the login function to Navbar
  const navbarWithLogin = <Navbar login={login} loggedIn={loggedIn} getAccounts={getAccounts} getBalance={getBalance}  />;
  const navbarWithLogin2 = <Navbar2 login={login} loggedIn={loggedIn} getAccounts={getAccounts} getBalance={getBalance}  />;

  return (
    <Router>
 <Routes>
 <Route path="/" element={<>
  <div className="bg-[#F5F2F9]">
      {navbarWithLogin}
      <Hero />
    </div>
 </>} />
 <Route path="/donate" element={<>
  <div className="bg-[#F5F2F9]">
      {navbarWithLogin2}
      <Payment />
    </div>
 </>} />
    {/* <div className="bg-[#F5F2F9]">
      {navbarWithLogin}
      <Hero />
    </div> */}
    </Routes>
    </Router>
  );
}

export default App;

