describe('Страница конструктора бургера', () => {
  const ingredientsAlias = '@getIngredients';

  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
  });

  afterEach(() => {
    cy.clearAuthTokens();
  });

  it('добавляет булку и ингредиент в конструктор', () => {
    cy.visit('/');
    cy.wait(ingredientsAlias);

    cy.contains('li', 'Булка N-200i')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.contains('Булка N-200i (верх)').should('be.visible');
    cy.contains('Булка N-200i (низ)').should('be.visible');
    cy.contains('Филе Люминесцентного тетраодонтимформа').should('be.visible');
  });

  it('открывает и закрывает модальное окно по кнопке', () => {
    cy.visit('/');
    cy.wait(ingredientsAlias);

    cy.contains('li', 'Булка N-200i')
      .find('a')
      .first()
      .click();

    cy.contains('h3', 'Детали ингредиента').should('be.visible');
    cy.contains('h3', 'Булка N-200i').should('be.visible');

    cy.get('[data-testid="modal-close-button"]').click();

    cy.contains('h3', 'Детали ингредиента').should('not.exist');
  });

  it('закрывает модальное окно по клику на оверлей', () => {
    cy.visit('/');
    cy.wait(ingredientsAlias);

    cy.contains('li', 'Соус традиционный галактический')
      .find('a')
      .first()
      .click();

    cy.contains('h3', 'Детали ингредиента').should('be.visible');
    cy.contains('h3', 'Соус традиционный галактический').should('be.visible');

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.contains('h3', 'Детали ингредиента').should('not.exist');
  });

  it('оформляет заказ и очищает конструктор', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setAuthTokens();

    cy.visit('/');
    cy.wait(ingredientsAlias);
    cy.wait('@getUser');

    cy.contains('li', 'Булка N-200i')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.contains('li', 'Соус традиционный галактический')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.contains('button', 'Оформить заказ').click();

    cy.wait('@createOrder');

    cy.contains('h2', '98765').should('be.visible');

    cy.get('[data-testid="modal-close-button"]').click();

    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
