import { useEffect, useState } from "react";
// IMP START - Quick Start
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CustomChainConfig, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

// IMP END - Quick Start
import Web3 from "web3";

import "./App.css";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

import { SolanaPrivateKeyProvider, SolanaWallet } from "@web3auth/solana-provider";


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

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information
    uiConsole(user);
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  // IMP START - Blockchain Calls
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    // const web3 = new Web3(provider as any);

    // // Get user's Ethereum public address
    // const address = await web3.eth.getAccounts();

    const solanaWallet = new SolanaWallet(web3auth.provider!);

// Get user's Solana public address
const accounts = await solanaWallet.requestAccounts();

console.log("accoutes",accounts)





// const account = await connection.getAccountInfo()

// Fetch the balance for the specified public key
    uiConsole(accounts);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    // const web3 = new Web3(provider as any);

    // // Get user's Ethereum public address
    // const address = (await web3.eth.getAccounts())[0];

    // // Get user's balance in ether
    // const balance = web3.utils.fromWei(
    //   await web3.eth.getBalance(address), // Balance is in wei
    //   "ether"
    // );
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
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    // const web3 = new Web3(provider as any);

    // // Get user's Ethereum public address
    // const fromAddress = (await web3.eth.getAccounts())[0];

    // const originalMessage = "YOUR_MESSAGE";

    // // Sign the message
    // const signedMessage = await web3.eth.personal.sign(
    //   originalMessage,
    //   fromAddress,
    //   "test password!" // configure your own password here.
    // );
    const solanaWallet = new SolanaWallet(web3auth.provider!);

    const connectionConfig = await solanaWallet.request<string[], CustomChainConfig>({
      method: "solana_provider_config",
      params: [],
    });
    
    const connection = new Connection(connectionConfig.rpcTarget);
    
    const accounts = await solanaWallet.requestAccounts();
    const block = await connection.getLatestBlockhash("finalized");
    
    const TransactionInstruction = SystemProgram.transfer({
      fromPubkey: new PublicKey(accounts[0]),
      toPubkey: new PublicKey("AkP6uyXntyyXkqerSRHRaxk8AceREgNLquVvUhwmsRfT"),
      lamports: 0.01 * LAMPORTS_PER_SOL,
    });

    console.log("tranactio",TransactionInstruction)
    
    const transaction = new Transaction({
      blockhash: block.blockhash,
      lastValidBlockHeight: block.lastValidBlockHeight,
      feePayer: new PublicKey(accounts[0]),
    }).add(TransactionInstruction);

    console.log("trn",transaction)
    
    const { signature } = await solanaWallet.signAndSendTransaction(transaction);
    
    console.log(signature);
    
    
    
    uiConsole(signature);
  };
  // IMP END - Blockchain Calls

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/modal" rel="noreferrer">
          Web3Auth{" "}
        </a>
        & ReactJS (Webpack) Quick Start
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/quick-starts/react-modal-quick-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
}

export default App;
