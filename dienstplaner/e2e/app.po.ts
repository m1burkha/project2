import {browser, by, element} from 'protractor';

/**
 * app page
 */
export class AppPage {
    /**
     * navigate to
     */
    navigateTo() {
        return browser.get('/');
    }

    /**
     * get paragraph text
     */
    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }
}
