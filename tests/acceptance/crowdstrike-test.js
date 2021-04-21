import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Crowdstrike', function (hooks) {
    setupApplicationTest(hooks);

    function de(id) {
        return `[data-element=${id}]`;
    };

    test('selecting few files', async function (assert) {
        await visit('/crowdstrike');
        assert.equal(currentURL(), '/crowdstrike');
        assert.dom(de('row-check-box-4')).exists('Five files are rendered.');
        assert.dom(de('check-all-indeterminate')).doesNotExist('When no files are selected, inderterminate checkbox is not there.');
        assert.dom(de('select-count')).hasText('None Selected', 'No files are selected in the beginning');

        await click(de('row-check-box-3'));
        await click(de('row-check-box-2'));
        assert.dom(de('check-all-indeterminate')).exists('When couple files are selected, inderterminate checkbox is there.');
        assert.dom(de('select-count')).hasText('Selected 2', 'After selecting two, two are selected.');
        
        await click(de('check-all-indeterminate'));
        assert.dom(de('select-count')).hasText('Selected 5', 'Five are selected after clicking indeterminate checkbox.');

        await click(de('check-all'));
        assert.dom(de('select-count')).hasText('None Selected', 'After clicking check all box while everything is selected, none are selected.');

        await click(de('check-all'));
        assert.dom(de('select-count')).hasText('Selected 5', 'Five are selected after clicking check all box.');

        // Unfortunately, calling alert in test is disabled.
        // I could try testing the functionality of the download in an integration test but time is running out.
    });
});