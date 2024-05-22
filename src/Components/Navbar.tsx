import React, { SetStateAction, useEffect, useState } from 'react'
import pic from "./Frame.png"
import { log } from 'console'
import { get } from 'http'

const Navbar = ({ login, loggedIn, getAccounts, getBalance }: { login: any, loggedIn: any, getAccounts: any, getBalance: any }) => {
    const [logged, setLogged] = useState(false)
    const [balance, setBalance] = useState(0);
    const [accounts, setAccounts] = useState("")
    useEffect(()=>{
if(login.loggedIn){
    setLogged(true)
}
    },[])

    useEffect(()=>{
console.log(getAccounts,getBalance);


    },[logged])
    const connectHandler = async () => {
        console.log("ip");
        console.log(login)
        login()
       const bal = await getBalance()
     const acc = await   getAccounts()
console.log(bal,acc);
setBalance(bal)
setAccounts(acc)
setLogged(true)
        console.log(loggedIn)

        console.log(logged);
        
        
    }
  return (
    <div className='flex justify-between m-10 opacity-60 bg-[#FFF] rounded-[80px] p-[20px] z-50'>
        
        <div>
            <img src={pic} alt='asds' className='h-[57px] w-[150px]' />
        </div>
        <div className=' flex gap-2 items-center'>
            <div>
                <button className='bg-[#C1F672] text-[#2B203A] rounded-[56px] p-[8px] ' > Home</button>
            </div>
            <div>
                <button className='bg-white text-black  border-[#D5CDE0] border-[0.1px] p-[8px] rounded-[56px]'>Charities</button>
            </div>
        </div>

        <div className='flex justify-center items-center'>
<button className='bg-[#6200EE] text-white rounded-[46px] p-[15px] font-bold' onClick={() => { 
    if (logged) {
        navigator.clipboard.writeText(accounts);
        alert("Account address copied to clipboard!");
    } else {
        connectHandler();
    }
}}>
    {logged ? `${accounts}` : "Connect"}
</button>
</div>
</div>
  )
}

export default Navbar