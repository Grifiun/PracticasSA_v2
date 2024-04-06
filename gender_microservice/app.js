const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.get("/gender", async (req, res) => {
    try {
        const name = req.query.name; // Utiliza req.query para obtener parámetros de consulta
        const countryId = req.query.country_id ? req.query.country_id : 'GT';

        if (!name || !countryId) {
            res.status(400).json({ error: 'Name and country_id are required parameters.' });
        }

        const apiUrl = `https://api.genderize.io?name=${name}&country_id=${countryId}`;
        const response = await axios.get(apiUrl);

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const server = app.listen(port, () => {
    console.log("Listening gender microservice in port: ", port);
});

module.exports = server;