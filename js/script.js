// Wedding details for Suchita & Sumedh.
// Update the TBD event times and venue once the family confirms them.
const weddingConfig = {
  bride: "Suchita",
  groom: "Sumedh",
  // Ceremony countdown: 12 December 2026 at 12:32 PM Mumbai time (IST).
  weddingDate: "2026-12-12T12:32:00+05:30",
  dateLabel: "12 December 2026",
  city: "Mumbai, Maharashtra",
  venue: "R.R. Banquet Hall",
  address: "Eastern Express Highway, near MHADA Colony, Mulund (East), Mumbai, Maharashtra 400081, India",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=R.R.%20Banquet%20Hall%2C%20Eastern%20Express%20Highway%2C%20near%20MHADA%20Colony%2C%20Mulund%20East%2C%20Mumbai%2C%20Maharashtra%20400081%2C%20India",
  events: [
    { name: "Haldi", label: "THE TURMERIC CELEBRATION", date: "12 December 2026 · 8:26 AM – 9:48 AM", venue: "R.R. Banquet Hall · Mulund (East), Mumbai", icon: "❋" },
    { name: "Mehendi", label: "COLOURS OF CELEBRATION", date: "9 December 2026 · 6:00 PM onwards", venue: "At my place", icon: "❀" },
    { name: "Wedding", label: "THE BIG DAY", date: "12 December 2026 · 12:32 PM", venue: "R.R. Banquet Hall · Mulund (East), Mumbai", icon: "♛", featured: true },
    { name: "Reception", label: "LET'S CELEBRATE", date: "12 December 2026 · 5:00 PM", venue: "R.R. Banquet Hall · Mulund (East), Mumbai", icon: "✧" }
  ]
};

const byId = (id) => document.getElementById(id);
function setText(id, value) { const el = byId(id); if (el) el.textContent = value; }

setText("brideHero", weddingConfig.bride);
setText("groomHero", weddingConfig.groom);
setText("brideName", weddingConfig.bride);
setText("groomName", weddingConfig.groom);
setText("heroDate", `${weddingConfig.dateLabel} • ${weddingConfig.city}`);
setText("venueName", weddingConfig.venue);
setText("venueAddress", weddingConfig.address);
setText("venueDate", weddingConfig.dateLabel + " · Wedding ceremony at 12:32 PM");
setText("footerNames", `${weddingConfig.bride} & ${weddingConfig.groom}`);

const mapLink = byId("mapLink");
if (mapLink) mapLink.href = weddingConfig.mapUrl;

// Build the four celebration cards from the configuration above.
const eventCards = byId("eventCards");
if (eventCards) {
  eventCards.innerHTML = weddingConfig.events.map(event => `
    <div class="col-md-6 col-lg-3">
      <article class="event-card${event.featured ? " featured-event" : ""}">
        <div class="event-icon" aria-hidden="true">${event.icon}</div>
        <p class="event-label">${event.label}</p>
        <h3>${event.name}</h3>
        <p class="event-date">${event.date}</p>
        <p class="event-place">${event.venue}</p>
      </article>
    </div>
  `).join("");
}

// Generate a scannable QR code that opens the wedding venue in Google Maps.
const locationQr = byId("locationQr");
if (locationQr) {
  const qrEndpoint = "https://api.qrserver.com/v1/create-qr-code/";
  locationQr.src = `${qrEndpoint}?size=260x260&margin=12&data=${encodeURIComponent(weddingConfig.mapUrl)}`;
}

// Live countdown to the wedding ceremony: 12 Dec 2026 at 12:32 PM IST.
const targetDate = new Date(weddingConfig.weddingDate).getTime();
function updateCountdown() {
  const remaining = targetDate - Date.now();
  if (Number.isNaN(targetDate)) {
    setText("countdownMessage", "Please set a valid weddingDate in js/script.js.");
    return;
  }
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => setText(id, "00"));
    setText("countdownMessage", "The wedding ceremony is underway! शुभमंगलम्!");
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  setText("days", String(days).padStart(2, "0"));
  setText("hours", String(hours).padStart(2, "0"));
  setText("minutes", String(minutes).padStart(2, "0"));
  setText("seconds", String(seconds).padStart(2, "0"));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Traditional invitation envelope opening interaction.
const invitationIntro = byId("invitationIntro");
const openInvitation = byId("openInvitation");
const royalEnvelope = byId("royalEnvelope");
if (invitationIntro && openInvitation && royalEnvelope) {
  openInvitation.addEventListener("click", () => {
    royalEnvelope.classList.add("is-opening");
    invitationIntro.classList.add("is-opening");
    openInvitation.disabled = true;
    window.setTimeout(() => {
      invitationIntro.classList.add("is-hidden");
      document.body.classList.remove("intro-locked");
    }, 1150);
  });
  document.body.classList.add("intro-locked");
}

// Background music: browsers require a user gesture before audio can play.
const music = byId("weddingMusic");
const musicToggle = byId("musicToggle");
musicToggle.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicToggle.textContent = "Ⅱ";
      musicToggle.setAttribute("aria-label", "Pause background music");
    } else {
      music.pause();
      musicToggle.textContent = "♫";
      musicToggle.setAttribute("aria-label", "Play background music");
    }
  } catch (error) {
    musicToggle.title = "Add assets/music/wedding-song.mp3 to enable music";
  }
});

// Close mobile navigation after choosing a section.
document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const menu = byId("mainNav");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
