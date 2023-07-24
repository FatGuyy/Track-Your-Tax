import React, { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "./abi.js";
import "./CentralGov.css";

const CentralGov = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [fundMonitorContract, setFundMonitorContract] = useState(null);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      accountChangedHandler(window.ethereum.selectedAddress);
    }
  }, []);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        })
        .catch((error) => {
          console.error("User Denied account access", error);
        });
    } else {
      console.log("Install Metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
    initializeFundMonitorContract(newAccount);
  };

  const getUserBalance = async (address) => {
    try {
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(address);
      setUserBalance(web3.utils.fromWei(balance));
    } catch (error) {
      console.error("Error fetching user balance", error);
    }
  };

  const initializeFundMonitorContract = async (account) => {
    if (account) {
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x4711CAB8cc28191F16D40eA850b7677BA0cb6c8e";
      const contract = new web3.eth.Contract(abi, contractAddress);
      setFundMonitorContract(contract);
    }
  };

  const allocateFundsHandler = async () => {
    try {
      if (!fundMonitorContract) {
        console.log("FundMonitor contract not initialized");
        return;
      }
      if (!fromAddress || !toAddress || !amount) {
        console.log(
          "Please enter all required parameters(sAddress, rAddress, amount)"
        );
        return;
      }

      const web3 = new Web3(window.ethereum);
      const transaction = await fundMonitorContract.methods
        .allocateFunds(fromAddress, toAddress)
        .send({
          from: defaultAccount,
          value: web3.utils.toWei(amount.toString(), "ether"),
        });

      console.log("Transaction hash:", transaction.transactionHash);
    } catch (error) {
      console.error("error allocating funds", error);
    }
  };

   const transferFundsHandler = async () => {
    try {
      if (!fundMonitorContract) {
        console.log("FundMonitor contract not initialized.");
        return;
      }
      if (!toAddress || !amount) {
        console.log("Please enter all required parameters.");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const transaction = await fundMonitorContract.methods
        .transferFunds(toAddress)
        .send({
          from: defaultAccount,
          value: web3.utils.toWei(amount.toString(), "ether"),
        });

      console.log("Transaction hash:", transaction.transactionHash);
    } catch (error) {
      console.error("Error transferring funds: ", error);
    }
  };


  return (
    <>
      <div className="walletAddress"><h3>Connect Central Governement Wallet</h3></div>
      <div className="buttonContainer">
      <button onClick={connectWalletHandler}>Connect</button>
    </div>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance} ETH</h3>
      </div>
      <div className="allocateFunds">
        <h4>{"Allocate Funds"}</h4>
        <input
          type="text"
          placeholder="From Address"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount(ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="buttonContainer"><button onClick={allocateFundsHandler}>Allocate</button></div>
      </div>
      <div className="transferFunds">
        <h4>{"Transfer Funds"}</h4>
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount(ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="buttonContainer"><button onClick={allocateFundsHandler}>Transfer</button></div>
      </div>
     
    </>
  );
};

export default CentralGov;

