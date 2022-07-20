import { ethers } from "hardhat";

const INSTANCE = "0xC3d94C795fb0cA3A27161a104D2c57d2f1C09145";

async function main() {
  const deployByteCode = "0x600a600c600039600a6000f3602a60805260206080f3";
  const account = (await ethers.getSigners())[0];
  const solverAddress = ethers.utils.getContractAddress({
    from: account.address,
    nonce: await ethers.provider.getTransactionCount(account.address),
  });
  const migration = await account.sendTransaction({
    data: deployByteCode,
  });
  await migration.wait();
  const magicNumber = await ethers.getContractAt("MagicNum", INSTANCE);

  const tx = await magicNumber.setSolver(solverAddress);
  await tx.wait();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
