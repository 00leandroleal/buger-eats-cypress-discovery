import signup from '../pages/SignupPage' // Já importa a página e instancia a variável
import signUpFactory from '../factories/SignUpFactory'

describe('Signup', ()=> {

    // beforeEach(function() {
    //     cy.fixture('deliveryman.json').then((d) => {
    //         this.deliveryman = d
    //     })
    // })

    it('User should be deliveryman', function () {

        var deliveryman = signUpFactory.deliveryman()

        // Declarando um objeto do JavaScript para utilizar como massa de teste
        signup.go()
        signup.filForm(deliveryman)
        signup.submit()
        
        // Validando modal de confirmação
        const expected_message = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        
        signup.modalContentShouldBe(expected_message)

        // Fechando modal de confirmação
        cy.get('button[type="button"]').contains('Fechar').click()
    })

    it('Incorrect document', function () {

        var deliveryman = signUpFactory.deliveryman()

        deliveryman.cpf = '372AAB65XX'

        // Declarando um objeto do JavaScript para utilizar como massa de teste
        signup.go()
        signup.filForm(deliveryman)
        signup.submit()
        signup.alertMessageShoudBe('Oops! CPF inválido')

    })

    it('Incorrect email', function () {
        
        var deliveryman = signUpFactory.deliveryman()

        deliveryman.email = 'invalid.email.com'

        // Declarando um objeto do JavaScript para utilizar como massa de teste
        signup.go()
        signup.filForm(deliveryman)
        signup.submit()
        signup.alertMessageShoudBe('Oops! Email com formato inválido.')

    })

    context('Required fields', function() {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'document', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postal_code', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function() {
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg) {
            it (`${msg.field} is required`, function(){
                signup.alertMessageShoudBe(msg.output)
            })
        })
    })
})