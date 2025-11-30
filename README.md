<<<<<<< HEAD
# 🎟️ BlockTickets - Blockchain Seat Booking dApp

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/solidity-%5E0.8.0-blue)](https://soliditylang.org/)
[![Web3](https://img.shields.io/badge/web3-compatible-brightgreen)](https://web3js.readthedocs.io/)

A decentralized seat booking application built on Ethereum blockchain that allows users to book event seats securely using smart contracts.

## 🌟 Features

- **Blockchain-Powered**: Secure seat bookings on the Ethereum blockchain
- **Wallet Integration**: MetaMask wallet connectivity for seamless transactions
- **QR Ticket Generation**: Instant QR code generation for booked seats
- **Email Delivery**: Send tickets directly to your email
- **Real-time Seat Status**: Live view of available and booked seats
- **Transaction History**: Complete record of all booking transactions
- **Responsive Design**: Works on all devices from mobile to desktop
- **Dark/Light Theme**: Toggle between color schemes based on preference

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/Screenshot_30-11-2025_13630_127.0.0.1.jpeg)
*Browse upcoming events and select the one you want to attend*

### Seat Selection
![Seat Selection](screenshots/Screenshot_30-11-2025_13727_127.0.0.1.jpeg)
*Interactive seat map with real-time availability status*

### My Tickets
![My Tickets](screenshots/Screenshot_30-11-2025_13727_127.0.0.1.jpeg)
*View and manage all your booked tickets in one place*

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MetaMask wallet extension
- Ethereum testnet funds (Sepolia/Ethereum Testnet)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/seatbooking.git
cd seatbooking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
node server.js
```

4. Visit `http://localhost:3000` in your browser

### Smart Contract Deployment

1. Compile the smart contracts:
```bash
npx hardhat compile
```

2. Start a local blockchain node:
```bash
npx hardhat node
```

3. In a new terminal, deploy the contract to the local network:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

4. The contract will be deployed and its address will be printed to the console. Update this address in `frontend/js/shared.js` in the `contractAddress` variable.

## 🛠️ Technology Stack

- **Smart Contracts**: Solidity ^0.8.0
- **Frontend**: HTML5, CSS3, JavaScript ES6
- **Blockchain Framework**: Hardhat
- **Web3 Library**: Web3.js
- **Backend**: Node.js, Express
- **Email Service**: Nodemailer
- **UI Framework**: Custom CSS with modern design principles

## 📁 Project Structure

```
seatbooking/
├── contracts/
│   ├── SeatBooking.sol     # Main smart contract
│   └── Lock.sol           # Sample contract
├── frontend/
│   ├── css/
│   │   ├── style.css      # Main styles
│   │   └── theme.css      # Theme styles
│   ├── js/
│   │   ├── booking.js     # Booking page logic
│   │   ├── dashboard.js   # Dashboard logic
│   │   ├── mytickets.js   # My tickets logic
│   │   └── shared.js      # Shared utilities
│   ├── booking.html       # Seat booking page
│   ├── index.html         # Dashboard page
│   └── mytickets.html     # My tickets page
├── ignition/modules/
├── scripts/
├── test/
├── server.js              # Backend server
└── README.md
```

## 🧪 Testing

Run smart contract tests:
```bash
npx hardhat test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [Web3.js](https://web3js.readthedocs.io/) - Ethereum JavaScript API
- [MetaMask](https://metamask.io/) - Crypto wallet and gateway to blockchain apps
- [QRCode.js](https://davidshimjs.github.io/qrcodejs/) - QR code generator

## 📞 Support

If you have any questions or need help, please open an issue or contact the project maintainers.
=======
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
>>>>>>> f1de9517c822235abfdb43b86ac4cb5c4b7aebb3
