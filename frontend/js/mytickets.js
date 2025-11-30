// Listen for shared.js to connect
document.addEventListener("DOMContentLoaded", () => {
  // Try to load tickets immediately from localStorage
  loadMyTickets();

  // Also listen for wallet connection to potentially filter by account
  document.addEventListener("walletConnected", () => {
    console.log("Wallet connected, tickets loaded.");
    loadMyTickets(); // Re-load/filter tickets when user connects
  });
});

function loadMyTickets() {
  const grid = document.getElementById("myTicketsGrid");
  const emptyState = document.getElementById("emptyTickets");

  try {
    let myTickets = JSON.parse(localStorage.getItem("myTickets")) || [];

    // Filter tickets by the currently connected account
    if (account) {
      myTickets = myTickets.filter(
        (t) => t.wallet.toLowerCase() === account.toLowerCase()
      );
    }

    if (myTickets.length === 0) {
      emptyState.style.display = "block";
      grid.innerHTML = ""; // Clear grid
      grid.appendChild(emptyState);
      return;
    }

    emptyState.style.display = "none";
    grid.innerHTML = ""; // Clear grid

    myTickets.forEach((ticket, index) => {
      const ticketCard = document.createElement("div");
      ticketCard.className = "ticket-card fade-in";

      // Create a unique ID for each canvas
      const canvasId = `qrcode-${index}`;

      ticketCard.innerHTML = `
        <div class="ticket-header">
          <i class="fa-solid fa-ticket"></i>
          <h3>Your Ticket</h3>
        </div>
        <div class="ticket-details">
          <div class="ticket-detail">
            <span class="label">Event:</span>
            <span class="value">${ticket.eventName}</span>
          </div>
          <div class="ticket-detail">
            <span class="label">Date:</span>
            <span class="value">${ticket.eventDate}</span>
          </div>
          <div class="ticket-detail">
            <span class="label">Seat Number:</span>
            <span class="value">${ticket.seat}</span>
          </div>
          <div class="ticket-detail">
            <span class="label">Owner:</span>
            <span class="value">${shortenAddress(ticket.wallet)}</span>
          </div>
          <div class="ticket-detail">
            <span class="label">Transaction:</span>
            <span class="value">${shortenAddress(ticket.txHash)}</span>
          </div>
        </div>
        <canvas id="${canvasId}" class="qrcode-canvas"></canvas>
        <div class="qr-actions">
          <a href="https://sepolia.etherscan.io/tx/${
            ticket.txHash
          }" target="_blank" class="btn btn-secondary">
            <i class="fa-solid fa-link"></i> View Txn
          </a>
          
          <button class="btn btn-danger delete-ticket-btn" data-txhash="${
            ticket.txHash
          }">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      `;
      grid.appendChild(ticketCard);

      // Now generate the QR code for this specific canvas
      const ticketData = `Event: ${ticket.eventName}\nSeat: ${ticket.seat}\nWallet: ${ticket.wallet}\nTxn: ${ticket.txHash}`;
      QRCode.toCanvas(document.getElementById(canvasId), ticketData, {
        width: 180,
        margin: 1,
      });
    });

    // ---
    // NEW: Add event listeners to all delete buttons
    // ---
    addDeleteButtonListeners();
  } catch (e) {
    console.error("Failed to load tickets from localStorage", e);
    grid.innerHTML = "<p>Error loading your tickets.</p>";
  }
}

// ---
// NEW FUNCTION: Add listeners to delete buttons
// ---
function addDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll(".delete-ticket-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteTicket);
  });
}

// ---
// NEW FUNCTION: Handle the delete click event
// ---
function handleDeleteTicket(event) {
  const txHashToDelete = event.currentTarget.dataset.txhash;

  // Show a confirmation popup
  const isConfirmed = confirm(
    "Are you sure you want to delete this ticket?\nThis will only remove it from your browser, not from the blockchain."
  );

  if (isConfirmed) {
    deleteTicketFromStorage(txHashToDelete);
  }
}

// ---
// NEW FUNCTION: Remove the ticket from localStorage and refresh
// ---
function deleteTicketFromStorage(txHashToDelete) {
  let myTickets = JSON.parse(localStorage.getItem("myTickets")) || [];

  // Create a new array *without* the ticket we want to delete
  const updatedTickets = myTickets.filter(
    (ticket) => ticket.txHash !== txHashToDelete
  );

  // Save the new, filtered array back to localStorage
  localStorage.setItem("myTickets", JSON.stringify(updatedTickets));

  // Refresh the "My Tickets" page
  loadMyTickets();
}
