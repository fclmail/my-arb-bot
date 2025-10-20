#!/usr/bin/env node
import { ethers } from "ethers";

const RPC_URL = process.env.RPC_URL || "https://polygon-rpc.com";
const provider = new ethers.JsonRpcProvider(RPC_URL);

async function main() {
  const block = await provider.getBlockNumber();
  console.log(`✅ Connected to RPC: ${RPC_URL}`);
  console.log(`⛓️  Current block number: ${block}`);

  const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
  ];

  const contract = new ethers.Contract(USDC, abi, provider);
  const [name, symbol, decimals] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals()
  ]);

  console.log(`💰 Contract: ${name} (${symbol}), decimals: ${decimals}`);
}

main().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
