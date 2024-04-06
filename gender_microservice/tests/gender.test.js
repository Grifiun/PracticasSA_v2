const assert = require('assert');
const axios = require('axios');
const { describe, it, beforeEach, afterEach } = require('mocha');
const port = 3001;

const server = require('../app.js'); 

describe ('Gender Microservice', function () {
    const countryId = 'GT';
    const name = 'Marcos';

    after(function () {
        server.close();
    })

    describe('Test suite endpoint /gender', function () {
        it('Debe retornar datos del genero cuando un nombre o country_id es dado', async function () {
            try {
                await axios.get(`http://localhost:${port}/gender?name=${name}&country_id=${countryId}`);
                assert.ok(true);
            } catch (error) {
                assert.fail(error);
            }
        });
    
        it('Debe retornar un error cuando un nombre o countr_id faltan', async function () {
            try {
                await axios.get(`http://localhost:${port}/gender`);
            } catch (error) {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(error.response.data.error, 'Name and country_id are required parameters.');
            }
        });
    });
});