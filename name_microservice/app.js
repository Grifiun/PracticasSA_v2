const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;

app.get("/test", (req, res) => {
    res.send("Connection established");
});

app.get("/name", async (req, res) => {
    try {        
        const name = req.query.name;
        const countryId = req.query.country_id ? req.query.country_id : 'GT';

        if (!name || !countryId) {
            res.status(400).json({ error: 'Name and country_id are required parameters.' });
        }

        // Utiliza los nombres de los servicios de Kubernetes en lugar de localhost
        const ageResponse = await axios.get(`http://age-service:3000/age?name=${name}`);
        const genderResponse = await axios.get(`http://gender-service:3001/gender?name=${name}`);

        const combinedResponse = {
            age: ageResponse.data,
            gender: genderResponse.data
        };

        res.json(combinedResponse);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const server = app.listen(port, () => {
    console.log("Listening name microservice in port: ", port);
});

module.exports = server;
