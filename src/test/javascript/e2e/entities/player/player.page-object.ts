import { element, by, ElementFinder } from 'protractor';

export class PlayerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-player div table .btn-danger'));
  title = element.all(by.css('jhi-player div h2#page-heading span')).first();
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

export class PlayerUpdatePage {
  pageTitle = element(by.id('jhi-player-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  emailInput = element(by.id('field_email'));
  nameInput = element(by.id('field_name'));
  avatarInput = element(by.id('file_avatar'));
  createdDtInput = element(by.id('field_createdDt'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setAvatarInput(avatar: string): Promise<void> {
    await this.avatarInput.sendKeys(avatar);
  }

  async getAvatarInput(): Promise<string> {
    return await this.avatarInput.getAttribute('value');
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

export class PlayerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-player-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-player'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
