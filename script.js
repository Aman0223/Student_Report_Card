// Fetch and load student data
fetch('data/student-data.json')
    .then(response => response.json())
    .then(data => {
        const student = data[0]; // Load first student
        displayStudentData(student);
    })
    .catch(error => console.error('Error loading student data:', error));

// Display student data
function displayStudentData(student) {
    // Student Info
    document.querySelector('.student-photo').src = student.studentInfo.photo;
    document.querySelector('.student-name').textContent = student.studentInfo.name;
    document.querySelector('.roll-no').textContent = student.studentInfo.rollNo;
    document.querySelector('.class-section').textContent = student.studentInfo.class;
    document.querySelector('.dob').textContent = student.studentInfo.dob;

    // Default to Term 1
    displayTermData(student.term1Report);

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const term = tab.dataset.term;
            displayTermData(term === 'term1' ? student.term1Report : student.term2Report);
        });
    });
}

// Display term data (academic table and summary)
function displayTermData(termData) {
    // Academic Table
    const tbody = document.querySelector('.academic-data');
    tbody.innerHTML = '';

    // Find highest marks for highlighting
    const maxMarks = Math.max(...termData.subjects.map(subject => subject.marks));

    termData.subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.name}</td>
            <td class="${subject.marks < 35 ? 'fail' : ''} ${subject.marks === maxMarks ? 'highlight' : ''}">
                ${subject.marks}
            </td>
            <td>${subject.grade}</td>
            <td>${subject.teacherRemarks}</td>
        `;
        tbody.appendChild(row);
    });

    // Overall Summary
    document.querySelector('.average-marks').textContent = termData.overallSummary.average;
    document.querySelector('.final-grade').textContent = termData.overallSummary.grade;
    document.querySelector('.attendance').textContent = termData.overallSummary.attendance;

    // Footer
    document.querySelector('.school-name').textContent = '[School Name]';
    document.querySelector('.generated-date').textContent = new Date().toLocaleDateString();
}

// Placeholder for Export as PDF (not implemented)
document.querySelector('.export-btn').addEventListener('click', () => {
    alert('Export as PDF functionality is not implemented in this demo.');
});