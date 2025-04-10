describe("Pet Store API Tests", () => {
    const newPet = {
      id: 127127,
      name: "Hakuna Matata",
      status: "available",
      updatedStatus1: "pending",
      updatedStatus2: "sold",
    };
    it("User can create a new pet to the store", () => {
      cy.request("POST", `/pet`, newPet).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(newPet.id);
        expect(response.body.name).to.equal(newPet.name);
        expect(response.body.status).to.equal(newPet.status);
      });
    });
  
    it("User can get a new pet by ID", () => {
      cy.request("GET", `/pet/${newPet.id}`).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(newPet.id);
      });
    });
  
    it("User can update a new pet's status available to pending", () => {
      cy.request("POST", `/pet`, {
        petId: newPet.id,
        status: newPet.updatedStatus1,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal(newPet.updatedStatus1);
      });
    });

    it("User can update a new pet's status pending to sold", () => {
        cy.request("POST", `/pet`, {
          petId: newPet.id,
          status: newPet.updatedStatus2,
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.status).to.equal(newPet.updatedStatus2);
        });
      });
  
    it("User can delete a new pet by ID", () => {
      cy.request("DELETE", `/pet/${newPet.id}`).then((response) => {
        expect(response.status).to.equal(200);
      });
      //check that the deleted record no longer exists
      cy.request({ url: `/pet/${newPet.id}`, failOnStatusCode: false }).then(
        (response) => {
          expect(response.status).to.equal(404);
        }
      );
    });
  });