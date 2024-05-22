import React, { useState ,useEffect} from 'react';


import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CustomChainConfig, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { SolanaPrivateKeyProvider, SolanaWallet } from "@web3auth/solana-provider";
import { log } from 'console';
import { useNavigate } from 'react-router-dom';

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

const clientId =
"BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration
  
  const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider: privateKeyProvider,
  });
const DonationCard = ({ title, description, walletAddress }: { title: any; description: any; walletAddress: any }) => {
    const navigate = useNavigate()

    const signMessage = async (amount: number, walletAddress: string) => {
    console.log(amount,walletAddress)

    // IMP END - Login

        const solanaWallet = new SolanaWallet(web3auth.provider!);

        console.log(solanaWallet)
    
        const connectionConfig = await solanaWallet.request<string[], CustomChainConfig>({
          method: "solana_provider_config",
          params: [],
        });
        
        const connection = new Connection(connectionConfig.rpcTarget);
        
        const accounts = await solanaWallet.requestAccounts();
        const block = await connection.getLatestBlockhash("finalized");

        console.log(accounts)
        console.log(block);
        
        
        
        try {
            const TransactionInstruction = SystemProgram.transfer({
                fromPubkey: new PublicKey(accounts[0]),
                toPubkey: new PublicKey(`${walletAddress}`),
                lamports: Number(amount) * LAMPORTS_PER_SOL,
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

              localStorage.setItem("sadd",accounts[0])
              localStorage.setItem("radd",walletAddress)
              localStorage.setItem("amount",amount.toString());
              localStorage.setItem("name",title);
              localStorage.setItem("tnx",signature )

              navigate("/donated")
        } catch (error) {
            console.log(error)
            alert("transaction failed, check your balance")
        }
        
        
        
      };
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const init = async () => {
          try {
            // IMP START - SDK Initialization
            await web3auth.initModal();
            // IMP END - SDK Initialization
    
          
          } catch (error) {
            console.error(error);
          }
        };
    
        init();
      }, []);

    const handleDonate = () => {
      console.log({
        title,
        description,
        walletAddress,
        amount,
      });

      signMessage(Number(amount),walletAddress)
    };
  return (
    <div className="border-2 border-purple-600 rounded-lg p-6 bg-purple-100 flex flex-col mb-4">
      <div className="flex flex-col">
        <h2 className="text-purple-700 text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-purple-700 text-sm">Wallet Address: {walletAddress}</span>
          <div className="flex items-center">
          <input 
              type="text" 
              placeholder="Enter the amount" 
              className="border-2 border-purple-600 rounded-md p-2 mr-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button 
              className="bg-purple-700 text-white rounded-md px-4 py-2"
              onClick={handleDonate}
            >
              Donate now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

const DonationPage = () => {
  const donations = [
    {
      title: "Save the Children",
      description: "Dedicated to improving the lives of children worldwide through education, healthcare, and emergency aid.",
      walletAddress: "AkP6uyXntyyXkqerSRHRaxk8AceREgNLquVvUhwmsRfT"
    },
    {
      title: "Save the Children",
      description: "Dedicated to improving the lives of children worldwide through education, healthcare, and emergency aid.",
      walletAddress: "AkP6uyXntyyXkqerSRHRaxk8AceREgNLquVvUhwmsRfT"
    },
    {
      title: "Save the Children",
      description: "Dedicated to improving the lives of children worldwide through education, healthcare, and emergency aid.",
      walletAddress: "AkP6uyXntyyXkqerSRHRaxk8AceREgNLquVvUhwmsRfT"
    }
  ];

  return (
    <div className="p-6">
      {donations.map((donation, index) => (
        <DonationCard 
          key={index}
          title={donation.title}
          description={donation.description}
          walletAddress={donation.walletAddress}
        />
      ))}
    </div>
  );
};

export default DonationPage;
