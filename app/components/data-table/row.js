import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
    tagName: 'tr',
    index: null,
    content: null,
    classNames: ['hover-row'],
    classNameBindings: ['checked:grey-row'],

    checked: alias('content.isSelected'),

    click() {
        this.set('checked', !this.checked);
    },

    actions: {
        onChange(e) {
            this.set('checked', e.target.checked);
        }
    }
});
