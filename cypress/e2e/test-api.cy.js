describe('Testes API Serasa', () => {
  context("GET /auth", () => {
    it("Gerar token", () => {
      cy.request("GET", "/auth").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.token).to.not.be.empty
      })
    })
  })

  context("GET /bank", () => {
    it("Listar bancos", () => {
      cy.request("GET", "/bank").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).length.to.be.greaterThan(0)
      })
    })

    it("Filtrar bancos por estado", () => {
      cy.request("GET", "/bank?estadoAtuacao=SC").then((response) => {
        expect(response.status).to.eq(200)
        response.body.forEach(banco => {
          expect(banco.estadoAtuacao).to.be.eq("SC")
        });
      })
    })

    it("Filtrar bancos por nome", () => {
      cy.request("GET", "/bank?banco=Nubank").then((response) => {
        expect(response.status).to.eq(200)
        response.body.forEach(banco => {
          expect(banco.banco).to.be.eq("Nubank")
        });
      })
    })
  })

  context("POST /bank", () => {
    it("Adicionar banco", () => {
      cy.request("POST", "/bank",
        {
          "banco": "Banco Teste",
          "estadoAtuacao": "SC",
          "juros": 10
        }).then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body[1].mensagem).to.eq("Banco adicionado com sucesso!")
        })
    })
  })

  context("PUT /bank", () => {
    it("Adicionar banco", () => {
      cy.request("PUT", "/bank/1",
        {
          "estadoAtuacao": "SP",
          "juros": 15
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body[0].mensagem).to.eq("Registro alterado com sucesso!")
        })
    })
  })
})
