// check auth
if (localStorage.getItem("organizerAuth") !== "true") {
    alert("Please login as organizer first");
    window.location.href = "organizer-login.html";
}

// get email of current organizator
const organizerEmail = localStorage.getItem("organizerEmail");

// get events from localStorage
let events = JSON.parse(localStorage.getItem("events")) || [];

// DOM
const createForm = document.getElementById("createEventForm");
const myEventsContainer = document.getElementById("myEventsContainer");
const logoutBtn = document.getElementById("logoutBtn");


function renderMyEvents() {
    myEventsContainer.innerHTML = "";

    const myEvents = events.filter(ev => ev.organizer === organizerEmail);

    if (myEvents.length === 0) {
        myEventsContainer.innerHTML = `<p class="text-muted">No events yet.</p>`;
        return;
    }
    
    myEvents.forEach(ev => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${ev.image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${ev.name}</h5>
                <p class="text-muted">${ev.city} · ${new Date(ev.date).toLocaleDateString()}</p>
                <p>Venue: ${ev.venue}</p>
                <p>Type: ${ev.type}</p>
                <button class="btn btn-primary btn-sm me-2" onclick="viewSales(${ev.id})">View Sales</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEvent(${ev.id})">Delete</button>
            </div>
        </div>
        `;
        myEventsContainer.appendChild(col);
    });
}

// create new
createForm.onsubmit = function(e) {
    e.preventDefault();
    const newEvent = {
        id: Date.now(), // уникальный ID
        name: document.getElementById("eventName").value,
        date: document.getElementById("eventDate").value,
        city: document.getElementById("eventCity").value,
        venue: document.getElementById("eventVenue").value,
        type: document.getElementById("eventType").value,
        image: document.getElementById("eventImage").value,
        organizer: organizerEmail
    };

    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));
    createForm.reset();
    renderMyEvents();
};


function deleteEvent(id) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    events = events.filter(ev => ev.id !== id);
    localStorage.setItem("events", JSON.stringify(events));
    renderMyEvents();
}


function viewSales(eventId) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const soldTickets = tickets.filter(t => {
        const ev = events.find(e => e.name === t.event && e.id === eventId);
        return ev && ev.organizer === organizerEmail;
    });

    if (soldTickets.length === 0) {
        alert("No tickets sold yet for this event");
    } else {
        const seats = soldTickets.map(t => `${t.owner}${t.seat ? ` - Seat: ${t.seat}` : ""}`).join("\n");
        alert(`Sold tickets:\n${seats}`);
    }
}

// Logout
logoutBtn.onclick = () => {
    localStorage.removeItem("organizerAuth");
    localStorage.removeItem("organizerEmail");
    window.location.href = "organizer-login.html";
};


renderMyEvents();