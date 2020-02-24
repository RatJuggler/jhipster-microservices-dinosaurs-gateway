import { element, by, ElementFinder } from 'protractor';

export class DinosaurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-dinosaur div table .btn-danger'));
  title = element.all(by.css('jhi-dinosaur div h2#page-heading span')).first();
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

export class DinosaurUpdatePage {
  pageTitle = element(by.id('jhi-dinosaur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  pronunciationInput = element(by.id('field_pronunciation'));
  meaningInput = element(by.id('field_meaning'));
  weightInput = element(by.id('field_weight'));
  lengthInput = element(by.id('field_length'));
  heightInput = element(by.id('field_height'));
  dietSelect = element(by.id('field_diet'));
  createdByInput = element(by.id('field_createdBy'));
  createdDtInput = element(by.id('field_createdDt'));
  modifiedByInput = element(by.id('field_modifiedBy'));
  modifiedDtInput = element(by.id('field_modifiedDt'));

  epochItLivedSelect = element(by.id('field_epochItLived'));
  cladeSelect = element(by.id('field_clade'));

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

  async setWeightInput(weight: string): Promise<void> {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput(): Promise<string> {
    return await this.weightInput.getAttribute('value');
  }

  async setLengthInput(length: string): Promise<void> {
    await this.lengthInput.sendKeys(length);
  }

  async getLengthInput(): Promise<string> {
    return await this.lengthInput.getAttribute('value');
  }

  async setHeightInput(height: string): Promise<void> {
    await this.heightInput.sendKeys(height);
  }

  async getHeightInput(): Promise<string> {
    return await this.heightInput.getAttribute('value');
  }

  async setDietSelect(diet: string): Promise<void> {
    await this.dietSelect.sendKeys(diet);
  }

  async getDietSelect(): Promise<string> {
    return await this.dietSelect.element(by.css('option:checked')).getText();
  }

  async dietSelectLastOption(): Promise<void> {
    await this.dietSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setCreatedByInput(createdBy: string): Promise<void> {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput(): Promise<string> {
    return await this.createdByInput.getAttribute('value');
  }

  async setCreatedDtInput(createdDt: string): Promise<void> {
    await this.createdDtInput.sendKeys(createdDt);
  }

  async getCreatedDtInput(): Promise<string> {
    return await this.createdDtInput.getAttribute('value');
  }

  async setModifiedByInput(modifiedBy: string): Promise<void> {
    await this.modifiedByInput.sendKeys(modifiedBy);
  }

  async getModifiedByInput(): Promise<string> {
    return await this.modifiedByInput.getAttribute('value');
  }

  async setModifiedDtInput(modifiedDt: string): Promise<void> {
    await this.modifiedDtInput.sendKeys(modifiedDt);
  }

  async getModifiedDtInput(): Promise<string> {
    return await this.modifiedDtInput.getAttribute('value');
  }

  async epochItLivedSelectLastOption(): Promise<void> {
    await this.epochItLivedSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async epochItLivedSelectOption(option: string): Promise<void> {
    await this.epochItLivedSelect.sendKeys(option);
  }

  getEpochItLivedSelect(): ElementFinder {
    return this.epochItLivedSelect;
  }

  async getEpochItLivedSelectedOption(): Promise<string> {
    return await this.epochItLivedSelect.element(by.css('option:checked')).getText();
  }

  async cladeSelectLastOption(): Promise<void> {
    await this.cladeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cladeSelectOption(option: string): Promise<void> {
    await this.cladeSelect.sendKeys(option);
  }

  getCladeSelect(): ElementFinder {
    return this.cladeSelect;
  }

  async getCladeSelectedOption(): Promise<string> {
    return await this.cladeSelect.element(by.css('option:checked')).getText();
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

export class DinosaurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-dinosaur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-dinosaur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
