import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlayerComponentsPage, PlayerDeleteDialog, PlayerUpdatePage } from './player.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Player e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let playerComponentsPage: PlayerComponentsPage;
  let playerUpdatePage: PlayerUpdatePage;
  let playerDeleteDialog: PlayerDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Players', async () => {
    await navBarPage.goToEntity('player');
    playerComponentsPage = new PlayerComponentsPage();
    await browser.wait(ec.visibilityOf(playerComponentsPage.title), 5000);
    expect(await playerComponentsPage.getTitle()).to.eq('gatewayApp.player.home.title');
    await browser.wait(ec.or(ec.visibilityOf(playerComponentsPage.entities), ec.visibilityOf(playerComponentsPage.noResult)), 1000);
  });

  it('should load create Player page', async () => {
    await playerComponentsPage.clickOnCreateButton();
    playerUpdatePage = new PlayerUpdatePage();
    expect(await playerUpdatePage.getPageTitle()).to.eq('gatewayApp.player.home.createOrEditLabel');
    await playerUpdatePage.cancel();
  });

  it('should create and save Players', async () => {
    const nbButtonsBeforeCreate = await playerComponentsPage.countDeleteButtons();

    await playerComponentsPage.clickOnCreateButton();

    await promise.all([
      playerUpdatePage.setEmailInput('VHZPT@&amp;(.n{#FXA'),
      playerUpdatePage.setNameInput('name'),
      playerUpdatePage.setAvatarInput(absolutePath),
      playerUpdatePage.setCreatedDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await playerUpdatePage.getEmailInput()).to.eq('VHZPT@&amp;(.n{#FXA', 'Expected Email value to be equals to VHZPT@&amp;(.n{#FXA');
    expect(await playerUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await playerUpdatePage.getAvatarInput()).to.endsWith(
      fileNameToUpload,
      'Expected Avatar value to be end with ' + fileNameToUpload
    );
    expect(await playerUpdatePage.getCreatedDtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDt value to be equals to 2000-12-31'
    );

    await playerUpdatePage.save();
    expect(await playerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await playerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Player', async () => {
    const nbButtonsBeforeDelete = await playerComponentsPage.countDeleteButtons();
    await playerComponentsPage.clickOnLastDeleteButton();

    playerDeleteDialog = new PlayerDeleteDialog();
    expect(await playerDeleteDialog.getDialogTitle()).to.eq('gatewayApp.player.delete.question');
    await playerDeleteDialog.clickOnConfirmButton();

    expect(await playerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
