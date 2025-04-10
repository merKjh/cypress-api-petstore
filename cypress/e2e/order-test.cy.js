describe("Pet Store API Tests", () => {
    const newOrder = {
      petId: 127127,
      name: "Hakuna Matata",
      quantity: 2,
      status: "placed",
      complete: true,
    };

    it("User can create a new order", () => {
      cy.request("POST", `/store/order`, newOrder).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.petId).to.equal(newOrder.petId);
        expect(response.body.quantity).to.equal(newOrder.quantity);
        expect(response.body.status).to.equal(newOrder.status);
        expect(response.body.complete).to.equal(newOrder.complete);

        Cypress.env('orderId', response.body.id);
      });
    });

    it("User can get the order created", () => {   
      const orderId = Cypress.env('orderId');  
        cy.request("GET", `/store/order/${orderId}`).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.id).to.equal(orderId);
          expect(response.body.petId).to.equal(newOrder.petId);
          expect(response.body.quantity).to.equal(newOrder.quantity);
          expect(response.body.status).to.equal(newOrder.status);
          expect(response.body.complete).to.equal(newOrder.complete);
          });
      });

      it("User can delete the order created", () => {   
        const orderId = Cypress.env('orderId');  
          cy.request("DELETE", `/store/order/${orderId}`).then((response) => {
            expect(response.status).to.equal(200);
          });
          //check that the deleted record no longer exists
          cy.request({ url: `/store/order/${orderId}`, failOnStatusCode: false }).then(
            (response) => {
              expect(response.status).to.equal(404);
            }
          );
        });
});