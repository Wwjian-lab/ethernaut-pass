import { ethers } from "hardhat";

async function main() {
  const FACTOR =
    "57896044618658097711785492504343953926634992332820282019728792003956564819968";
  let lastBlockNumber = await ethers.provider.getBlockNumber();
  while (true) {
    if (lastBlockNumber !== (await ethers.provider.getBlockNumber())) {
      const currentBlockNumber = await ethers.provider.getBlockNumber();
      console.log(currentBlockNumber);
      const blockHash = (await ethers.provider.getBlock(currentBlockNumber))
        .hash;
      const blockValue = ethers.BigNumber.from(blockHash);
      const factor = ethers.BigNumber.from(FACTOR);
      console.log(
        "factor: " + factor.toString() + "blockValue: " + blockValue.toString()
      );
      const side = blockValue.div(factor);
      console.log(side);
      lastBlockNumber = await ethers.provider.getBlockNumber();
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
