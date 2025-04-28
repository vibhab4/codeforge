describe('Authentication Flows', () => {

    it('should redirect to login if visiting dashboard while not logged in', () => {
        cy.visit('/dashboard');
        cy.url().should('include', '/login');
        cy.screenshot('success'); 
      });
      
      it('should redirect to login if visiting challenge while not logged in', () => {
        cy.visit('/challenge');
        cy.url().should('include', '/login');
        cy.screenshot('success');
      });
      

      it('should not allow login with blank fields', () => {
        cy.visit('/login');
      
        cy.get('button[type="submit"]').click();
      
        //  Check: URL should still be /login
        cy.url().should('include', '/login');

        cy.get('input#email').should('exist');
        cy.get('input#password').should('exist');
        cy.screenshot('logged-not-allowed');
      });
           

    it('should allow a user to register', () => {
      cy.visit('/register'); // Visit the register page
  
      // Fill out the form
      cy.get('input#name').type('Test User');
      cy.get('input#email').type('testuser@example.com');
      cy.get('input#password').type('password123');
  
      // Click Register
      cy.get('button[type="submit"]').click();
  
      // After registration, should navigate to /challenge
      cy.url().should('include', '/challenge');
      cy.contains("Today's Challenge"); 
      cy.screenshot('registered-successfully');
    });
  
    it('should allow a user to login', () => {
      cy.visit('/login'); 
  
      // Fill out the form
      cy.get('input#email').type('testuser@example.com');
      cy.get('input#password').type('password123');
  
      // Click Login
      cy.get('button[type="submit"]').click();
  
      // After login, should navigate to /challenge
      cy.url().should('include', '/challenge');
      cy.contains("Today's Challenge"); 
      cy.screenshot('logged-in-successfully');
    });
  
        it('should not allow login with wrong password', () => {
          cy.visit('/login');
      
          // Fill out email and wrong password
          cy.get('input#email').type('testuser@example.com');
          cy.get('input#password').type('wrongpassword');
      
          // Submit login form
          cy.get('button[type="submit"]').click();

          // Expect to still be on the login page
          cy.url().should('include', '/login');
      
          // Check if error message appears
          cy.contains('Login failed'); 
          cy.screenshot('no-login-allowed');
        });
      
      });
      
  
  