var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliveryman: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        
        var data = {
            name: `${firstName} ${lastName}`,
                cpf: cpf.generate(),
                email: faker.internet.email(firstName),
                whatsapp: '61994064949',
                address: {
                    postalcode: '71590333',
                    street: 'Quadra 2 Conjunto K',
                    number: '9',
                    details: 'Itapoã I',
                    district: 'Itapoã I',
                    city_state: 'Brasília/DF'
                },
                delivery_method: 'Moto',
                cnh: 'cnh-digital.jpg'
        }

        return data

    }

}