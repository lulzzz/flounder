/* globals describe, it, document, window */
import utils        from '/core/utils';
import assert       from 'assert';


/**
 * ## addClass
 *
 * on the quest to nuke jquery, a wild helper function appears
 *
 * @param {DOMElement} _el target element
 * @param {String} _class class to add
 *
 * @return {Void} void
 */
describe( 'addClass', () =>
{
    const body = document.body;

    it( 'should exist', () =>
    {
        utils.removeClass( body, [ 'brains', 'moon', 'doge' ] );
        assert.ok( utils.addClass, 'exists' );
    } );


    it( 'should add as many classes passed to it once', () =>
    {
        utils.addClass( body, [ 'moon', 'doge' ] );
        assert.equal( body.className, 'moon  doge' );

        utils.addClass( body, 'brains' );
        assert.equal( body.className, 'moon  doge  brains' );

        utils.addClass( body, 'brains' );
        assert.equal( body.className, 'moon  doge  brains' );
    } );
} );


/**
 * ## attachAttributes
 *
 * attached data attributes and others (seperately)
 *
 * @param {DOMElement} _el element to assign attributes
 * @param {Object} _elObj contains the attributes to attach
 *
 * @return {Void} void
 */
describe( 'attachAttributes', () =>
{
    const body = document.body;

    it( 'should exist', () =>
    {
        assert.ok( utils.attachAttributes, 'exists' );
    } );


    it( 'should attach data attributes', () =>
    {
        utils.attachAttributes( body, {
            'data-moon' : 'doge'
        } );
        assert.equal( body.getAttribute( 'data-moon' ), 'doge' );
    } );


    it( 'should not do anything if the object is non existant', () =>
    {
        assert.equal( utils.attachAttributes( body ), null );
    } );


    it( 'should attach properties', () =>
    {
        utils.attachAttributes( body, {
            'moon' : 'doge'
        } );
        assert.equal( body.moon, 'doge', 'adds a property' );

        utils.attachAttributes( body, {
            'data-moon' : 'moon',
            moon        : 'maymay'
        } );
        assert.ok( body.getAttribute( 'data-moon' ) === 'moon' &&
                                                    body.moon === 'maymay' );
    } );
} );


/**
 * ## constructElement
 *
 * @param {Object} _elObj object carrying properties to transfer
 *
 * @return _Element_
 */
describe( 'constructElement', () =>
{
    let newEl;

    it( 'should exist', () =>
    {
        assert.ok( utils.constructElement, 'exists' );
    } );


    it( 'should add return an element', () =>
    {
        newEl = utils.constructElement( {} );
        assert.equal( newEl.nodeType, 1, 'creates an element' );
    } );


    it( 'should add data attributes and properties where appropriate', () =>
    {
        newEl = utils.constructElement( {
            'data-moon' : 'moon',
            moon        : 'maymay'
        } );

        assert.equal( newEl.getAttribute( 'data-moon' ), 'moon' );
        assert.equal( newEl.moon, 'maymay', 'adds a property' );
    } );
} );


/**
 * ## extendClass
 *
 * extends a class from an object.  returns the original reference
 *
 * @param {Class} _extend class to be extended
 * @param {Class} objects objects to extend the class with
 *
 * @return {Class} modified class object
 */
describe( 'extendClass', () =>
{
    /**
     * example class
     */
    class Test
    {
        /**
         * example constructor
         */
        constructor()
        {
        }
    }

    it( 'should exist', () =>
    {
        assert.ok( utils.extendClass, 'exists' );
    } );


    it( 'should extend as many complex objects as passed to it', () =>
    {
        utils.extendClass( Test, {
            moon : 'doge'
        } );

        const test = new Test();
        assert.equal( test.moon, 'doge', 'extends a class with a property' );
        const func = () => 'doge';

        utils.extendClass( Test, {
            m : func
        } );
        assert.equal( test.m, func, 'extends a class with a function' );

        utils.extendClass( Test,
            {
                a : 1
            },
            {
                b : 2
            },
            {
                c : 3
            }
        );

        assert.ok( test.a === 1 && test.b === 2 && test.c === 3 );
    } );
} );


/**
 * ## escapeHTML
 *
 * Escapes HTML in order to put correct elements in the DOM
 *
 * @param {String} string unescaped string
 *
 * @return {Void} void
 */
describe( 'escapeHTML', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.escapeHTML, 'exists' );
    } );


    it( 'should properly escape html strings', () =>
    {
        const html = '<div id="qunit-fixture"></div>';

        const escaped = utils.escapeHTML( html );
        assert.equal( escaped,
                '&lt;div id=&quot;qunit-fixture&quot;&gt;&lt;/div&gt;' );
    } );
} );


/**
 * ## getElWidth
 *
 * gets the width adjusted for margins
 *
 * @param {DOMElement} el target element
 *
 * @return _Integer_ adjusted width
 */
describe( 'getElWidth', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.getElWidth, 'exists' );
    } );


    it( 'should correctly grab an element\'s width', () =>
    {
        /**
         * noop
         *
         * @return {Void} void
         */
        function noop()
        {}

        const body            = document.body;

        body.offsetWidth    = 0;
        assert.throws( utils.getElWidth.bind( utils, body ) );
        utils.getElWidth( body, noop, utils );

        body.offsetWidth    = 1000;
        const bodyWidth       = utils.getElWidth( body, noop, utils, 200 );
        const style           = window.getComputedStyle( body );

        const vanillaBodyWidth = body.offsetWidth +
                                parseInt( style[ 'margin-left' ] ) +
                                parseInt( style[ 'margin-right' ] );

        assert.equal( bodyWidth, vanillaBodyWidth );
    } );
} );


/**
 * ## hasClass
 *
 * on the quest to nuke jquery, a wild helper function appears
 *
 * @param {DOMElement} _el target element
 * @param {String} _class class to check
 *
 * @return {Void} void
 */
describe( 'hasClass', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.hasClass, 'exists' );
    } );


    it( 'should correctly detect classes', () =>
    {
        const body      = document.body;

        utils.addClass( body, 'mooney-moon' );
        let hasClassBool = utils.hasClass( body, 'mooney-moon' );
        assert.equal( hasClassBool, true, 'correctly detects present class' );

        utils.removeClass( body, 'mooney-moon' );
        hasClassBool = utils.hasClass( body, 'mooney-moon' );
        assert.equal( hasClassBool, false, 'correctly detects missing class' );
    } );
} );


/**
 * ## iosVersion
 *
 * checks and returns the ios version
 *
 * @param {Object} windowObj window, but allows for as testing override
 *
 * @return {Void} void
 */
describe( 'iosVersion', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.iosVersion, 'exists' );
    } );

    it( 'shouldn\'t register mocha tests as an ios device', () =>
    {
        assert.equal( utils.iosVersion(), false );
    } );


    it( 'should register as various ios devices with the right params', () =>
    {
        assert.equal( utils.iosVersion( {
            navigator : {
                platform : 'iPad'
            }
        } ), '5-' );
        assert.equal( utils.iosVersion( {
            indexedDB : true,
            navigator : {
                platform : 'iPad'
            }
        } ), '8+' );
        assert.equal( utils.iosVersion( {
            SpeechSynthesisUtterance    : true,
            navigator                   : {
                platform : 'iPad'
            }
        } ), '7' );
        assert.equal( utils.iosVersion( {
            webkitAudioContext  : true,
            navigator           : {
                platform : 'iPad'
            }
        } ), '6' );
    } );
} );


/**
 * ## removeAllChildren
 *
 * removes all children from a specified target
 *
 * @param {DOMElement} target target element
 *
 * @return {Void} void
 */
describe( 'removeAllChildren', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.removeAllChildren, 'exists' );
    } );


    it( 'should remove all child elements from an element passed to it', () =>
    {
        const body      = document.body;
        const testDiv   = document.createElement( 'DIV' );
        body.appendChild( testDiv );

        let div;
        for ( let i = 0, lenI = 10; i < lenI; i++ )
        {
            div = document.createElement( 'DIV' );
            testDiv.appendChild( div );
        }

        utils.removeAllChildren( testDiv );
        assert.equal( testDiv.children.length, 0, 'all children removed' );
        body.removeChild( testDiv );
    } );
} );


/**
 * ## removeClass
 *
 * on the quest to nuke jquery, a wild helper function appears
 *
 * @param {DOMElement} _el target element
 * @param {String} _class class to remove
 *
 * @return {Void} void
 */
describe( 'removeClass', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.removeClass, 'exists' );
    } );


    it( 'should remove the correct classes', () =>
    {
        window.utils    = utils;
        const body      = document.querySelector( 'body' );

        utils.addClass( body, [ 'brains', 'moon', 'doge' ] );
        utils.removeClass( body, [ 'moon', 'doge' ] );
        assert.ok( body.className.indexOf( 'moon' ) === -1 &&
                                    body.className.indexOf( 'doge' ) === -1 );

        utils.removeClass( body, 'brains' );
        assert.equal( body.className.indexOf( 'brains' ), -1 );

        utils.addClass( body, [ 'brains', 'moon', 'doge' ] );
        utils.removeClass( body, 'moon' );
        assert.equal( body.className.indexOf( 'moon' ), -1 );
    } );
} );


 /**
 * ## scrollTo
 *
 * checks if an option is visible and, if it is not, scrolls it into view
 *
 * @param {DOMElement} element element to check
 *
 * @return {Void} void
 */
describe( 'scrollTo', () =>
{
    it( 'should check the bounds and either scroll up or down', () =>
    {
        const element = {
            offsetHeight    : 10,
            offsetTop       : 150,
            parentNode      : {
                parentNode      : {
                    scrollTop       : 7,
                    offsetHeight    : 100
                }
            }
        };

        utils.scrollTo( element );
        assert.equal( element.parentNode.parentNode.scrollTop, 65 );

        element.offsetTop = 5;
        utils.scrollTo( element );
        assert.equal( element.parentNode.parentNode.scrollTop, 0 );
    } );


    it( 'should ignore everything if the element doesnt exist', () =>
    {
        const element = null;

        const res = utils.scrollTo( element );
        assert.equal( res, false );
    } );
} );



/**
 * ## setPlatform
 *
 * sets the platform to osx or not osx for the sake of the multi select key
 *
 * @param {Object} windowObj window, but allows for as testing override
 *
 * @return {Void} void
 */
describe( 'setPlatform', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.setPlatform, 'exists' );
    } );


    it( 'should be able to determine the platform conditions', () =>
    {
        assert.equal( utils.setPlatform( {
            navigator : {
                platform : 'Mac'
            }
        } ).isOsx, true );
        assert.equal( utils.setPlatform( {
            navigator : {
                platform : 'Linux'
            }
        } ).isOsx, false );
        assert.equal( utils.setPlatform( {
            navigator : {
                platform : 'Linux - iPad'
            }
        } ).isIos, '5-' );
        assert.equal( utils.setPlatform( {
            navigator : {
                platform : 'Linux - Android'
            }
        } ).isIos, false );
        assert.equal( utils.setPlatform( {
            navigator : {
                platform : 'Mac'
            }
        } ).multiSelect, 'metaKey' );
        assert.equal( utils.setPlatform( {
            navigator : {
                platform : 'Linux'
            }
        } ).multiSelect, 'ctrlKey' );
    } );
} );


/**
 * ## toggleClass
 *
 * in a world moving away from jquery, a wild helper function appears
 *
 * @param  {DOMElement} _el target to toggle class on
 * @param  {String} _class class to toggle on/off
 *
 * @return {Void} void
 */
describe( 'toggleClass', () =>
{
    it( 'should exist', () =>
    {
        assert.ok( utils.toggleClass, 'exists' );
    } );

    const select = document.querySelector( 'SELECT' );
    utils.removeClass( select, 'doge' );

    it( 'should add classes when necessary', () =>
    {
        utils.toggleClass( select, 'doge' );
        assert.equal( utils.hasClass( select, 'doge' ), true );
    } );


    it( 'should remove classes when necessary', () =>
    {
        utils.toggleClass( select, 'doge' );
        assert.equal( utils.hasClass( select, 'doge' ), false );
    } );
} );
