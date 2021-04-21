import Component from '@ember/component'
import { readOnly, gt, filterBy } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ['data-table'],

    /**
     * An array of objects to display in the table
     * @property content
     * @type {Array}
     */
    content: null,
    isAllDocumentsSelected: false,

    atLeastOneSelected: gt('selectedContentsCount', 0),
    rowCount: readOnly('content.length'),
    selectedAndAvailableContents: filterBy('selectedContents', 'isAvailable'),
    selectedAndAvailableContentsCount: readOnly('selectedAndAvailableContents.length'),
    selectedContents: filterBy('content', 'isSelected'),
    selectedContentsCount: readOnly('selectedContents.length'),

    fullySelected: computed('rowCount', 'selectedContentsCount', function() {
        return this.rowCount === this.selectedContentsCount;
    }),

    isSomeButNotAllSelected: computed('atLeastOneSelected', 'fullySelected', function () {
        return this.atLeastOneSelected && !this.fullySelected;
    }),

    changeDocuments(boolean) {
        (this.content || []).forEach(obj => {
            obj.set('isSelected', boolean);
        })
    },

    actions: {
        selectAll() {
            // if fullySelected, unselect all
            if (this.fullySelected) {
                this.changeDocuments(false);
            } else {
                // else select all
                this.changeDocuments(true);
            }
        },
        downloadSelected() {
            if (this.selectedAndAvailableContentsCount) {
                let answer = "";
                this.selectedAndAvailableContents.forEach(content => {
                    answer += `Device: ${content.get('device')} Path: ${content.get('path')}`;
                })
                alert(answer);
            } else if (this.atLeastOneSelected) {
                alert("Please select a file that is available.")
            } else {
                alert("Please select a file to download.")
            }
        }
    }
})