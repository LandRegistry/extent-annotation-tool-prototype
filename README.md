## Running the prototype 

This prototype was designed using: 

-   Node.js v20 

-   [Gov prototype kit v13](https://prototype-kit.service.gov.uk/docs/install/getting-started) 

-   [Hmlr-frontend v2.0.0](https://github.com/LandRegistry/hmlr-frontend/releases) 

V1 Uses [sortable table](https://design-patterns.service.justice.gov.uk/components/sortable-table/) and [filter](https://design-patterns.service.justice.gov.uk/components/filter/) components from the MoJ design system. Sprint 1 MVP includes a version without this.

-   [Install MoJ Frontend 3.3.1](https://design-patterns.service.justice.gov.uk/prototyping/setting-up-coded-prototypes/)

Uses [govuk DateTime filter](https://x-govuk.github.io/govuk-prototype-filters/date/#govukdatetime) from [x-govuk](https://x-govuk.github.io/govuk-prototype-filters):
`npm install @x-govuk/govuk-prototype-filters`

Use `npm run dev` to start, not `npm start`

## Brief 

The extent annotation tool is being designed as a proof of concept. It will be an internal tool used to create a validated set of linked data to test the accuracy of an automated solution against. Users will check geospatial representations against textual descriptions and record if they are related. 

## High level user needs 

-   As an administrator, I need to assign jobs to annotators that contain a set of Titles, so that they can record the relationships between geospatial and textual data 

-   As an annotator, I need to view the Titles that have been assigned to me, so I can start my workflow 

-   As an annotator, I need to view a map with representations of extents in a Title and compare these with descriptions of them, so I can record which ones are linked 

## About the GOV.UK Prototype Kit 

If you need the latest kit 

Go to the [GOV.UK Prototype Kit site](https://govuk-prototype-kit.herokuapp.com/docs) to download the latest version and read the documentation. 

The Prototype Kit provides  a simple way to make interactive prototypes that look like pages on GOV.UK. These prototypes can be used to show ideas to people you work with, and to do user research. 

Read the [project principles](https://govuk-prototype-kit.herokuapp.com/docs/principles). 

## Security 

If you publish your prototypes online, they must be protected by a [username and password](https://govuk-prototype-kit.herokuapp.com/docs/publishing-on-heroku). This is to prevent members of the public finding prototypes and thinking they are real services. 

You must protect user privacy at all times, even when using prototypes. Prototypes made with the kit look like GOV.UK, but do not have the same security provisions. Always make sure you are handling user data appropriately. 

## Installation instructions 

-   [Installation guide for new users (non technical)](https://govuk-prototype-kit.herokuapp.com/docs/install/introduction) 

-   [Installation guide for developers (technical)](https://govuk-prototype-kit.herokuapp.com/docs/install/developer-install-instructions) 

## Support 

The GOV.UK Prototype Kit is maintained by the Government Digital Service. If you've got a question or need support you can: 

-   email <govuk-design-system-support@digital.cabinet-office.gov.uk> 

-   [get in touch on Slack](https://ukgovernmentdigital.slack.com/messages/prototype-kit)(open in app) 

-   [view known issues on GitHub](https://github.com/alphagov/govuk-prototype-kit/issues) 

## Contributing 

If you've got an idea or suggestion you can: 

-   [get in touch on the developer Slack channel](https://ukgovernmentdigital.slack.com/messages/prototype-kit-dev)(open in app) 

-   [create a GitHub issue](https://github.com/alphagov/govuk-prototype-kit/issues)
