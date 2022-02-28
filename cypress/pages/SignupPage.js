class SignupPage {

    // Função para definir o tamanho da janela e acessar o site
    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    // Função para preencher o formulário
    filForm(deliveryman) {

        // Preenchimento dos campos do formulário com base na massa de teste
        cy.get('input[name="fullName"]').type(deliveryman.name)
        cy.get('input[name="cpf"]').type(deliveryman.cpf)
        cy.get('input[name="email"]').type(deliveryman.email)
        cy.get('input[name="whatsapp"]').type(deliveryman.whatsapp)

        cy.get('input[name="postalcode"]').type(deliveryman.address.postalcode)
        cy.get('input[type=button][type="button"]').click()
        cy.get('input[name="address-number"]').type(deliveryman.address.number)
        cy.get('input[name="address-details"]').type(deliveryman.address.details)

        // Validando busca do CEP
        cy.get('input[name="address"]').should('have.value', deliveryman.address.street)
        cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliveryman.address.city_state)

        // Selecionando método de entrega em um elemento de uma lista
        // No lugar de "entregador.metodo_entrega" tmb pode ser inserido diretamente o conteúdo que está sendo buscado
        cy.contains('.delivery-method li', deliveryman.delivery_method).click()

        // Upload de arquivos para o formulário
        // Expressções regulares no HTML
        // input[accept^="image"] => O sinal "^" vai procurar o elemento que comece com "image"
        // input[accept^="image"] => O sinal "$" vai procurar o elemento que termina com "image"
        // input[accept^="image"] => O sinal "*" vai procurar o elemento que contém "image"
        cy.get('.dropzone input[accept^="image"]').attachFile('/images/' + deliveryman.cnh)
    }

    // Função para submeter o formulário
    submit() {
        cy.get('button[type=submit]').contains('Cadastre-se para fazer entregas').click()
    }

    // Função para validar a mensagem de confirmação de cadastro
    modalContentShouldBe(expected_message) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expected_message)
    }

    // Função para validar a mensagem de CPF inválido
    alertMessageShoudBe(expected_message){
        //cy.get('.alert-error').should('have.text', expected_message)
        cy.contains('.alert-error', expected_message).should('be.visible')
    }


}

export default new SignupPage;