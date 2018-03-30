define([], function() {
    'use strict';

    var path = 'plugins/prototype-model/descriptors/icons/';

    var parts = [{
        'type': 'page',
        'name': 'uip.page',
        'displayName': 'Page',
        'icons': {
            '16': '',
            '36': 'page_36.png',
            '68': 'page_68.png'
        },
        'properties': [{
            'name': 'description',
            'type': 'string-area',
            'displayName': 'Description',
            'defaultValue': undefined,
            'category': 'Content attributes',
            'description': 'Description of page.'
        }, {
            'name': 'comment',
            'type': 'string-area',
            'displayName': 'Comment',
            'defaultValue': undefined,
            'category': 'Content attributes',
            'description': 'Comment of page'
        }, {
            'name': 'themeFilePath',
            'type': 'theme',
            'displayName': 'Theme File Path',
            'defaultValue': undefined,
            'category': 'Content attributes',
            'description': 'Theme of page.'
        }],
        'events': [{
            'name': 'click',
            'displayName': 'Click',
            'description': 'Fires on a mouse click on the element.'
        }, {
            'name': 'leftkeydown',
            'displayName': 'Left Key Down',
            'description': 'Fires when a user is pressing a left key.'
        }, {
            'name': 'rightkeydown',
            'displayName': 'Right Key Down',
            'description': 'Fires when a user is pressing a right key.'
        }],
        'supportStyle': ['background-color'],
        'outputElement': 'div'
    }, {
        'type': 'component',
        'name': 'uip.snippet',
        'displayName': 'Snippet',
        'icons': {
            '16': 'snippet_16.png',
            '36': 'snippet_36.png',
            '68': 'snippet_68.png'
        },
        'categories': ['Snippet'],
        'description': '',
        'paletteVisible': false,
        'properties': [{
            'name': 'uip-selectable',
            'type': 'boolean',
            'displayName': 'Selectable',
            'defaultValue': true,
            'category': 'Content attributes',
            'description': 'Sets whether the widget is selectable.',
            'visible': false
        }],
        'events': [],
        'supportStyle': ['position', 'left', 'top', 'background-color'],
        'outputElement': 'div'
    }];

    var types = [{
        'name': 'theme'
    }];

    return {
        path: path,
        parts: parts,
        types: types
    };
});
