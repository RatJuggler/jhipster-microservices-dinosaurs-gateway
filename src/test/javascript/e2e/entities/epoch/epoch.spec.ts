import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EpochComponentsPage, EpochDeleteDialog, EpochUpdatePage } from './epoch.page-object';

const expect = chai.expect;

describe('Epoch e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let epochComponentsPage: EpochComponentsPage;
  let epochUpdatePage: EpochUpdatePage;
  let epochDeleteDialog: EpochDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Epoches', async () => {
    await navBarPage.goToEntity('epoch');
    epochComponentsPage = new EpochComponentsPage();
    await browser.wait(ec.visibilityOf(epochComponentsPage.title), 5000);
    expect(await epochComponentsPage.getTitle()).to.eq('gatewayApp.epoch.home.title');
    await browser.wait(ec.or(ec.visibilityOf(epochComponentsPage.entities), ec.visibilityOf(epochComponentsPage.noResult)), 1000);
  });

  it('should load create Epoch page', async () => {
    await epochComponentsPage.clickOnCreateButton();
    epochUpdatePage = new EpochUpdatePage();
    expect(await epochUpdatePage.getPageTitle()).to.eq('gatewayApp.epoch.home.createOrEditLabel');
    await epochUpdatePage.cancel();
  });

  it('should create and save Epoches', async () => {
    const nbButtonsBeforeCreate = await epochComponentsPage.countDeleteButtons();

    await epochComponentsPage.clickOnCreateButton();

    await promise.all([
      epochUpdatePage.periodSelectLastOption(),
      epochUpdatePage.epochSelectLastOption(),
      epochUpdatePage.setFromMaInput('5'),
      epochUpdatePage.setToMaInput('5'),
    ]);

    expect(await epochUpdatePage.getFromMaInput()).to.eq('5', 'Expected fromMa value to be equals to 5');
    expect(await epochUpdatePage.getToMaInput()).to.eq('5', 'Expected toMa value to be equals to 5');

    await epochUpdatePage.save();
    expect(await epochUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await epochComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Epoch', async () => {
    const nbButtonsBeforeDelete = await epochComponentsPage.countDeleteButtons();
    await epochComponentsPage.clickOnLastDeleteButton();

    epochDeleteDialog = new EpochDeleteDialog();
    expect(await epochDeleteDialog.getDialogTitle()).to.eq('gatewayApp.epoch.delete.question');
    await epochDeleteDialog.clickOnConfirmButton();

    expect(await epochComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
