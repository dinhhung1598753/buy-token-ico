import React from "react";
import { IPackage, IWalletInfo } from "../../_type_";

interface IProps {
  pak: IPackage;
  isBuying?: boolean;
  rate: number;
  walletInfo?: IWalletInfo;
  onBuy?: () => void;
}

export default function InvestCard({ pak }: IProps) {
  return (
    <div className="max-w-xs h-auto md:m-5 my-5 mx-auto p-1.5 border-2 border-yellow-400 rounded-2xl">
      <img src={pak.bg} alt="bnb" className="rounded-xl" />
      <div className="relative">
        <div className="relative -top-5 w-fit m-auto">
          <img
            className=" border-4 border-yellow-300 rounded-full"
            src={pak.icon}
            alt="bnb-logo"
            width="50"
          />
          <img
            className="relative -top-5 m-auto -right-5"
            src="verified-icon.png"
            alt="bnb-logo"
            width="20"
          />
        </div>
        <div className="text-center text-xl text-yellow-300">{pak.name}</div>
        <div className="text-center text-xl text-yellow-300 m-3.5">
          <span className="inline-block p-2 border rounded-lg">
            {pak.amount} FLP
          </span>
        </div>
        <div className="text-center  text-gray-100">
          Amount of coins to pay: 0,1 {pak.token}
        </div>
        <div className="text-center text-md text-gray-800  mt-3 ">
          <span className="block p-2  rounded-lg bg-yellow-500 font-semibold hover:cursor-pointer">
            Buy Now
          </span>
        </div>
      </div>
    </div>
  );
}
