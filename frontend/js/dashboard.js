document.addEventListener("DOMContentLoaded", () => {
  const eventGrid = document.getElementById("eventGrid");

  // Here are your 2 events with images
  const events = [
    {
      id: 1,
      name: "CryptoDevs Conference",
      date: "Dec 10, 2025",
      location: "Virtual Arena",
      img: "static/1.png",
    },
    {
      id: 2,
      name: "DeFi Summit 2025",
      date: "Nov 15, 2025",
      location: "Miami, FL",
      img: "static/2.png",
    },
    {
      id: 3,
      name: "NFT Expo",
      date: "Jan 20, 2026",
      location: "Los Angeles, CA",
      img: "static/3.png",
    }
  ];

  if (eventGrid) {
    eventGrid.innerHTML = ""; // Clear any placeholders
    events.forEach((event) => {
      // Create the URL with parameters
      const urlParams = new URLSearchParams({
        event: event.name,
        date: event.date,
        location: event.location,
      });
      const eventUrl = `booking.html?${urlParams.toString()}`;

      const eventCard = document.createElement("div");
      eventCard.className = "event-card fade-in";
      eventCard.innerHTML = `
        <img src="${event.img}" alt="${event.name}" class="event-card-img">
        <div class="event-card-content">
          <h3>${event.name}</h3>
          <div class="event-card-info">
            <p><i class="fa-solid fa-calendar-day"></i> ${event.date}</p>
            <p><i class="fa-solid fa-location-dot"></i> ${event.location}</p>
          </div>
          <a href="${eventUrl}" class="btn">
            <i class="fa-solid fa-ticket"></i> Book Now
          </a>
        </div>
      `;
      eventGrid.appendChild(eventCard);
    });
  }
});
