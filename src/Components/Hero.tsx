import React from 'react'
import arrow from "./Vector.png"
import onboard from "./onboard.png"
import { useNavigate } from 'react-router-dom'
const Hero = ({setGoto}) => {
    const nav = useNavigate()
  return (
    <div className='flex w-full mx-10'>
        <div className='w-1/2 flex flex-col mt-[30px] '>
            
            <div className='text-[50px] font-sans '>
                <span className='bg-[#B5F456] px-2'>
                Empower Your Generosity
                </span>
                <br />
                <span>
                Donate Seamlessly with 
                </span>
                <br />
                <span>
                Unifygiving on 
                </span>
                <span>
                    sol
                </span>
                <span>
                Solana
                </span>

                
            </div>
            <div className='text-[#554a64] text-[20px] leading-[140%] mt-5'>
            Connect your wallet, donate through Solana, and receive a
            <br /> 
            verifiable proof of your contribution. Empower your generosity 
            <br /> with transparency and trust.
            </div>
            <div className='flex gap-[15px] mt-[40px]'>
                
                <button className='bg-[#6200EE] text-white py-3 px-6 rounded-[40px]' onClick={()=>setGoto(true)}>
                    Donate
                </button>
                <button className='bg-[#FFF] text-[#6200EE] py-3 px-6 rounded-[40px] border-[#CE97FD] border-[1px]'>
                    Watch Video
                </button>
            </div>
            
        </div>
        <div className='w-1/2'>
            <span>
                <img src={onboard} alt='asd' />
            </span>
        </div>
    </div>
  )
}

export default Hero