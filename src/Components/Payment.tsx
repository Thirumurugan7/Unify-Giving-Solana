import React from 'react'
import DonationPage from './Donation'

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

     
        <DonationPage />
    </div>
  )
}

export default Payment