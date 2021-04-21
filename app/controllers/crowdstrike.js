import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import ObjectProxy from '@ember/object/proxy';

export default Controller.extend({
    files: null,

    init() {
        this._super();
        this.loadFiles.perform();
    },

    loadFiles: task(function* () {
        const results = yield this.store.query('file', {});
        const resultsWithSelects = (this.files || []).addObjects(results.map(result => ObjectProxy.create({
            content: result,
            isSelected: false
        })));
        this.set('files', resultsWithSelects);
    })
});