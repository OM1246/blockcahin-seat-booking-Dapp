// Global variables
let web3, contract, account;

// Contract details (from your original file)
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "seat",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "SeatBooked",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "seat", type: "uint256" }],
    name: "bookSeat",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "seat", type: "uint256" }],
    name: "getSeatOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "seatOwners",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

// Theme & accessibility
const THEME_KEY = "theme";
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
function updateToggleLabel() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  const theme = document.documentElement.getAttribute("data-theme");
  toggle.innerHTML =
    theme === "dark"
      ? '<i class="fa-solid fa-sun"></i> Light'
      : '<i class="fa-solid fa-moon"></i> Dark';
}
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  applyTheme(theme);
  updateToggleLabel();
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
      updateToggleLabel();
    });
  }
}
function initReducedMotion() {
  const prefers =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefers) {
    document.documentElement.classList.add("reduced-motion");
  }
}

// Utility functions
function shortenAddress(address) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
}

// Show error modal (moved from booking.js)
function showError(message) {
  // Check if error modal exists on the page
  const errorModal = document.getElementById("errorModal");
  if (errorModal) {
    document.getElementById("errorMessage").textContent = message;
    errorModal.classList.add("active");

    document.getElementById("closeError").onclick = () => {
      errorModal.classList.remove("active");
    };
  } else {
    // Fallback for pages without the modal (like dashboard)
    alert(message);
  }
}

// Connect wallet function
async function connectWallet() {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];

      contract = new web3.eth.Contract(contractABI, contractAddress);

      // Update UI on all pages
      const walletStatus = document.getElementById("walletStatus");
      if (walletStatus) {
        walletStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected: <b>${shortenAddress(
          account
        )}</b>`;
        walletStatus.classList.add("connected");
      }

      // Dispatch a custom event to notify other scripts
      document.dispatchEvent(new Event("walletConnected"));
    } catch (error) {
      showError("Failed to connect wallet: " + error.message);
    }
  } else {
    showError("Please install MetaMask to use this dApp.");
  }
}

// Initialize wallet connect button
document.addEventListener("DOMContentLoaded", () => {
  initReducedMotion();
  initTheme();
  const connectBtn = document.getElementById("connectWalletBtn");
  if (connectBtn) {
    connectBtn.addEventListener("click", connectWallet);
  }
});
