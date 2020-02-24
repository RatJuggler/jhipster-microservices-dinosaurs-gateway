import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LevelComponentsPage, LevelDeleteDialog, LevelUpdatePage } from './level.page-object';

const expect = chai.expect;

describe('Level e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let levelComponentsPage: LevelComponentsPage;
  let levelUpdatePage: LevelUpdatePage;
  let levelDeleteDialog: LevelDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Levels', async () => {
    await navBarPage.goToEntity('level');
    levelComponentsPage = new LevelComponentsPage();
    await browser.wait(ec.visibilityOf(levelComponentsPage.title), 5000);
    expect(await levelComponentsPage.getTitle()).to.eq('gatewayApp.level.home.title');
    await browser.wait(ec.or(ec.visibilityOf(levelComponentsPage.entities), ec.visibilityOf(levelComponentsPage.noResult)), 1000);
  });

  it('should load create Level page', async () => {
    await levelComponentsPage.clickOnCreateButton();
    levelUpdatePage = new LevelUpdatePage();
    expect(await levelUpdatePage.getPageTitle()).to.eq('gatewayApp.level.home.createOrEditLabel');
    await levelUpdatePage.cancel();
  });

  it('should create and save Levels', async () => {
    const nbButtonsBeforeCreate = await levelComponentsPage.countDeleteButtons();

    await levelComponentsPage.clickOnCreateButton();

    await promise.all([
      levelUpdatePage.setNameInput('name'),
      levelUpdatePage.setOrderInput('5'),
      levelUpdatePage.setDefinitionInput('definition'),
      levelUpdatePage.setCreatedDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);

    expect(await levelUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await levelUpdatePage.getOrderInput()).to.eq('5', 'Expected order value to be equals to 5');
    expect(await levelUpdatePage.getDefinitionInput()).to.eq('definition', 'Expected Definition value to be equals to definition');
    expect(await levelUpdatePage.getCreatedDtInput()).to.contain('2001-01-01T02:30', 'Expected createdDt value to be equals to 2000-12-31');

    await levelUpdatePage.save();
    expect(await levelUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await levelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Level', async () => {
    const nbButtonsBeforeDelete = await levelComponentsPage.countDeleteButtons();
    await levelComponentsPage.clickOnLastDeleteButton();

    levelDeleteDialog = new LevelDeleteDialog();
    expect(await levelDeleteDialog.getDialogTitle()).to.eq('gatewayApp.level.delete.question');
    await levelDeleteDialog.clickOnConfirmButton();

    expect(await levelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
