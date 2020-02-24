import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  HighScoreComponentsPage,
  /* HighScoreDeleteDialog, */
  HighScoreUpdatePage
} from './high-score.page-object';

const expect = chai.expect;

describe('HighScore e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let highScoreComponentsPage: HighScoreComponentsPage;
  let highScoreUpdatePage: HighScoreUpdatePage;
  /* let highScoreDeleteDialog: HighScoreDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load HighScores', async () => {
    await navBarPage.goToEntity('high-score');
    highScoreComponentsPage = new HighScoreComponentsPage();
    await browser.wait(ec.visibilityOf(highScoreComponentsPage.title), 5000);
    expect(await highScoreComponentsPage.getTitle()).to.eq('gatewayApp.highScore.home.title');
    await browser.wait(ec.or(ec.visibilityOf(highScoreComponentsPage.entities), ec.visibilityOf(highScoreComponentsPage.noResult)), 1000);
  });

  it('should load create HighScore page', async () => {
    await highScoreComponentsPage.clickOnCreateButton();
    highScoreUpdatePage = new HighScoreUpdatePage();
    expect(await highScoreUpdatePage.getPageTitle()).to.eq('gatewayApp.highScore.home.createOrEditLabel');
    await highScoreUpdatePage.cancel();
  });

  /* it('should create and save HighScores', async () => {
        const nbButtonsBeforeCreate = await highScoreComponentsPage.countDeleteButtons();

        await highScoreComponentsPage.clickOnCreateButton();

        await promise.all([
            highScoreUpdatePage.setScoreInput('5'),
            highScoreUpdatePage.setAchievedDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            highScoreUpdatePage.playerSelectLastOption(),
            highScoreUpdatePage.levelSelectLastOption(),
        ]);

        expect(await highScoreUpdatePage.getScoreInput()).to.eq('5', 'Expected score value to be equals to 5');
        expect(await highScoreUpdatePage.getAchievedDtInput()).to.contain('2001-01-01T02:30', 'Expected achievedDt value to be equals to 2000-12-31');

        await highScoreUpdatePage.save();
        expect(await highScoreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await highScoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last HighScore', async () => {
        const nbButtonsBeforeDelete = await highScoreComponentsPage.countDeleteButtons();
        await highScoreComponentsPage.clickOnLastDeleteButton();

        highScoreDeleteDialog = new HighScoreDeleteDialog();
        expect(await highScoreDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.highScore.delete.question');
        await highScoreDeleteDialog.clickOnConfirmButton();

        expect(await highScoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
