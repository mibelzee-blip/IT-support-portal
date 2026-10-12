// ==============================
// SUBMIT SUPPORT REQUEST
// ==============================

const requestForm = document.getElementById("requestForm");

if (requestForm) {

    requestForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get information from the form
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const department = document.getElementById("department").value;
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const priority = document.getElementById("priority").value;
        const description = document.getElementById("description").value;

        // Create a request
        const request = {
            id: "REQ-" + String(Date.now()).slice(-5),
            name: name,
            email: email,
            department: department,
            title: title,
            category: category,
            priority: priority,
            description: description,
            status: "Open",
            date: new Date().toLocaleDateString()
        };

        // Get existing requests
        let requests = JSON.parse(localStorage.getItem("requests")) || [];

        // Add new request
        requests.push(request);

        // Save requests
        localStorage.setItem("requests", JSON.stringify(requests));

        alert("Your support request has been submitted successfully.");

        requestForm.reset();

    });

}


// ==============================
// DISPLAY SUPPORT REQUESTS
// ==============================

const requestsList = document.getElementById("requestsList");

if (requestsList) {

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    if (requests.length === 0) {

        requestsList.innerHTML = `
            <div class="no-requests">

                <h3>No requests yet</h3>

                <p>
                    Your submitted IT support requests will appear here.
                </p>

            </div>
        `;

    } else {

        requests.forEach(function(request) {

            const requestCard = document.createElement("div");

            requestCard.className = "request-card";

            requestCard.innerHTML = `

                <div class="request-top">

                    <span class="request-id">
                        ${request.id}
                    </span>

                    <span class="request-date">
                        ${request.date}
                    </span>

                </div>

                <h3>${request.title}</h3>

                <div class="request-details">

                    <div class="request-detail">

                        <strong>Category</strong>

                        ${request.category}

                    </div>

                    <div class="request-detail">

                        <strong>Priority</strong>

                        <span class="priority ${request.priority.toLowerCase()}">
                            ${request.priority}
                        </span>

                    </div>

                   <div class="request-detail">

    <strong>Status</strong>

    <select class="status-select" onchange="updateStatus(${requests.indexOf(request)}, this.value)">

        <option value="Open" ${request.status === "Open" ? "selected" : ""}>
            Open
        </option>

        <option value="Pending" ${request.status === "Pending" ? "selected" : ""}>
            Pending
        </option>

        <option value="Resolved" ${request.status === "Resolved" ? "selected" : ""}>
            Resolved
        </option>

    </select>

</div>
                </div>

                <div class="request-description">

                    <strong>Description</strong>

                    <p>
                        ${request.description}
                    </p>

                </div>

                <button class="view-button" onclick="alert('Request ID: ${request.id}\\nStatus: ${request.status}\\nDepartment: ${request.department}\\nEmail: ${request.email}')">
    View Details
</button>

            `;

            requestsList.appendChild(requestCard);

        });

    }

}


// ==============================
// UPDATE DASHBOARD STATISTICS
// ==============================

const openCount = document.getElementById("openCount");
const pendingCount = document.getElementById("pendingCount");
const resolvedCount = document.getElementById("resolvedCount");

if (openCount && pendingCount && resolvedCount) {

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    let open = 0;
    let pending = 0;
    let resolved = 0;

    requests.forEach(function(request) {

        if (request.status === "Open") {
            open++;
        }

        if (request.status === "Pending") {
            pending++;
        }

        if (request.status === "Resolved") {
            resolved++;
        }

    });

    openCount.textContent = open;
    pendingCount.textContent = pending;
    resolvedCount.textContent = resolved;

}


// ==============================
// DISPLAY RECENT REQUESTS
// ==============================

const recentRequests = document.getElementById("recentRequests");

if (recentRequests) {

    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    if (requests.length === 0) {

        recentRequests.innerHTML = `
            <div class="empty-state">

                <h3>No requests yet</h3>

                <p>
                    Your submitted IT support requests will appear here.
                </p>

            </div>
        `;

    } else {

        const latestRequests = requests.slice(-3).reverse();

        latestRequests.forEach(function(request) {

            const requestItem = document.createElement("div");

            requestItem.className = "recent-request";

            requestItem.innerHTML = `

                <div class="recent-request-header">

                    <span class="request-id">
                        ${request.id}
                    </span>

                    <span class="request-date">
                        ${request.date}
                    </span>

                </div>

                <h3>${request.title}</h3>

                <p>
                    ${request.description}
                </p>

                <div class="recent-request-info">

                    <span class="request-tag">
                        Category: ${request.category}
                    </span>

                    <span class="request-tag">
                        Priority: ${request.priority}
                    </span>

                    <span class="request-tag">
                        Status: ${request.status}
                    </span>

                </div>

            `;

            recentRequests.appendChild(requestItem);

        });

    }

}


// ==============================
// UPDATE REQUEST STATUS
// ==============================

function updateStatus(index, newStatus) {

    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    requests[index].status = newStatus;

    localStorage.setItem("requests", JSON.stringify(requests));

    alert("Request status updated to " + newStatus);

    location.reload();

}

// ==============================
// SEARCH REQUESTS
// ==============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const searchText = searchInput.value.toLowerCase();
        const requestCards = document.querySelectorAll(".request-card");

        requestCards.forEach(function(card) {
            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}