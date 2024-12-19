document.addEventListener("DOMContentLoaded", () => {
    // List of form IDs to process
    const formIds = ["facultyForm", "industryForm", "takeForm", "timeForm", "teacherForm", "courseForm"];

    formIds.forEach(formId => {
        // Select all required inputs within the form
        const form = document.getElementById(formId);
        if (form) {
            const requiredInputs = form.querySelectorAll("input[required], select[required]");
            requiredInputs.forEach(input => {
                const label = input.previousElementSibling; // Get the associated label
                if (label && !label.querySelector(".required-asterisk")) {
                    // Add a red asterisk if it doesn't already exist
                    const asterisk = document.createElement("span");
                    asterisk.textContent = " *";
                    asterisk.className = "required-asterisk text-red-500"; // Add styling
                    label.appendChild(asterisk);
                }
            });
        }
    });
});
