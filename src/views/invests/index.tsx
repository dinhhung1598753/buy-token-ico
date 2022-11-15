declare var window: any;
import { ethers } from "ethers";
import React, { useState, useEffect, useCallback } from "react";
import { showSortAddress } from "../../../utils";
import InvestCard from "../../components/InvestCard";
import CrowdSaleContract from "../../contracts/CrowdSaleContract";
import UsdtContract from "../../contracts/UsdtContract";
import {
  IPackage,
  IRate,
  ITransactionHash,
  IWalletInfo,
  TOKEN,
} from "../../_type_";
import { packages } from "../../constants";
import NotificationModal from "../../components/NotificationModal";

export default function InvestView() {
  const [wallet, setWallet] = useState<IWalletInfo>();
  const [rate, setRate] = useState<IRate>({ bnbRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pak, setPak] = useState<IPackage>();
  const [txHash, setTxHash] = useState<ITransactionHash>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();

  const getRate = useCallback(async () => {
    const crowdContract = new CrowdSaleContract();
    const bnbRate = await crowdContract.getBnbRate();
    const usdtRate = await crowdContract.getUsdtRate();
    setRate({ bnbRate, usdtRate });
  }, []);

  useEffect(() => {
    getRate();
  }, [getRate]);

  //   const { isOpen, onClose, onOpen } = {};

  const handleBuyIco = async (pk: IPackage) => {
    if (!web3Provider || isProcessing) return;
    setPak(pk);
    setIsProcessing(true);
    let hash = "";
    const crowdContract = new CrowdSaleContract(web3Provider);

    try {
      if (pk.token === TOKEN.USDT) {
        const usdtContract = new UsdtContract(web3Provider);
        await usdtContract.approve(
          crowdContract._contractAddress,
          pk.amount / rate.usdtRate
        );
        hash = await crowdContract.buyTokenByUSDT(pk.amount);
      } else {
        hash = await crowdContract.buyTokenByBNB(pk.amount);
      }
      setTxHash({ hash, isSuccess: true });
      setOpenModal(true);
    } catch (error: any) {
      setTxHash({ hash: error.message, isSuccess: false });
      setOpenModal(true);
    }
    setPak(undefined);
    setIsProcessing(false);
  };
  const onConnectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const bnbBalance = Number.parseFloat(
        ethers.utils.formatEther(bigBalance)
      );
      setWallet({ address, bnb: bnbBalance });
      setWeb3Provider(provider);
    }
  };
  return (
    <div className="bg-gray-800 h-auto">
      <div className="flex items-center justify-around p-5">
        <div className="text-white text-3xl">Buy ICO</div>
        {!wallet && (
          <div
            onClick={onConnectMetamask}
            className="border-2 border-yellow-300 rounded-md p-1 bg-yellow-300 shadow-md shadow-yellow-100/50 hover:cursor-pointer"
          >
            Connect Wallet
          </div>
        )}
        {wallet && (
          <div className=" flex border-2 border-yellow-300 rounded-md p-1  shadow-md shadow-yellow-100/50 text-yellow-500">
            <span className="pr-1">{showSortAddress(wallet.address)}</span>
            <img src="logo-bnb.png" width="20" alt="" />
            <span className="pl-1">{wallet.bnb}</span>
          </div>
        )}
      </div>
      <div className="p-10">
        <div className="grid md:grid-cols-3 grid-cols-1  items-center justify-around  h-auto w-52:xl">
          {packages.map((pak, index) => (
            <InvestCard
              pak={pak}
              rate={pak.token === TOKEN.BNB ? rate.bnbRate : rate.usdtRate}
              key={pak.key}
              onBuy={() => handleBuyIco(pak)}
            />
          ))}
        </div>
      </div>
      <NotificationModal
        isOpen={isOpenModal}
        hash={txHash}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
