import { element, by, ElementFinder } from 'protractor';

export class EpochComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-epoch div table .btn-danger'));
  title = element.all(by.css('jhi-epoch div h2#page-heading span')).first();
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

export class EpochUpdatePage {
  pageTitle = element(by.id('jhi-epoch-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  periodSelect = element(by.id('field_period'));
  epochSelect = element(by.id('field_epoch'));
  fromMaInput = element(by.id('field_fromMa'));
  toMaInput = element(by.id('field_toMa'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPeriodSelect(period: string): Promise<void> {
    await this.periodSelect.sendKeys(period);
  }

  async getPeriodSelect(): Promise<string> {
    return await this.periodSelect.element(by.css('option:checked')).getText();
  }

  async periodSelectLastOption(): Promise<void> {
    await this.periodSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setEpochSelect(epoch: string): Promise<void> {
    await this.epochSelect.sendKeys(epoch);
  }

  async getEpochSelect(): Promise<string> {
    return await this.epochSelect.element(by.css('option:checked')).getText();
  }

  async epochSelectLastOption(): Promise<void> {
    await this.epochSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFromMaInput(fromMa: string): Promise<void> {
    await this.fromMaInput.sendKeys(fromMa);
  }

  async getFromMaInput(): Promise<string> {
    return await this.fromMaInput.getAttribute('value');
  }

  async setToMaInput(toMa: string): Promise<void> {
    await this.toMaInput.sendKeys(toMa);
  }

  async getToMaInput(): Promise<string> {
    return await this.toMaInput.getAttribute('value');
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

export class EpochDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-epoch-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-epoch'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
