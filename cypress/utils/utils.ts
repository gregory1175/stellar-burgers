export type TClickButton = {
  selector: string;
  times: number;
};

export function clickButton({ selector, times }: TClickButton) {
  for (let i = 0; i < times; i++) {
    cy.get(selector).children('button').click();
  }
}
