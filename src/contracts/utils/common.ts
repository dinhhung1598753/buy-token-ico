export type AddressType = {
  97: string;
  56: string;
};

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) return 97;
  return parseInt(env);
}

export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

export const SMART_ADDRESS = {
  CROWD_SALE: { 97: "0x139f0b21949D4CAde362cA3ECe8E4f2CF0F6a3f5", 56: "" },
  USDT: { 97: "0x86cec36E1F545e74787173759e47fD69cD5C87dB", 56: "" },
};
