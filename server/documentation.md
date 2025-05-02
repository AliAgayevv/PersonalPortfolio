POST
http://localhost:4000/api/pages

example body:
{
"componentName": "hero",
"content": {

<!-- pageTitle or pageAbout can change for different pages -->

    "pageTitle": { "az": "az Page Ttile", "en": "en Page Title" },
    "pageAbout": { "az": "page haqqinda", "en": "about of Page" }

}
}

GET
http://localhost:4000/api/pages/:pageName
