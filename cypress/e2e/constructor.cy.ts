describe('Страница конструктора бургера', () => {
  const INGREDIENTS_ALIAS = '@getIngredients';
  const MODAL_TITLE = 'Детали ингредиента';
  const BUN_NAME = 'Булка N-200i';
  const BUN_TOP = `${BUN_NAME} (верх)`;
  const BUN_BOTTOM = `${BUN_NAME} (низ)`;
  const SAUCE_NAME = 'Соус традиционный галактический';
  const FILLING_NAME = 'Филе Люминесцентного тетраодонтимформа';
  const ORDER_BUTTON_TEXT = 'Оформить заказ';
  const ORDER_NUMBER = '98765';

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
    cy.wait(INGREDIENTS_ALIAS);

    cy.addIngredientByName(BUN_NAME, 'bunIngredient');
    cy.addIngredientByName(FILLING_NAME, 'fillingIngredient');

    cy.contains(BUN_TOP).should('be.visible');
    cy.contains(BUN_BOTTOM).should('be.visible');
    cy.contains(FILLING_NAME).should('be.visible');
  });

  it('открывает и закрывает модальное окно по кнопке', () => {
    cy.visit('/');
    cy.wait(INGREDIENTS_ALIAS);

    cy.contains('li', BUN_NAME)
      .find('a')
      .first()
      .as('ingredientLink')
      .click();

    cy.contains('h3', MODAL_TITLE).as('modalTitle').should('be.visible');
    cy.contains('h3', BUN_NAME).should('be.visible');

    cy.get('[data-testid="modal-close-button"]').as('modalCloseButton').click();

    cy.get('@modalTitle').should('not.exist');
  });

  it('закрывает модальное окно по клику на оверлей', () => {
    cy.visit('/');
    cy.wait(INGREDIENTS_ALIAS);

    cy.contains('li', SAUCE_NAME)
      .find('a')
      .first()
      .click();

    cy.contains('h3', MODAL_TITLE).should('be.visible');
    cy.contains('h3', SAUCE_NAME).should('be.visible');

    cy.get('[data-testid="modal-overlay"]').as('modalOverlay').click({ force: true });

    cy.contains('h3', MODAL_TITLE).should('not.exist');
  });

  it('оформляет заказ и очищает конструктор', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setAuthTokens();

    cy.visit('/');
    cy.wait(INGREDIENTS_ALIAS);
    cy.wait('@getUser');

    cy.addIngredientByName(BUN_NAME, 'bunIngredient');
    cy.addIngredientByName(SAUCE_NAME, 'sauceIngredient');
    cy.addIngredientByName(FILLING_NAME, 'fillingIngredient');

    cy.contains('button', ORDER_BUTTON_TEXT).as('orderButton').click();

    cy.wait('@createOrder');

    cy.contains('h2', ORDER_NUMBER).as('orderNumber').should('be.visible');

    cy.get('[data-testid="modal-close-button"]').click();

    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
