
import { ethers } from 'ethers';

const networks = {
    polygon: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon TestNet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"]
    },
};

export const Login = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    if (provider.network !== "matic") {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks["polygon"]
                }
            ]
        })
    }
    const Signer = provider.getSigner();
    const Address = await Signer.getAddress();
    const Balance = ethers.utils.formatEther(await Signer.getBalance()).slice(0, 7);
    return { Address, Balance }
}