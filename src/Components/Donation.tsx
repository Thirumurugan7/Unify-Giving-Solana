import React, { useState } from 'react';

const DonationCard = ({ title, description, walletAddress }) => {
    const [amount, setAmount] = useState('');

    const handleDonate = () => {
      console.log({
        title,
        description,
        walletAddress,
        amount,
      });
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
      walletAddress: "9x8H3n8R1v6N8R8f1K5J2k3F7g5Q2"
    },
    {
      title: "Save the Children",
      description: "Dedicated to improving the lives of children worldwide through education, healthcare, and emergency aid.",
      walletAddress: "9x8H3n8R1v6N8R8f1K5J2k3F7g5Q2"
    },
    {
      title: "Save the Children",
      description: "Dedicated to improving the lives of children worldwide through education, healthcare, and emergency aid.",
      walletAddress: "9x8H3n8R1v6N8R8f1K5J2k3F7g5Q2"
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
