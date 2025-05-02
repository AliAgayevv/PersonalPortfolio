POST
http://localhost:4000/api/pages
example body:
{

<!-- this is not required and independent from language-->

"photos": [
"/uploads/hero/slide1.jpg",
"/uploads/hero/slide2.jpg"
],
"componentName": "hero",
"content": {

<!-- pageTitle or pageAbout can change for different pages -->

"pageTitle": { "az": "az Page Ttile", "en": "en Page Title" },
"pageAbout": { "az": "page haqqinda", "en": "about of Page" }
}
}

GET (get by id)
http://localhost:4000/api/pages/:pageName

GET (get all pages)
http://localhost:4000/api/pages
