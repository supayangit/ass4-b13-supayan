// Elements and global variables for counting jobs
const countInterviewElement = document.getElementById("count-interview");
const countRejectedElement = document.getElementById("count-rejected");

// update counts when loaded
document.addEventListener("DOMContentLoaded", function () {
    updateJobCounts();
});

// update total jobs count, interviews and rejects counts
const updateJobCounts = function () {
    const totalJobsCount = document.querySelectorAll("#jobs-container .card-job").length;
    const countTotalJobs = document.getElementById("count-total");
    const countJobs = document.getElementById("count-jobs");
    countJobs.textContent = totalJobsCount;
    countTotalJobs.textContent = totalJobsCount;
};

// update interviews and reject counts
const updateTypeCount = function (countElement, value) {
    // console.log(countElement, value);
    let countValue = parseInt(countElement.innerText) + value;
    // console.log(countValue);
    countElement.innerText = countValue;
    // console.log(`Updated count: ${countElement.innerText}`);

};

// update count type in header
const updateCountType = function (filter) {
    const countType = document.getElementById("count-type");
    const count = jobContainer.querySelectorAll(`.card-job.${filter}`).length;

    if (filter === "all") {
        countTypeItem.style.display = "none";
    } else {
        countTypeItem.style.display = "block";
        countType.textContent = count;
        if (document.querySelectorAll(`#jobs-container .${filter}`).length === 0) {
            emptyState.style.display = "block";
        }
        else {
            emptyState.style.display = "none";
        }
    }
};

// actions for buttons in each job card
// delete button action
document.addEventListener("click", function (d) {
    const deleteBtn = d.target.closest(".btn-delete");
    if (!deleteBtn) return;

    const jobCard = deleteBtn.closest(".card-job");
    if (jobCard) {
        jobCard.remove();
        updateJobCounts();



        if (jobCard.classList.contains("interview")) {
            updateTypeCount(countInterviewElement, -1);
            const filter = document.querySelector(".nav-item.active").dataset.filter
            updateCountType(filter);
        } else if (jobCard.classList.contains("reject")) {
            updateTypeCount(countRejectedElement, -1);
            const filter = document.querySelector(".nav-item.active").dataset.filter
            updateCountType(filter);
        } else {
            if (document.querySelectorAll(`#jobs-container .card-job`).length === 0) {
                emptyState.style.display = "block";
            }
        }
    }

    console.log(`Delete button clicked`);
});

// Event delegation for interview and reject buttons
// clicking the interview button
document.addEventListener("click", function (i) {
    const interviewBtn = i.target.closest(".btn-interview");
    if (!interviewBtn) return;
    const jobCard = interviewBtn.closest(".card-job");
    const stateBtn = jobCard.querySelector(".btn-state");
    let isSwitch = false;
    otherBtn = null;
    if (jobCard) {
        if (jobCard.classList.contains("interview")) {
            return;
        } else if (jobCard.classList.contains("reject")) {
            jobCard.classList.remove("reject");
            updateTypeCount(countRejectedElement, -1);
            isSwitch = true;
            otherBtn = jobCard.querySelector(".btn-reject");
            otherBtn.classList.remove("btn-disabled");
        }
        jobCard.classList.add("interview");
        updateTypeCount(countInterviewElement, +1);
        console.log(`Interview button clicked`);
        updateButtons(jobCard, interviewBtn, stateBtn, isSwitch, otherBtn);
        updateCountType(document.querySelector(".nav-item.active").dataset.filter);

        if (document.querySelector(".nav-item.active").dataset.filter === "reject") {
            jobCard.style.display = "none";
        }
    }
});

// clicking the reject button
document.addEventListener("click", function (r) {
    const rejectBtn = r.target.closest(".btn-reject");
    if (!rejectBtn) return;
    const jobCard = rejectBtn.closest(".card-job");
    const stateBtn = jobCard.querySelector(".btn-state");
    let isSwitch = false;
    otherBtn = null;
    if (jobCard) {
        if (jobCard.classList.contains("reject")) {
            return;
        } else if (jobCard.classList.contains("interview")) {
            jobCard.classList.remove("interview");
            updateTypeCount(countInterviewElement, -1);
            isSwitch = true;
            otherBtn = jobCard.querySelector(".btn-interview");
            otherBtn.classList.remove("btn-disabled");
        }
        jobCard.classList.add("reject");
        updateTypeCount(countRejectedElement, +1);
        console.log(`Reject button clicked`);
        updateButtons(jobCard, rejectBtn, stateBtn, isSwitch, otherBtn);
        updateCountType(document.querySelector(".nav-item.active").dataset.filter);

        if (document.querySelector(".nav-item.active").dataset.filter === "interview") {
            jobCard.style.display = "none";
        }
    }
});

// update the clicked buttons
const updateButtons = function (passedJobCard, passedBtn, stateBtn, isSwitch = false, otherBtn = null) {
    if (passedJobCard.classList.contains("interview")) {
        passedBtn.textContent = "Interviewing";
        if (isSwitch && otherBtn) {
            otherBtn.textContent = "Reject";
        }
        const newStateBtn = passedBtn.cloneNode(true);
        stateBtn.replaceWith(newStateBtn);
        newStateBtn.textContent = "Interviewing";
        newStateBtn.classList.remove("btn-interview");
        newStateBtn.classList.add("btn-state");
        newStateBtn.style.pointerEvents = "none";
        passedBtn.classList.add("btn-disabled");
    } else

        if (passedJobCard.classList.contains("reject")) {
            passedBtn.textContent = "Rejected";
            if (isSwitch && otherBtn) {
                otherBtn.textContent = "Interview";
            }
            const newStateBtn = passedBtn.cloneNode(true);
            stateBtn.replaceWith(newStateBtn);
            newStateBtn.textContent = "Rejected";
            newStateBtn.classList.remove("btn-reject");
            newStateBtn.classList.add("btn-state");
            newStateBtn.style.pointerEvents = "none";
            passedBtn.classList.add("btn-disabled");
        } else {
            passedBtn.textContent = passedBtn.classList.contains("btn-interview") ? "Interview" : "Reject";
        }
};

// navs actions
// show only filtered jobs
const nav = document.getElementById("navs-box");
const jobContainer = document.getElementById("jobs-container");
const countTypeItem = document.getElementById("count-type-item");

nav.addEventListener("click", function (e) {
    const navItem = e.target.closest(".nav-item");
    if (!navItem) return;

    const filter = navItem.dataset.filter;

    if (navItem.classList.contains("active")) return;

    document.querySelectorAll(".nav-item")
        .forEach(item => item.classList.remove("active"));

    navItem.classList.add("active");

    const jobCards = jobContainer.getElementsByClassName("card-job");
    const emptyState = document.getElementById("empty-state");

    let visibleCount = 0;

    for (let card of jobCards) {

        // show all jobs
        if (filter === "all") {
            card.style.display = "block";
            visibleCount++;
        }

        // show only interview jobs
        else if (filter === "interview") {
            if (card.classList.contains("interview")) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        }

        // show only rejected jobs
        else if (filter === "reject") {
            if (card.classList.contains("reject")) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        }
    }

    if (visibleCount === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    updateCountType(filter);
});

