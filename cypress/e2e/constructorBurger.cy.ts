import Cypress from 'cypress';
import { clickButton } from '../utils/utils';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const ID_PRODUCT_FILLING = `[data-cy=${'643d69a5c3f7b9001cfa094a'}]`;
const ID_FIRST_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const ID_SECOND_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BASE_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('POST', `${BASE_URL}/orders`, {
    fixture: 'orderResponse.json'
  });
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.get('#modals').as('modal');
});

describe('Тест на добавление ингредиента в заказ', () => {
  it('Добавляем один ингредиент и проверяем', () => {
    cy.get(ID_PRODUCT_FILLING).children('button').click();
    cy.get(ID_PRODUCT_FILLING)
      .find('.counter__num')
      .contains('1' || '2'); // при добавлении булки 2, ингредиента 1
  });
  it('Добавляем несколько ингредиентов', () => {
    cy.get(ID_SECOND_BUN).children('button').click();
    clickButton({ selector: ID_PRODUCT_FILLING, times: 5 });
  });
});

describe('Тестирование открытия и закрытия модальных окон', () => {
  it('Открываем модальное окно', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_PRODUCT_FILLING).children('a').click();
    cy.get('@modal').should('not.be.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa094a');
  });
  it('Закрываем модальное окно кликом по крестику', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_SECOND_BUN).children('a').click();
    cy.get('@modal').should('not.be.empty');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });
  it('Закрываем модальное окно кликом на Escape', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FIRST_BUN).children('a').click();
    cy.get('@modal').should('not.be.empty');
    cy.get('body').trigger('keydown', { key: 'Escape' });
  });
  it('Закрываем модальное окно кликом вне оверлея', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FIRST_BUN).children('a').click();
    cy.get('@modal').should('not.be.empty');
    cy.get(`[data-cy='overlay']`).click({ force: true });
    cy.get('@modal').should('be.empty');
  });

  describe('Авторизация пользователя и оформление заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'ipsum');
      cy.setCookie('accessToken', 'lorem');
      cy.getAllLocalStorage().should('be.not.empty');
      cy.getCookie('accessToken').should('be.not.empty');
    });
    afterEach(() => {
      window.localStorage.clear();
      cy.clearAllCookies();
      cy.getAllLocalStorage().should('be.empty');
      cy.getAllCookies().should('be.empty');
    });
    const inputEmal = 'input[name=email]';
    const inputPassword = 'input[name=password]';
    const testUser = {
      email: 'Test@mail.ru',
      password: 'Test'
    };
    it('Авторизуемся и оформляем заказ', () => {
      cy.visit('/login');
      cy.get(inputEmal).click().type(testUser.email);
      cy.get(inputPassword).click().type(testUser.password);
      cy.contains('button', 'Войти').click();
      cy.location('pathname', { timeout: 1000 }).should('eq', '/');
      cy.get(ID_PRODUCT_FILLING).children('button').click();
      cy.get(ID_SECOND_BUN).children('button').click();
      cy.contains('Оформить заказ').should('be.enabled').click();
    });
  });
});
