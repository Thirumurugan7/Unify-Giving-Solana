import React, {useEffect, useState} from 'react';
import { jsPDF } from "jspdf";

const DonationSuccess = () => {

    const [senderAddress, setSenderAddress] = useState("")
    const [charityAddress, setCharityAddress] = useState("")
    const [charityName, setCharityName] = useState("");
    const [amountDonated, setAmountDonated] = useState("");
    const [equivalentInEuros, setEquivalentInEuros] = useState("");
    const [transactionHash, setTransactionHash] = useState("");

    useEffect(()=>{

        const sadd = localStorage.getItem("sadd")
        setSenderAddress(sadd!)

      const radd =  localStorage.getItem("radd")
      setCharityAddress(radd!)
      setAmountDonated(localStorage.getItem("amount")!);

       setCharityName( localStorage.getItem("name")!);
        setTransactionHash(localStorage.getItem("tnx" )!)
        

    },[])
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text(`Congratulations!!`, 10, 20);
        doc.text(`You have successfully donated ${amountDonated} SOL to ${charityName}.`, 10, 30);
        doc.text(`Sender's Address: ${senderAddress}`, 10, 50);
        doc.text(`Charity Address: ${charityAddress}`, 10, 60);
        doc.text(`Charity Name: ${charityName}`, 10, 70);
        doc.text(`Amount Donated: ${amountDonated} SOL`, 10, 80);
        doc.text(`Equivalent in Euros: €${equivalentInEuros}`, 10, 90);
        doc.text(`Transaction Hash: ${transactionHash}`, 10, 100);
        doc.save('donation_details.pdf');
    };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <h1 className="text-4xl font-bold mb-4">Congratulations!!</h1>
      <p className="mb-8 text-center">You have successfully donated {amountDonated} SOL to {charityName}.</p>
      <div className="border-2 border-purple-600 rounded-lg p-8 bg-purple-100 mb-6 w-full ">
        <p className="mb-2"><span className="font-bold">Sender's Address:</span> {senderAddress}</p>
        <p className="mb-2"><span className="font-bold">Charity Address:</span> {charityAddress}</p>
        <p className="mb-2"><span className="font-bold">Charity Name:</span> {charityName}</p>
        <p className="mb-2"><span className="font-bold">Amount Donated:</span> {amountDonated} SOL</p>
        <p className="mb-2"><span className="font-bold">Equivalent in Euros:</span> €{equivalentInEuros}</p>
        <p className="mb-2"><span className="font-bold">Transaction Hash:</span> {transactionHash} <button className="ml-2" onClick={() => { navigator.clipboard.writeText(transactionHash); alert('Transaction hash copied to clipboard!'); }}>📋</button></p>
      </div>
      <div className="flex space-x-4 mb-6">
        <button className="bg-purple-700 text-white rounded-md px-4 py-2 flex items-center" onClick={downloadPDF}>
          <span className="material-icons">download</span>
          <span className="ml-2">Download</span>
        </button>
        <button className="bg-purple-700 text-white rounded-md px-4 py-2 flex items-center">
          <span className="material-icons">share</span>
          <span className="ml-2">Tweet Your Impact</span>
        </button>
      </div>
      <a href="#" className="text-purple-700">Return to Choose Another Cause</a>
    </div>
  );
};

export default DonationSuccess;
