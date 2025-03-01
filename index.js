const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
//const PRIVATE_APP_ACCESS = '';


/*
// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
app.get("/home", async (req, res) => {
    const url = "https://api.hubapi.com/crm/v3/objects/Peoples";
    console.log("a")
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        "Content-Type": "application/json",
    };

    const params = {
        properties: "name,age,nationality", // Corrected parameter format
    }
    console.log("as")
    try {
        const resp = await axios.get(url, { headers });
        console.log("a");
        console.log(resp);
        const persons = resp.data.results || []; // Ensure it's an array
        
        console.log("Fetched Persons:", persons); // Debugging

        res.render("homepage", { title: "Persons | HubSpot APIs", persons });      
    } catch (error) {
        console.error("Error fetching persons:", error.response?.data || error.message);
        res.render("homepage", { title: "Persons | HubSpot APIs", persons: [] }); // Pass empty array on error
    }
});

*/
app.get('/', async (req, res) => {
    const Endpoiunt = 'https://api.hubapi.com/crm/v3/objects/peoples?properties=name,age,nationality';
    const headers = {
      Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
      'Content-Type': 'application/json'
    }
    const params = {
      properties: ['name', 'age', 'nationality'] // Add the property names you want here
    }
    try {
      const response = await axios.get(Endpoiunt, { headers, params });
      //console.log('API Response:', JSON.stringify(response.data, null, 2));
      //const persons = response.data.results;

      const persons = response.data.results.map(person => ({
        name: person.properties.name,
        age: person.properties.age,
        nationality: person.properties.nationality
    }));
      //console.log('Data:', JSON.stringify(persons, null, 2));
      console.log(persons);
      res.render('homepage', { persons });

    } catch (error) {
      console.error(error);
    }
  })
  
  app.get('/update-people', (req, res) => {
    try {
      res.render('updates', { pageTitle: 'Update Custom Object Form | Integrating With HubSpot I Practicum' }); // Render the updates.pug template
    } catch (error) {
      console.error(error);
    }
});


// * Code for Route 1 goes here


// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get("/update-peoples", (req, res) => {
    //console.log("print update")
    res.render("updates", { pageName: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here
app.post('/update', async (req, res) => {
    const custom_obj_url = "https://api.hubapi.com/crm/v3/objects/peoples";

    const newPerson = {
        properties: {
            "name": req.body.name,
            "age": req.body.age,
            "nationality": req.body.nationality
        }
    };

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        // Send a POST request to create a new person
        const response = await axios.post(custom_obj_url, newPerson, { headers });

        console.log('Created Object Response:', JSON.stringify(response.data, null, 2));

        res.redirect('/');
    } catch (err) {
        console.error('Error creating/updating object:', err.response ? err.response.data : err);
        res.status(500).send('Failed to update data');
    }
});

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});

*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));