import { element, by, ElementFinder } from 'protractor';

export class LevelComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-level div table .btn-danger'));
  title = element.all(by.css('jhi-level div h2#page-heading span')).first();
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

export class LevelUpdatePage {
  pageTitle = element(by.id('jhi-level-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  orderInput = element(by.id('field_order'));
  definitionInput = element(by.id('field_definition'));
  createdDtInput = element(by.id('field_createdDt'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setOrderInput(order: string): Promise<void> {
    await this.orderInput.sendKeys(order);
  }

  async getOrderInput(): Promise<string> {
    return await this.orderInput.getAttribute('value');
  }

  async setDefinitionInput(definition: string): Promise<void> {
    await this.definitionInput.sendKeys(definition);
  }

  async getDefinitionInput(): Promise<string> {
    return await this.definitionInput.getAttribute('value');
  }

  async setCreatedDtInput(createdDt: string): Promise<void> {
    await this.createdDtInput.sendKeys(createdDt);
  }

  async getCreatedDtInput(): Promise<string> {
    return await this.createdDtInput.getAttribute('value');
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

export class LevelDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-level-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-level'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
