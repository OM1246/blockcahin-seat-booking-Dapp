Blockchain Seat Booking dApp
A decentralized application for booking seats on the blockchain with QR code ticketing system.

Features
Blockchain Integration: Connect your Ethereum wallet (MetaMask) to interact with the smart contract

Seat Selection: Visual seat map with real-time availability

QR Code Generation: Automatic QR code generation for each booked ticket

QR Code Download: Download QR codes as PNG images for offline access

Email Integration: Send tickets directly to email addresses

Transaction History: Track all your booking transactions

Responsive Design: Works on desktop and mobile devices

Smart Contract Details
Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3

Network: Ethereum (Local/Testnet)

Price per Seat: 0.01 ETH

Contract ABI
javascript
[
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "seat", type: "uint256" },
      { indexed: true, internalType: "address", name: "user", type: "address" }
    ],
    name: "SeatBooked",
    type: "event"
  },
  {
    inputs: [{ internalType: "uint256", name: "seat", type: "uint256" }],
    name: "bookSeat",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "seat", type: "uint256" }],
    name: "getSeatOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "seatOwners",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
]
How to Use
1. Connect Your Wallet
Click the "Connect Wallet" button

Approve the connection in MetaMask

Ensure you're on the correct network

2. Select a Seat
Browse available seats (green)

Click on an available seat to select it

Booked seats (red) cannot be selected

3. Confirm Booking
Review seat selection in the confirmation modal

Confirm booking with 0.01 ETH

Wait for transaction confirmation

4. Access Your Ticket
View your digital ticket with QR code

Download QR Code: Click the "Download QR Code" button to save as PNG

Send ticket to email (requires backend server)

QR Code Features
The QR code contains:

Seat number

Wallet address (owner)

Transaction hash

Downloading QR Codes
Click the "Download QR Code" button below the QR code display

File naming: ticket-seat-{seatNumber}.png

Format: PNG image

Can be scanned by any QR code reader

Email Integration
To enable email functionality, you need a backend server running on http://localhost:3000 with the following endpoint:

POST /send-ticket
javascript
{
  "email": "user@example.com",
  "seat": 15,
  "wallet": "0x...",
  "txHash": "0x..."
}
Project Structure
text
blockchain-seat-booking/
├── index.html              # Main application file
├── README.md              # This file
└── (backend server files) # Optional for email functionality
Technologies Used
Frontend: HTML5, CSS3, JavaScript

Blockchain: Web3.js, Ethereum Smart Contracts

QR Codes: QRCode.js library

Styling: Custom CSS with CSS Variables

Icons: Font Awesome 6.4.2

Fonts: Google Fonts (Montserrat)

Setup Instructions
Prerequisites
Modern web browser with MetaMask extension

Local Ethereum node or testnet access

(Optional) Backend server for email functionality

Installation
Clone or download the project files

Ensure your smart contract is deployed at the specified address

Open index.html in a web browser

Connect your MetaMask wallet

Backend Setup (Optional)
For email functionality, set up a Node.js server:

bash
npm install express nodemailer cors
node server.js
Color Scheme
Primary: #6c63ff (Purple)

Secondary: #00c6ff (Blue)

Success: #4ade80 (Green)

Danger: #ff4b2b (Red)

Dark: #1a1a2e

Darker: #16213e

Responsive Design
The application is fully responsive and works on:

Desktop computers

Tablets

Mobile phones

Browser Compatibility
Chrome (recommended)

Firefox

Safari

Edge

Security Notes
Always verify the contract address before transactions

Never share your private keys or seed phrases

Only connect to trusted dApps

Double-check transaction details before confirming

Troubleshooting
Common Issues
Wallet Not Connecting

Ensure MetaMask is installed and unlocked

Check if you're on the correct network

Refresh the page and try again

Transaction Fails

Ensure sufficient ETH for gas fees

Check if the seat is still available

Verify contract address

QR Code Not Downloading

Ensure a ticket has been successfully booked

Check browser permissions for downloads

Try refreshing the page

License
This project is for educational purposes. Please ensure compliance with local regulations when deploying.

Contributing
Feel free to submit issues and enhancement requests!

Support
For technical support or questions, please check the smart contract documentation or contact the development team.
