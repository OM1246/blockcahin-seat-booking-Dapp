// contracts/SeatBooking.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SeatBooking {
    address public owner;
    uint public constant price = 0.01 ether;
    mapping(uint => address) public seatOwners;

    event SeatBooked(uint seat, address indexed user);

    constructor() {
        owner = msg.sender;
    }

    function bookSeat(uint seat) public payable {
        require(seat >= 1 && seat <= 30, "Invalid seat number");
        require(seatOwners[seat] == address(0), "Seat already booked");
        require(msg.value >= price, "Not enough ETH");

        seatOwners[seat] = msg.sender;
        emit SeatBooked(seat, msg.sender);
    }

    function getSeatOwner(uint seat) public view returns (address) {
        return seatOwners[seat];
    }
}
