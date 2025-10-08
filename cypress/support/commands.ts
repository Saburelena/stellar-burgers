Cypress.Commands.add('setAuthTokens', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'test-refresh-token');
    win.localStorage.setItem('accessToken', 'test-access-token');
  });
  cy.setCookie('accessToken', 'Bearer test-access-token');
});

Cypress.Commands.add('clearAuthTokens', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('refreshToken');
    win.localStorage.removeItem('accessToken');
  });
  cy.clearCookie('accessToken');
});

declare global {
  namespace Cypress {
    interface Chainable {
      setAuthTokens(): Chainable<void>;
      clearAuthTokens(): Chainable<void>;
    }
  }
}

export {};
