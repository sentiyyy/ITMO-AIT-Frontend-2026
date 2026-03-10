const currentEvent = JSON.parse(localStorage.getItem("selectedEvent"));

document.getElementById("eventTitle").textContent = currentEvent.name;
document.getElementById("eventImage").src = currentEvent.image;
document.getElementById("eventDescription").textContent = currentEvent.description;
document.getElementById("eventVenue").textContent = `Venue: ${currentEvent.venue}`;
document.getElementById("seatMap").src = currentEvent.seatMap || "img/seatmap.png";
document.getElementById("eventMeta").textContent =
`${currentEvent.city} · ${new Date(currentEvent.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;

document.getElementById("buyBtn").onclick = () => {
    buyTicket(currentEvent.name, currentEvent.date);
};

const reviewsContainer = document.getElementById("reviewsContainer");
let reviews = JSON.parse(localStorage.getItem(`reviews_${currentEvent.id}`)) || [];

function renderReviews() {
    reviewsContainer.innerHTML = "";
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = `<p class="text-muted">No reviews yet.</p>`;
        return;
    }
    reviews.forEach(r => {
        const div = document.createElement("div");
        div.className = "card mb-2 p-2";
        div.innerHTML = `<strong>${r.user}</strong>: ${r.text}`;
        reviewsContainer.appendChild(div);
    });
}
renderReviews();

document.getElementById("submitReview").onclick = () => {
    const text = document.getElementById("reviewInput").value.trim();
    if (!text) return alert("Enter review text");
    const user = JSON.parse(localStorage.getItem("user")) || { email: "Guest" };
    reviews.push({ user: user.email, text });
    localStorage.setItem(`reviews_${currentEvent.id}`, JSON.stringify(reviews));
    document.getElementById("reviewInput").value = "";
    renderReviews();
};