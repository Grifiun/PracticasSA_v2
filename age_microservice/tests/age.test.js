const assert = require('assert');
const axios = require('axios');
const { describe, it, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const port = 3000;

const server = require('../app.js'); 

describe('Age Microservice', function () {   
    
    const countryId = 'GT';
    const name = 'Marcos';

    after(function () {
        server.close();
    })

    describe('Test Suite endpoint /age', function () {
        it('Debe retornar datos de la edad cuando el nombre y el country_id es dado', async function () {        
            try {
                await axios.get(`http://localhost:${port}/age?name=${name}&country_id=${countryId}`);
                assert.ok(true);
            } catch (error) {
                assert.fail(error);
            }
        });
    
        it('Debe retornar un error cuando un nombre o countr_id faltan', async function () {
            try {
                await axios.get(`http://localhost:${port}/age`);
            } catch (error) {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(error.response.data.error, 'Name and country_id are required parameters.');
            }
        });

        
    });
    
});

