function buyTicket(eventName, eventDate) {
    if (localStorage.getItem("auth") !== "true") {
    alert("Please login to buy tickets");
    window.location.href = "login.html";
    return;
}
    const user = JSON.parse(localStorage.getItem("user"));
    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    tickets.push({
    event: eventName,
    date: eventDate,
    owner: user.email
    });

    localStorage.setItem("tickets", JSON.stringify(tickets));

    alert("Ticket purchased!");

}