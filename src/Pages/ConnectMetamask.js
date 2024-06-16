import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TheaterContract } from '../Utils/Component';

import {useAtom} from 'jotai'
import { TheaterScreenAtom } from '../Utils/TheaterScreenAtom';
import { TicketBuyMenuatom } from '../Utils/TicketBuyMenuatom';
import { TicketCheckatom } from '../Utils/TicketCheckatom';
function ConnectMetamask() {

    const [_ticketMenu,setTickerMenu] = useAtom(TicketBuyMenuatom)
    const [screen,setScreen] = useAtom(TheaterScreenAtom)

    const [_ticketChek] = useAtom(TicketCheckatom)
    const [show,setShow] = useState(false)
    const TheaterAddress = '0xD663f267A074CE8A3580872DbD953981F4d83029';
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [totalTicketsSold, setTotalTicketsSold] = useState(0);
    const [ticketId, setTicketId] = useState(-1);
    const [userTickets, setUserTickets] = useState([]);
    const [metamaskId, setMetamaskId] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);

    const [buyAmount, setBuyAmount] = useState('0.00000001');
    console.log(userTickets)
    useEffect(() => {
        async function init() {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(TheaterAddress, TheaterContract.abi, signer);
                setProvider(provider);
                setSigner(signer);
                setContract(contract);
                fetchContractData(contract);

                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                const metamaskId = accounts[0];
                setMetamaskId(metamaskId);

            } else {
                alert('Please install MetaMask extension to use this application.');
            }
        }

        init();
    }, []);

    async function fetchContractData(contract) {
        const price = ethers.utils.formatEther(await contract.ticketPrice());
        const sold = await contract.totalTicketsSold();
        const tickets = await contract.getOwnedTickets();
        setTicketPrice(price);
        setTotalTicketsSold(sold.toNumber());
        setUserTickets(tickets);
        setTicketId(tickets[0])
    }
    // BigInt(ticketPriceWei.toString())
    async function buyTicket() {
        const tokenURI = "https://copper-gigantic-anaconda-230.mypinata.cloud/ipfs/QmYdDUCpnGDva3uJSt3qg5J7Sn1VAaox1BPnxKxBrBtnpn"
        const value = ethers.utils.parseEther(buyAmount.toString());
        try {
            // const tx = await contract.buyTicket(tokenURI, { value: value });
            const tx = await contract.buyTicket(tokenURI, { value: value });
            await tx.wait();
            console.log(tx);
            fetchContractData(contract);
            console.log(userTickets)

            setTicketId(userTickets[0]);
        } catch (error) {
            console.error('Error buying ticket:', error);
        }
    }

    async function checkTicket(tokenId) {
        try {
            const result = await contract.checkTicket(tokenId);
            
            return result;
        } catch (error) {
            console.error('Error checking ticket:', error);
            return false;
        }
    }

    async function changeTicketPrice(newPrice) {
        try {
            const tx = await contract.changeTicketPrice(ethers.utils.parseEther(newPrice.toString()));
            await tx.wait();
            fetchContractData(contract);
        } catch (error) {
            console.error('Error changing ticket price:', error);
        }
    }

    async function withdraw() {
        try {
            const tx = await contract.withdraw();
            await tx.wait();
            fetchContractData(contract);

        } catch (error) {
            console.error('Error withdrawing funds:', error);
        }
    }


    const hitme = async () => {

        const tx = await contract.getOwnedTickets();
        // await tx.wait();
        setTicketId(tx[0]);
        console.log(tx.length);
        console.log(tx.toString()); //
    }

    const hitme2 = async (ticketId) => {
        try {
            const tx = await contract.checkTicket(ticketId, { gasLimit: 5000000 }); // Adjust the gas limit as needed

            const receipt = await tx.wait();
            console.log(receipt);
            // Parse the receipt for transaction status and other details
            return true; // Return the result of the transaction
        } catch (error) {
            console.error('Error checking ticket:', error);
            return false;
        }


    }


    const CheckTicketHandle = async () => {
        const result = await hitme2(ticketId.toString());
        if (result) {
            setPopupMessage('You can enter');
            console.log("YOU CAN ENTER")
            setScreen(true);
        } else {
            setPopupMessage('YOU ARE NOT AuTHOrised');
        }
        setTimeout(() => {
            setPopupMessage(null);
        }, 3000);
        fetchContractData(contract);
    }
    return (<>
        <div className='text-[10px] absolute bottom-[14rem] right-52 z-10 w-[10rem] mx-auto h-[1.4rem] transition-all'>
            {_ticketChek && <button
                className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white 
                        text-[30px] font-extralight active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                onClick={CheckTicketHandle}
            >    
               Verify
            </button>}
            {_ticketMenu && <button
                className="px-4 py-2 bg-transparent/25 outline-none border-2 mr-1 border-white/35 rounded text-white 
                        text-[30px] font-extralight active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                onClick={buyTicket}
            >
                BuyTicket
            </button>  }  

            <div className=' absolute bottom-[8rem] left-[22rem]' >{userTickets.length}</div>
            <div className=' text-[10px] right-[8rem] absolute bottom-[9rem]' >
                {metamaskId}
                 
            </div>
        </div>
    
        {/* <div className="App">
            <h1>Theater Ticketing System</h1>
            <p>Ticket Price: {ticketPrice} ETH</p>
            <p>Total Tickets Sold: {totalTicketsSold}</p>
            <h2>My Tickets:</h2>
            <ul>
                {userTickets.length}
            </ul>
            <h2>Actions:</h2>
            <div>
                <label>Buy Ticket Amount (ETH):</label>
                <button onClick={buyTicket}>Buy Ticket</button>
            </div>

            <button onClick={hitme}>Check Ticket</button>


            <div>{ } </div>
            <button onClick={CheckTicketHandle}>Withdraw Funds</button>
            {/* <input type="number" onChange={(e) => changeTicketPrice(e.target.value)} /> */}

            {/* <div>{ticketId.toString()}</div>
        </div>
         */}
    {/* */} 

        </>
    );
}

export default ConnectMetamask;
