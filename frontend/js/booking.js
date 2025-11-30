// Global variables from shared.js are used here: web3, contract, account

// Local variables for this page
let selectedSeat = null;
let transactions = [];
let currentTicket = null;

// Global variables for this event's details (will be set on load)
let EVENT_NAME = "";
let EVENT_DATE = "";
let EVENT_LOCATION = "";

// Function to download QR code
function downloadQRCode() {
  if (!currentTicket) {
    alert("No QR code available to download");
    return;
  }
  const canvas = document.getElementById("qrcode");
  if (!canvas) {
    alert("QR code not found");
    return;
  }
  try {
    const link = document.createElement("a");
    link.download = `ticket-seat-${currentTicket.seat}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    document.getElementById(
      "msg"
    ).innerHTML = `<i class="fa-solid fa-circle-check"></i> QR code downloaded successfully`;
  } catch (error) {
    console.error("Error downloading QR code:", error);
    alert("Failed to download QR code");
  }
}

// Load seats from contract
async function loadSeats() {
  if (!contract) {
    showError("Please connect your wallet first.");
    return;
  }
  const seatsContainer = document.getElementById("seats");
  const spinner = document.getElementById("seatSpinner"); // Get spinner

  // --- Show spinner ---
  spinner.classList.remove("hidden");
  seatsContainer.innerHTML = ""; // Clear any old seats

  const startTime = Date.now(); // <-- Record start time

  try {
    // This loop creates your 30 seats
    for (let i = 1; i <= 30; i++) {
      const owner = await contract.methods.getSeatOwner(i).call();
      const seatElement = document.createElement("div");
      seatElement.className = "seat";
      seatElement.setAttribute("data-seat", i);

      if (owner !== "0x0000000000000000000000000000000000000000") {
        seatElement.classList.add("booked");
        seatElement.innerHTML = `
          <i class="fa-solid fa-lock"></i>
          <span class="seat-number">${i}</span>
        `;
      } else {
        seatElement.innerHTML = `
          <i class="fa-solid fa-chair"></i>
          <span class="seat-number">${i}</span>
        `;
        seatElement.addEventListener("click", () => selectSeat(i, seatElement));
      }
      seatsContainer.appendChild(seatElement);
    }
  } catch (error) {
    showError("Failed to load seats: " + error.message);
  } finally {
    // --- Hide spinner with 2-second minimum ---
    const elapsedTime = Date.now() - startTime;
    const remainingTime = 2000 - elapsedTime; // 2000ms = 2 seconds

    setTimeout(() => {
      spinner.classList.add("hidden");
    }, Math.max(0, remainingTime)); // Use Math.max to avoid negative timeout
  }
}

// Select a seat
function selectSeat(seatNumber, seatElement) {
  if (selectedSeat) {
    selectedSeat.classList.remove("selected", "glow");
  }
  seatElement.classList.add("selected", "glow");
  selectedSeat = seatElement;

  document.getElementById("modalSeatNumber").textContent = seatNumber;
  document.getElementById("confirmationModal").classList.add("active");

  const confirmBtn = document.getElementById("confirmBook");
  const cancelBtn = document.getElementById("cancelBook");

  // --- Updated: Handle button spinner ---
  confirmBtn.onclick = () => {
    // Show spinner in button
    confirmBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Confirming...';
    confirmBtn.disabled = true;
    cancelBtn.disabled = true; // Disable cancel too

    document.getElementById("confirmationModal").classList.remove("active");

    // Pass the buttons to the function
    bookSeat(seatNumber, confirmBtn, cancelBtn);
  };

  cancelBtn.onclick = () => {
    document.getElementById("confirmationModal").classList.remove("active");
    seatElement.classList.remove("selected", "glow");
    selectedSeat = null;
  };
}

// Book a seat
async function bookSeat(seatNumber, confirmBtn, cancelBtn) {
  // <-- Added buttons as parameters
  const startTime = Date.now(); // <-- Record start time

  try {
    const transaction = await contract.methods.bookSeat(seatNumber).send({
      from: account,
      value: web3.utils.toWei("0.01", "ether"),
    });

    currentTicket = {
      seat: seatNumber,
      wallet: account,
      txHash: transaction.transactionHash,
      eventName: EVENT_NAME,
      eventDate: EVENT_DATE,
      eventLocation: EVENT_LOCATION,
    };

    // Save ticket to localStorage
    try {
      let myTickets = JSON.parse(localStorage.getItem("myTickets")) || [];
      if (!myTickets.find((t) => t.txHash === currentTicket.txHash)) {
        myTickets.push(currentTicket);
        localStorage.setItem("myTickets", JSON.stringify(myTickets));
      }
    } catch (e) {
      console.error("Could not save ticket to localStorage", e);
    }

    const ticketData = `Event: ${EVENT_NAME}\nSeat: ${seatNumber}\nWallet: ${account}\nTxn: ${transaction.transactionHash}`;
    QRCode.toCanvas(document.getElementById("qrcode"), ticketData, {
      width: 180,
      margin: 1,
    });

    document.getElementById("ticketEventName").textContent = EVENT_NAME;
    document.getElementById("ticketSeat").textContent = seatNumber;
    document.getElementById("ticketOwner").textContent =
      shortenAddress(account);
    document.getElementById("ticketTxHash").textContent = shortenAddress(
      transaction.transactionHash
    );
    document.getElementById(
      "msg"
    ).innerHTML = `<i class="fa-solid fa-circle-check"></i> Successfully booked seat ${seatNumber}`;

    document.getElementById("ticketCard").classList.remove("hidden");
    document.getElementById("ticketCard").classList.add("fade-in");

    document.getElementById("emailInput").value = "";
    document.getElementById("emailStatus").classList.add("hidden");

    transactions.unshift({
      seat: seatNumber,
      txHash: transaction.transactionHash,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });

    updateTransactionHistory();
    loadSeats(); // Reload seats to show the new booked one

    if (selectedSeat) {
      selectedSeat.classList.remove("selected", "glow");
      selectedSeat = null;
    }
  } catch (error) {
    showError("Transaction failed: " + error.message);
  } finally {
    // --- Reset button text and state with 2-second minimum ---
    const elapsedTime = Date.now() - startTime;
    const remainingTime = 2000 - elapsedTime;

    setTimeout(() => {
      confirmBtn.innerHTML = '<i class="fa-solid fa-check"></i> Confirm';
      confirmBtn.disabled = false;
      cancelBtn.disabled = false;
    }, Math.max(0, remainingTime)); // Use Math.max to avoid negative timeout
  }
}

// Send ticket via email
async function sendTicketEmail() {
  if (!currentTicket) {
    showEmailStatus("No ticket available to send", "error");
    return;
  }
  const email = document.getElementById("emailInput").value.trim();
  if (!email) {
    showEmailStatus("Please enter a valid email address", "error");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showEmailStatus("Please enter a valid email address", "error");
    return;
  }

  const sendBtn = document.getElementById("sendEmailBtn");
  const startTime = Date.now(); // <-- Record start time

  try {
    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    sendBtn.disabled = true;

    // This fetch requires a backend server (see server.js)
    const response = await fetch("http://localhost:3000/send-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        seat: currentTicket.seat,
        wallet: currentTicket.wallet,
        txHash: currentTicket.txHash,
        eventName: currentTicket.eventName,
      }),
    });

    const result = await response.json();

    if (result.success) {
      showEmailStatus("Ticket sent successfully to " + email, "success");
    } else {
      showEmailStatus("Failed to send email: " + result.message, "error");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    showEmailStatus(
      "Failed to send email. Is the backend server running?",
      "error"
    );
  } finally {
    // --- Reset send email button with 2-second minimum ---
    const elapsedTime = Date.now() - startTime;
    const remainingTime = 2000 - elapsedTime; // 2 seconds

    setTimeout(() => {
      sendBtn.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> Send Ticket to Email';
      sendBtn.disabled = false;
    }, Math.max(0, remainingTime));
  }
}

// Show email status
function showEmailStatus(message, type) {
  const emailStatus = document.getElementById("emailStatus");
  emailStatus.textContent = message;
  emailStatus.className = "email-status " + type;
  emailStatus.classList.remove("hidden");

  if (type === "success") {
    setTimeout(() => {
      emailStatus.classList.add("hidden");
    }, 5000);
  }
}

// Update transaction history
function updateTransactionHistory() {
  const txnList = document.getElementById("txnList");
  if (transactions.length === 0) {
    txnList.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-receipt"></i>
        <p>No transactions yet</p>
      </div>`;
    return;
  }
  txnList.innerHTML = "";
  transactions.forEach((txn) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item fade-in";
    historyItem.innerHTML = `
      <div class="history-item-header">
        <span class="history-seat">Seat #${txn.seat}</span>
        <span class="history-time">${txn.date} ${txn.time}</span>
      </div>
      <div class="history-txn">
        <i class="fa-solid fa-link"></i> 
        <a href="https://sepolia.etherscan.io/tx/${txn.txHash}" target="_blank">
          ${shortenAddress(txn.txHash)}
        </a>
      </div>`;
    txnList.appendChild(historyItem);
  });
}

// --- NEW FUNCTION ---
// This function runs when the page loads to get the event details
function loadEventDetails() {
  const params = new URLSearchParams(window.location.search);
  EVENT_NAME = params.get("event") || "Unknown Event";
  EVENT_DATE = params.get("date") || "Unknown Date";
  EVENT_LOCATION = params.get("location") || "Unknown Location";

  document.getElementById("eventName").textContent = EVENT_NAME;
  document.getElementById("eventDate").textContent = EVENT_DATE;
  document.getElementById("eventLocation").textContent = EVENT_LOCATION;
}

// Initialize event listeners for this page
function initBookingPage() {
  // Load event details from URL first
  loadEventDetails();

  document
    .getElementById("sendEmailBtn")
    .addEventListener("click", sendTicketEmail);
  document
    .getElementById("downloadQRBtn")
    .addEventListener("click", downloadQRCode);
  document.getElementById("emailInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendTicketEmail();
  });

  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    const confirmationModal = document.getElementById("confirmationModal");
    const errorModal = document.getElementById("errorModal");
    if (event.target === confirmationModal) {
      confirmationModal.classList.remove("active");
      if (selectedSeat) {
        selectedSeat.classList.remove("selected", "glow");
        selectedSeat = null;
      }
    }
    if (event.target === errorModal) {
      errorModal.classList.remove("active");
    }
  });

  // Load seats once wallet is connected
  if (account && contract) {
    loadSeats();
  } else {
    // Listen for the custom event from shared.js
    document.addEventListener("walletConnected", loadSeats);
  }
}

// Initialize the booking page
document.addEventListener("DOMContentLoaded", initBookingPage);
