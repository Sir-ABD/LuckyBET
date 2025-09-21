// resources/js/context/BlockchainContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/contract';

// Define the shape of our context state
interface BlockchainState {
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    account: string | null;
    contract: ethers.Contract | null;
    connectWallet: () => Promise<void>;
}

// Create the context with a default undefined value
const BlockchainContext = createContext<BlockchainState | undefined>(undefined);

// Create the Provider component
export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            alert("Please install MetaMask!");
            return;
        }
        try {
            // This is the core connection logic
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await web3Provider.send("eth_requestAccounts", []);
            const web3Signer = await web3Provider.getSigner();
            const bettingContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, web3Signer);

            setProvider(web3Provider);
            setSigner(web3Signer);
            setAccount(accounts[0]);
            setContract(bettingContract);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    };

    // This effect listens for account changes in MetaMask
    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                connectWallet(); // Re-connect to update signer etc.
            } else {
                setAccount(null);
                setSigner(null);
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const value = { provider, signer, account, contract, connectWallet };

    return (
        <BlockchainContext.Provider value={value}>
            {children}
        </BlockchainContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useBlockchain = () => {
    const context = useContext(BlockchainContext);
    if (context === undefined) {
        throw new Error('useBlockchain must be used within a BlockchainProvider');
    }
    return context;
};