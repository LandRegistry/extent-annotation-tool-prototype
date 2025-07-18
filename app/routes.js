const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// --- DATA ARRAYS as app/data JSON not working ---
const annotatorNames = [
    { "value": "Paul Stephens", "text": "Paul Stephens" }, { "value": "Amy Jones", "text": "Amy Jones" }, { "value": "Ria Silver-Smith", "text": "Ria Silver-Smith" }, { "value": "Ali Reynolds", "text": "Ali Reynolds" }, { "value": "Aisha Ahmed", "text": "Aisha Ahmed" }, { "value": "Ewan Campbell", "text": "Ewan Campbell" }, { "value": "Priya Patel", "text": "Priya Patel" }, { "value": "Jakub Nowak", "text": "Jakub Nowak" }, { "value": "Sian Jones", "text": "Sian Jones" }, { "value": "Mohammed Khan", "text": "Mohammed Khan" }
];

const jobs = [
    { id: 'Job 1', jobIdQuery: 1, type: 'Annotator', annotatorIndex: 0, assignedOn: '10 February 2025 at 9:40am', status: 'To do', originalStatus: null }, { id: 'Job 9', jobIdQuery: 9, type: 'Annotator', annotatorIndex: 1, assignedOn: '10 February 2025 at 9:41am', status: 'To do', originalStatus: null }, { id: 'Job 2', jobIdQuery: 2, type: 'Annotator', annotatorIndex: 0, assignedOn: '10 February 2025 at 9:43am', status: 'To do', originalStatus: null }, { id: 'Job 3', jobIdQuery: 3, type: 'Supervisor', annotatorIndex: 4, assignedOn: '10 February 2025 at 9:43am', status: 'In progress', originalStatus: null }, { id: 'Job 4', jobIdQuery: 4, type: 'QA', annotatorIndex: 3, assignedOn: '10 February 2025 at 9:44am', status: 'Submitted', originalStatus: null }, { id: 'Job 5', jobIdQuery: 5, type: 'Annotator', annotatorIndex: 0, assignedOn: '10 February 2025 at 9:45am', status: 'To do', originalStatus: null }, { id: 'Job 6', jobIdQuery: 6, type: 'Supervisor', annotatorIndex: 1, assignedOn: '17 July 2025 at 3:53pm', status: 'Submitted', originalStatus: null }, { id: 'Job 7', jobIdQuery: 7, type: 'Supervisor', annotatorIndex: 4, assignedOn: '17 July 2025 at 3:54pm', status: 'To do', originalStatus: null }, { id: 'Job 8', jobIdQuery: 8, type: 'Annotator', annotatorIndex: 6, assignedOn: '17 July 2025 at 3:55pm', status: 'To do', originalStatus: null }
];


// --- ROUTES ---

// GET for landing page alert
router.get('/admin/landing', function (req, res) {
    const message = req.session.data.flashMessage;
    delete req.session.data.flashMessage;
    res.render('admin/landing', {
        message: message
    });
});

//  GET for assigning a job
router.get('/admin/assign-titles/assign-job', function (req, res) {
    res.render('admin/assign-titles/assign-job', {
        annotators: annotatorNames
    });
});

// POST for assigning a job
router.post('/admin/assign-titles/assign-job', function (req, res) {
    const selectedJobType = req.body.jobType;
    const selectedAnnotator = req.body.selectAnnotator;
    const errors = {};
    const errorList = [];
    if (!selectedJobType) {
        const jobTypeError = { text: "Select a job type" };
        errors.jobType = jobTypeError;
        errorList.push({ text: jobTypeError.text, href: "#jobType" });
    }
    if (selectedAnnotator === undefined) {
        const annotatorError = { text: "Select an annotator" };
        errors.selectAnnotator = annotatorError;
        errorList.push({ text: annotatorError.text, href: "#selectAnnotator" });
    }
    if (errorList.length > 0) {
        res.render('admin/assign-titles/assign-job', {
            annotators: annotatorNames,
            errorList: errorList,
            errors: errors,
            data: req.body
        });
        return;
    }
    if (!req.session.data.jobs) { req.session.data.jobs = jobs; }
    const sessionJobs = req.session.data.jobs;
    const newIdNumber = Math.max(...sessionJobs.map(j => j.jobIdQuery)) + 1;
    const annotatorIndex = parseInt(selectedAnnotator, 10);
    const annotatorName = annotatorNames[annotatorIndex].text;
    const assignedOn = new Date().toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).replace(',', '');
    const newJob = { id: 'Job ' + newIdNumber, jobIdQuery: newIdNumber, type: selectedJobType, annotatorIndex: annotatorIndex, assignedOn: assignedOn, status: 'To do', originalStatus: null };
    sessionJobs.unshift(newJob);
    req.session.data.flashMessage = { type: 'assign-success', jobType: selectedJobType, annotatorName: annotatorName };
    delete req.session.data['jobType'];
    delete req.session.data['selectAnnotator'];
    res.redirect('/admin/landing');
});

router.post('/admin/upload-job-action', function (req, res) {
    res.redirect('/admin/assign-titles/assign-job');
});

// GET route to show the reassign page
router.get('/admin/check-status/reassign-job-mvp', function (req, res) {
    if (!req.session.data.jobs) { req.session.data.jobs = jobs; }
    const jobId = req.query.jobID;
    const jobToReassign = req.session.data.jobs.find(job => job.jobIdQuery == jobId);
    res.render('admin/check-status/reassign-job-mvp', {
        job: jobToReassign,
        annotators: annotatorNames
    });
});

// POST route for reassigning a job
router.post('/admin/check-status/reassign-job-mvp', function (req, res) {
    if (!req.session.data.jobs) { req.session.data.jobs = jobs; }
    const jobId = req.body.jobID;
    const newAnnotatorIndex = req.body.newAnnotator;
    const jobToUpdate = req.session.data.jobs.find(job => job.jobIdQuery == jobId);
    if (jobToUpdate) {
        jobToUpdate.annotatorIndex = parseInt(newAnnotatorIndex, 10);
        req.session.data.flashMessage = {
            type: 'reassign-success',
            jobId: jobId,
            annotatorName: annotatorNames[newAnnotatorIndex].text
        };
    }
    res.redirect('/admin/check-status/jobs-list-mvp');
});

// GET route to show the 'Confirm Archive' page
router.get('/admin/check-status/confirm-archive-mvp', function (req, res) {
    if (!req.session.data.jobs) { req.session.data.jobs = jobs; }
    const jobId = req.query.jobID;
    const jobToArchive = req.session.data.jobs.find(job => job.jobIdQuery == jobId);
    res.render('admin/check-status/confirm-archive-mvp', {
        job: jobToArchive,
        annotators: annotatorNames
    });
});

// POST route to handle the archive action
router.post('/admin/check-status/confirm-archive-mvp', function (req, res) {
    if (!req.session.data.jobs) { req.session.data.jobs = jobs; }
    const jobId = req.body.jobID;
    const jobToUpdate = req.session.data.jobs.find(job => job.jobIdQuery == jobId);
    if (jobToUpdate) {
        jobToUpdate.originalStatus = jobToUpdate.status;
        jobToUpdate.status = 'Archived';
        req.session.data.flashMessage = {
            type: 'archive-success',
            jobId: jobId
        };
    }
    res.redirect('/admin/check-status/jobs-list-mvp');
});

// Main jobs list page
router.get('/admin/check-status/jobs-list-mvp', function (req, res) {
    const message = req.session.data.flashMessage;
    delete req.session.data.flashMessage;
    if (!req.session.data.jobs) { req.session.data.jobs = jobs; }
    res.render('admin/check-status/jobs-list-mvp', {
        annotators: annotatorNames,
        jobs: req.session.data.jobs,
        message: message
    });
});

// Archived jobs page
router.get('/admin/check-status/archived-jobs-list-mvp', function (req, res) {
    if (!req.session.data.jobs) {
        req.session.data.jobs = jobs;
    }
    res.render('admin/check-status/archived-jobs-list-mvp', {
        annotators: annotatorNames,
        jobs: req.session.data.jobs
    });
});