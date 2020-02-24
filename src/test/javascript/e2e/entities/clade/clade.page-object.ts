import { element, by, ElementFinder } from 'protractor';

export class CladeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-clade div table .btn-danger'));
  title = element.all(by.css('jhi-clade div h2#page-heading span')).first();
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

export class CladeUpdatePage {
  pageTitle = element(by.id('jhi-clade-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  pronunciationInput = element(by.id('field_pronunciation'));
  meaningInput = element(by.id('field_meaning'));
  descriptionInput = element(by.id('field_description'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setPronunciationInput(pronunciation: string): Promise<void> {
    await this.pronunciationInput.sendKeys(pronunciation);
  }

  async getPronunciationInput(): Promise<string> {
    return await this.pronunciationInput.getAttribute('value');
  }

  async setMeaningInput(meaning: string): Promise<void> {
    await this.meaningInput.sendKeys(meaning);
  }

  async getMeaningInput(): Promise<string> {
    return await this.meaningInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
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

export class CladeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-clade-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-clade'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
