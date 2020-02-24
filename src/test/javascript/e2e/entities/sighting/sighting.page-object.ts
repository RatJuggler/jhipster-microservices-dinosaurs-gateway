import { element, by, ElementFinder } from 'protractor';

export class SightingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sighting div table .btn-danger'));
  title = element.all(by.css('jhi-sighting div h2#page-heading span')).first();
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

export class SightingUpdatePage {
  pageTitle = element(by.id('jhi-sighting-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dinosaurInput = element(by.id('field_dinosaur'));
  byUserInput = element(by.id('field_byUser'));
  whenDtInput = element(by.id('field_whenDt'));
  latInput = element(by.id('field_lat'));
  lngInput = element(by.id('field_lng'));
  numberInput = element(by.id('field_number'));
  headingSelect = element(by.id('field_heading'));
  notesInput = element(by.id('field_notes'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDinosaurInput(dinosaur: string): Promise<void> {
    await this.dinosaurInput.sendKeys(dinosaur);
  }

  async getDinosaurInput(): Promise<string> {
    return await this.dinosaurInput.getAttribute('value');
  }

  async setByUserInput(byUser: string): Promise<void> {
    await this.byUserInput.sendKeys(byUser);
  }

  async getByUserInput(): Promise<string> {
    return await this.byUserInput.getAttribute('value');
  }

  async setWhenDtInput(whenDt: string): Promise<void> {
    await this.whenDtInput.sendKeys(whenDt);
  }

  async getWhenDtInput(): Promise<string> {
    return await this.whenDtInput.getAttribute('value');
  }

  async setLatInput(lat: string): Promise<void> {
    await this.latInput.sendKeys(lat);
  }

  async getLatInput(): Promise<string> {
    return await this.latInput.getAttribute('value');
  }

  async setLngInput(lng: string): Promise<void> {
    await this.lngInput.sendKeys(lng);
  }

  async getLngInput(): Promise<string> {
    return await this.lngInput.getAttribute('value');
  }

  async setNumberInput(number: string): Promise<void> {
    await this.numberInput.sendKeys(number);
  }

  async getNumberInput(): Promise<string> {
    return await this.numberInput.getAttribute('value');
  }

  async setHeadingSelect(heading: string): Promise<void> {
    await this.headingSelect.sendKeys(heading);
  }

  async getHeadingSelect(): Promise<string> {
    return await this.headingSelect.element(by.css('option:checked')).getText();
  }

  async headingSelectLastOption(): Promise<void> {
    await this.headingSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
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

export class SightingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sighting-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sighting'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
