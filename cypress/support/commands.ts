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

Cypress.Commands.add('addIngredientByName', (name: string, alias?: string) => {
  const normalizedAlias = alias ?? `ingredient-${name.replace(/\s+/g, '-').toLowerCase()}`;

  cy.contains('[data-testid="ingredient-card"]', name)
    .as(normalizedAlias)
    .within(() => {
      cy.contains('button', 'Добавить').click();
    });

  return cy.get(`@${normalizedAlias as string}`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      setAuthTokens(): Chainable<void>;
      clearAuthTokens(): Chainable<void>;
      addIngredientByName(name: string, alias?: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
