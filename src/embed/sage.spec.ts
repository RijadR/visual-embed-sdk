import { SageEmbed, SageViewConfig } from './sage';
import { init } from '../index';
import { AuthType } from '../types';
import {
    executeAfterWait,
    expectUrlMatch,
    getDocumentBody,
    getIFrameSrc,
    getRootEl,
} from '../test/test-utils';

const defaultConfig: SageViewConfig = {
    disableWorksheetChange: false,
    hideWorksheetSelector: false,
    hideSearchBarTitle: false,
    hideSageAnswerHeader: false,
    hideAutocompleteSuggestions: false,
    hideSampleQuestions: false,
    isProductTour: false,
};

const thoughtSpotHost = 'tshost';

beforeAll(() => {
    init({
        thoughtSpotHost,
        authType: AuthType.None,
    });
    spyOn(window, 'alert');
});

describe('Sage  embed tests', () => {
    beforeEach(() => {
        document.body.innerHTML = getDocumentBody();
    });

    test('should render sage', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), defaultConfig);
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('should render sage with product tour flag set', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), { ...defaultConfig, isProductTour: true });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=true&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('should render sage with disable worksheet change flag', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            disableWorksheetChange: true,
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=true&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('should render sage with hide worksheet selector flag', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            hideWorksheetSelector: true,
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=true&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('should render sage with hideSearchBarTitle flag', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            hideSearchBarTitle: true,
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=true&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('should render sage with hide Sage Answer Header flag', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            hideSageAnswerHeader: true,
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=true&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('should render sage with hide Autocomplete suggestions flag', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            hideAutocompleteSuggestions: true,
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=true&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('should render sage with deprecated showObjectSuggestions flag', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            showObjectSuggestions: true,
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka`,
            );
        });
    });

    test('embed url include pre-seed dataSource without populating searchOptions', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            dataSource: 'worksheet-id',
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka?worksheet=worksheet-id`,
            );
        });
    });

    test('embed url include pre-seed dataSource and query', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            dataSource: 'worksheet-id',
            searchOptions: {
                searchQuery: 'test-query',
            },
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&isProductTour=false&hideSearchBarTitle=false&hideSageAnswerHeader=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka?worksheet=worksheet-id&query=test-query`,
            );
        });
    });

    test('embed url include pre-seed execute flag with query', async () => {
        const sageEmbed = new SageEmbed(getRootEl(), {
            ...defaultConfig,
            searchOptions: {
                searchQuery: 'test-query',
                executeSearch: true,
            },
        });
        sageEmbed.render();
        await executeAfterWait(() => {
            expectUrlMatch(
                getIFrameSrc(),
                `http://${thoughtSpotHost}/?embedApp=true&isSageEmbed=true&disableWorksheetChange=false&hideWorksheetSelector=false&hideEurekaSuggestions=false&hideAction=%5B"reportError","save","pin","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer","share"%5D#/embed/eureka?query=test-query&executeSearch=true`,
            );
        });
    });
});
