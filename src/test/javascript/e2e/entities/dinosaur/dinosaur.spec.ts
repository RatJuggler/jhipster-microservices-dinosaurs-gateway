import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DinosaurComponentsPage,
  /* DinosaurDeleteDialog, */
  DinosaurUpdatePage,
} from './dinosaur.page-object';

const expect = chai.expect;

describe('Dinosaur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dinosaurComponentsPage: DinosaurComponentsPage;
  let dinosaurUpdatePage: DinosaurUpdatePage;
  /* let dinosaurDeleteDialog: DinosaurDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Dinosaurs', async () => {
    await navBarPage.goToEntity('dinosaur');
    dinosaurComponentsPage = new DinosaurComponentsPage();
    await browser.wait(ec.visibilityOf(dinosaurComponentsPage.title), 5000);
    expect(await dinosaurComponentsPage.getTitle()).to.eq('gatewayApp.dinosaur.home.title');
    await browser.wait(ec.or(ec.visibilityOf(dinosaurComponentsPage.entities), ec.visibilityOf(dinosaurComponentsPage.noResult)), 1000);
  });

  it('should load create Dinosaur page', async () => {
    await dinosaurComponentsPage.clickOnCreateButton();
    dinosaurUpdatePage = new DinosaurUpdatePage();
    expect(await dinosaurUpdatePage.getPageTitle()).to.eq('gatewayApp.dinosaur.home.createOrEditLabel');
    await dinosaurUpdatePage.cancel();
  });

  /* it('should create and save Dinosaurs', async () => {
        const nbButtonsBeforeCreate = await dinosaurComponentsPage.countDeleteButtons();

        await dinosaurComponentsPage.clickOnCreateButton();

        await promise.all([
            dinosaurUpdatePage.setNameInput('name'),
            dinosaurUpdatePage.setPronunciationInput('pronunciation'),
            dinosaurUpdatePage.setMeaningInput('meaning'),
            dinosaurUpdatePage.setWeightInput('5'),
            dinosaurUpdatePage.setLengthInput('5'),
            dinosaurUpdatePage.setHeightInput('5'),
            dinosaurUpdatePage.dietSelectLastOption(),
            dinosaurUpdatePage.setCreatedByInput('5'),
            dinosaurUpdatePage.setCreatedDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            dinosaurUpdatePage.setModifiedByInput('5'),
            dinosaurUpdatePage.setModifiedDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            dinosaurUpdatePage.epochItLivedSelectLastOption(),
            dinosaurUpdatePage.cladeSelectLastOption(),
        ]);

        expect(await dinosaurUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await dinosaurUpdatePage.getPronunciationInput()).to.eq('pronunciation', 'Expected Pronunciation value to be equals to pronunciation');
        expect(await dinosaurUpdatePage.getMeaningInput()).to.eq('meaning', 'Expected Meaning value to be equals to meaning');
        expect(await dinosaurUpdatePage.getWeightInput()).to.eq('5', 'Expected weight value to be equals to 5');
        expect(await dinosaurUpdatePage.getLengthInput()).to.eq('5', 'Expected length value to be equals to 5');
        expect(await dinosaurUpdatePage.getHeightInput()).to.eq('5', 'Expected height value to be equals to 5');
        expect(await dinosaurUpdatePage.getCreatedByInput()).to.eq('5', 'Expected createdBy value to be equals to 5');
        expect(await dinosaurUpdatePage.getCreatedDtInput()).to.contain('2001-01-01T02:30', 'Expected createdDt value to be equals to 2000-12-31');
        expect(await dinosaurUpdatePage.getModifiedByInput()).to.eq('5', 'Expected modifiedBy value to be equals to 5');
        expect(await dinosaurUpdatePage.getModifiedDtInput()).to.contain('2001-01-01T02:30', 'Expected modifiedDt value to be equals to 2000-12-31');

        await dinosaurUpdatePage.save();
        expect(await dinosaurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await dinosaurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Dinosaur', async () => {
        const nbButtonsBeforeDelete = await dinosaurComponentsPage.countDeleteButtons();
        await dinosaurComponentsPage.clickOnLastDeleteButton();

        dinosaurDeleteDialog = new DinosaurDeleteDialog();
        expect(await dinosaurDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.dinosaur.delete.question');
        await dinosaurDeleteDialog.clickOnConfirmButton();

        expect(await dinosaurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
