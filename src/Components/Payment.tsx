import React from 'react'

const Payment = () => {
  return (
    <div>
        <div className=' text-center justify-center items-center'>
            <div className='font-medium text-[35px]'>
            Support a Cause   </div>

                <div className='text-[#2B203A] text-[20px] leading-[50px] '>
                Choose a charity and make a difference. Your donation is secure, transparent, and impactful. 
                </div>
        </div>

        <div className=''>
<div className="grid grid-cols-3 gap-4">
    <div className="p-4 shadow-lg rounded-lg bg-white">
        <div className="font-bold text-lg">Charity A</div>
        <p className="text-gray-600">Helping hands for the needy.</p>
        <p className="text-sm text-gray-500">Wallet address: 0xABC123</p>
        <input className="mt-2 border rounded p-2 w-full" type="number" placeholder="Amount (SOL)" />
        <button className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Donate</button>
    </div>

    <div className="p-4 shadow-lg rounded-lg bg-white">
        <div className="font-bold text-lg">Charity B</div>
        <p className="text-gray-600">Support for education in remote areas.</p>
        <p className="text-sm text-gray-500">Wallet address: 0xDEF456</p>
        <input className="mt-2 border rounded p-2 w-full" type="number" placeholder="Amount (SOL)" />
        <button className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Donate</button>
    </div>

    <div className="p-4 shadow-lg rounded-lg bg-white">
        <div className="font-bold text-lg">Charity C</div>
        <p className="text-gray-600">Medical aid for underprivileged.</p>
        <p className="text-sm text-gray-500">Wallet address: 0xGHI789</p>
        <input className="mt-2 border rounded p-2 w-full" type="number" placeholder="Amount (SOL)" />
        <button className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Donate</button>
    </div>
</div>


            
            
        </div>
    </div>
  )
}

export default Payment