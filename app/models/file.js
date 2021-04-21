import Model from '@ember-data/model';
import attr from 'ember-data/attr';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import { capitalize } from '@ember/string';

export default Model.extend({
    name: attr('string'),
    device: attr('string'),
    path: attr('string'),
    status: attr('string'),
    isAvailable: equal('status', 'available'),

    statusDisplay: computed('status', function() {
        return capitalize(this.status);
    })
});
