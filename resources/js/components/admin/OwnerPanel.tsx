// resources/js/components/admin/OwnerPanel.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useBlockchain } from '../../context/BlockchainContext';

const OwnerPanel: React.FC = () => {
    const { contract, account } = useBlockchain();
    const [owner, setOwner] = useState<string | null>(null);
    const [oracle, setOracle] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            if (contract) {
                const contractOwner = await contract.owner();
                const oracleAddress = await contract.oracleAddress();
                setOwner(contractOwner);
                setOracle(oracleAddress);
            }
        };
        fetchRoles();
    }, [contract]);

    const handleSetOracle = async () => {
        if (!contract || !account) return;
        setIsLoading(true);
        const toastId = toast.loading('Setting oracle address...');
        try {
            const tx = await contract.setOracleAddress(account);
            await tx.wait();
            // Update state after success
            setOracle(account); 
            toast.success('Oracle address set to your wallet!', { id: toastId });
        } catch (error: any) {
            const message = error.reason || "Failed to set oracle.";
            toast.error(`Error: ${message}`, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    const createTestEvent = async () => {
        // ... (this function remains the same as before) ...
    };
    
    // Only render if the connected account is the owner
    if (account && owner && account.toLowerCase() === owner.toLowerCase()) {
        const isOracleSet = oracle && oracle.toLowerCase() === account.toLowerCase();
        const isOracleEmpty = oracle === "0x0000000000000000000000000000000000000000";

        return (
            <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2">
                {/* --- THIS IS THE NEW BUTTON --- */}
                {(!isOracleSet || isOracleEmpty) && (
                    <motion.button
                        onClick={handleSetOracle}
                        disabled={isLoading}
                        className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg"
                    >
                        {isLoading ? 'Setting...' : 'Set Me as Oracle'}
                    </motion.button>
                )}

                <motion.button
                    onClick={createTestEvent}
                    disabled={isLoading || !isOracleSet}
                    className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg disabled:bg-slate-500 disabled:cursor-not-allowed"
                    title={!isOracleSet ? "You must set yourself as Oracle first" : ""}
                >
                    {isLoading ? 'Busy...' : 'Create Test Event'}
                </motion.button>
            </div>
        );
    }

    return null;
};

export default OwnerPanel;