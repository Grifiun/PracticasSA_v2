const assert = require('assert');
var sandbox = require('sinon').createSandbox(); 
const axios = require('axios');
const portAge = 3000;
const portGender = 3001;
const port = 3002;
// Requerir la aplicación
const server = require('../app');
const serverAge = require('../../age_microservice/app');
const serverGender = require('../../gender_microservice/app');

describe('Name Microservice | Integration test', function() {
    const name = 'John';
    const hora = "April 10, 3:03 PM";
    const ageResponse = {
        count: 1904,
        name: name,
        age: 40,
        country_id: 'GT'
    };
    const genderResponse = {
        count: 1904,
        name: name,
        gender: "male",
        country_id: 'GT',
        probability: 1
    };

   after(function() {
        server.close();
        serverAge.close();
        serverGender.close();        
   }) 


   describe ("Test suite of endpoint /name | Integration Test", function() {
    beforeEach(function() {
        sandbox.stub(axios, 'get');

        axios.get.withArgs(`http://age-service:${portAge}/age?name=${name}`)
            .callsFake(() => {
                return axios.get(`http://localhost:${portAge}/age?name=${name}`);
            });
        
        axios.get.withArgs(`http://gender-service:${portGender}/gender?name=${name}`)
            .callsFake(() => {
                return axios.get(`http://localhost:${portGender}/gender?name=${name}`);
            });
        
        axios.get.callThrough();
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('Debe retornar una respuesta combinada con edad y genero', async function() {        

        try {
            await axios.get(`http://localhost:${port}/name?name=${name}&country_id=GT`);                                
            // Aquí puedes agregar más aserciones para verificar el contenido de la respuesta según sea necesario
            assert.ok(true);                                                
        } catch(error) {
            assert.fail(error);
        }
        
    });

});

   describe('Test suite of endpoint /test | Unit Test', function() {
        it('Debe retornar \'Connection Stablished\'', async function() {
            try{
                const response = await axios.get(`http://localhost:${port}/test`);
                assert.strictEqual(response.data, 'Connection established');
            }
            catch(error){
                console.error('Error:', error.message);
                assert.fail(error);
            }
        })
   })

   describe('Test suite of endpoint /name', function() {
    
    
        beforeEach(function () {
            sandbox.stub(axios, 'get');

            axios.get.withArgs(`http://age-service:${portAge}/age?name=${name}`)
                .resolves({ data: ageResponse });

            axios.get.withArgs(`http://gender-service:${portGender}/gender?name=${name}`)
                .resolves({ data: genderResponse });

            axios.get.callThrough();
        });

        afterEach(function () {
            sandbox.restore();
        })     

        it('Debe retornar una respuesta combinada con edad y genero', async function() {        

            try {            
                const response = await axios.get(`http://localhost:${port}/name?name=${name}`);                                
                // Aquí puedes agregar más aserciones para verificar el contenido de la respuesta según sea necesario
                assert.ok(response);
                assert.deepStrictEqual(response.data, { hora: hora, age: ageResponse, gender: genderResponse });
            } catch(error) {
                assert.fail(error);
            }
            
        });

        it('Debe retornar error cuando el parametro de nombre falta', async function() {
            try {
                await axios.get(`http://localhost:${port}/name`);
            } catch (error) {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(error.response.data.error, 'Name and country_id are required parameters.');
            }
        });

        it('debe retornar name-service error 500', async function() {
            try{
                await axios.get(`http://localhost:${port}/name?name=${name}`);
                
            }catch(error){            
                // Verificar el resultado
                assert.strictEqual(error.response.status, 500);
                assert.strictEqual(error.response.data.error, 'Internal Server Error');
            }
        });

   
  });
});
