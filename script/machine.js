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
