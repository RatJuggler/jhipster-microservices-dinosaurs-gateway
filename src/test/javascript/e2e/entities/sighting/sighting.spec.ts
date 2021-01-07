import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SightingComponentsPage, SightingDeleteDialog, SightingUpdatePage } from './sighting.page-object';

const expect = chai.expect;

describe('Sighting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sightingComponentsPage: SightingComponentsPage;
  let sightingUpdatePage: SightingUpdatePage;
  let sightingDeleteDialog: SightingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sightings', async () => {
    await navBarPage.goToEntity('sighting');
    sightingComponentsPage = new SightingComponentsPage();
    await browser.wait(ec.visibilityOf(sightingComponentsPage.title), 5000);
    expect(await sightingComponentsPage.getTitle()).to.eq('gatewayApp.sighting.home.title');
    await browser.wait(ec.or(ec.visibilityOf(sightingComponentsPage.entities), ec.visibilityOf(sightingComponentsPage.noResult)), 1000);
  });

  it('should load create Sighting page', async () => {
    await sightingComponentsPage.clickOnCreateButton();
    sightingUpdatePage = new SightingUpdatePage();
    expect(await sightingUpdatePage.getPageTitle()).to.eq('gatewayApp.sighting.home.createOrEditLabel');
    await sightingUpdatePage.cancel();
  });

  it('should create and save Sightings', async () => {
    const nbButtonsBeforeCreate = await sightingComponentsPage.countDeleteButtons();

    await sightingComponentsPage.clickOnCreateButton();

    await promise.all([
      sightingUpdatePage.setDinosaurInput('5'),
      sightingUpdatePage.setByUserInput('5'),
      sightingUpdatePage.setWhenDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      sightingUpdatePage.setLatInput('5'),
      sightingUpdatePage.setLngInput('5'),
      sightingUpdatePage.setNumberInput('5'),
      sightingUpdatePage.headingSelectLastOption(),
      sightingUpdatePage.setNotesInput('notes'),
    ]);

    expect(await sightingUpdatePage.getDinosaurInput()).to.eq('5', 'Expected dinosaur value to be equals to 5');
    expect(await sightingUpdatePage.getByUserInput()).to.eq('5', 'Expected byUser value to be equals to 5');
    expect(await sightingUpdatePage.getWhenDtInput()).to.contain('2001-01-01T02:30', 'Expected whenDt value to be equals to 2000-12-31');
    expect(await sightingUpdatePage.getLatInput()).to.eq('5', 'Expected lat value to be equals to 5');
    expect(await sightingUpdatePage.getLngInput()).to.eq('5', 'Expected lng value to be equals to 5');
    expect(await sightingUpdatePage.getNumberInput()).to.eq('5', 'Expected number value to be equals to 5');
    expect(await sightingUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await sightingUpdatePage.save();
    expect(await sightingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sightingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Sighting', async () => {
    const nbButtonsBeforeDelete = await sightingComponentsPage.countDeleteButtons();
    await sightingComponentsPage.clickOnLastDeleteButton();

    sightingDeleteDialog = new SightingDeleteDialog();
    expect(await sightingDeleteDialog.getDialogTitle()).to.eq('gatewayApp.sighting.delete.question');
    await sightingDeleteDialog.clickOnConfirmButton();

    expect(await sightingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
