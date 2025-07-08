async function main() {
  const SeatBooking = await ethers.getContractFactory("SeatBooking");
  const seatBooking = await SeatBooking.deploy();

  // Wait for the contract to be mined
  await seatBooking.waitForDeployment();

  console.log("✅ Contract deployed to:", await seatBooking.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
