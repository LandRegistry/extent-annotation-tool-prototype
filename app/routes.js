//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Direct from Your jobs page to either V1 straight to the annotation view or an alternative which has a sub taksk list for Entries

router.post('/annotators/your-jobs-route', function(request, response) {

    var jobsRoute = request.session.data['jobs-route']
    if (jobsRoute == "V2"){
        response.redirect("/ new page ")
    } else {
        response.redirect("/annotators/assignments/QR84291/entry-1/extent-1")
    }
})




