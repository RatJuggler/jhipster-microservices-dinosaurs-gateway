import { element, by, ElementFinder } from 'protractor';

export class HighScoreComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-high-score div table .btn-danger'));
  title = element.all(by.css('jhi-high-score div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class HighScoreUpdatePage {
  pageTitle = element(by.id('jhi-high-score-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  scoreInput = element(by.id('field_score'));
  achievedDtInput = element(by.id('field_achievedDt'));

  playerSelect = element(by.id('field_player'));
  levelSelect = element(by.id('field_level'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setScoreInput(score: string): Promise<void> {
    await this.scoreInput.sendKeys(score);
  }

  async getScoreInput(): Promise<string> {
    return await this.scoreInput.getAttribute('value');
  }

  async setAchievedDtInput(achievedDt: string): Promise<void> {
    await this.achievedDtInput.sendKeys(achievedDt);
  }

  async getAchievedDtInput(): Promise<string> {
    return await this.achievedDtInput.getAttribute('value');
  }

  async playerSelectLastOption(): Promise<void> {
    await this.playerSelect.all(by.tagName('option')).last().click();
  }

  async playerSelectOption(option: string): Promise<void> {
    await this.playerSelect.sendKeys(option);
  }

  getPlayerSelect(): ElementFinder {
    return this.playerSelect;
  }

  async getPlayerSelectedOption(): Promise<string> {
    return await this.playerSelect.element(by.css('option:checked')).getText();
  }

  async levelSelectLastOption(): Promise<void> {
    await this.levelSelect.all(by.tagName('option')).last().click();
  }

  async levelSelectOption(option: string): Promise<void> {
    await this.levelSelect.sendKeys(option);
  }

  getLevelSelect(): ElementFinder {
    return this.levelSelect;
  }

  async getLevelSelectedOption(): Promise<string> {
    return await this.levelSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class HighScoreDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-highScore-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-highScore'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
