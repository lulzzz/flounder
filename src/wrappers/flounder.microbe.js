/* global µ */
import Flounder from '../core/flounder';

( function( µ )
{

    µ.core.flounder = function( options )
    {
        let flounderDestroy = Flounder.prototype.destroy;

        this.each( function( el )
        {
            let f                       = new Flounder( el, options );
            el.data                     = el.data || {};
            el.data.flounder            = el.data.flounder || {};
            el.data.flounder.flounder   = f;

            f.destroy                  = function()
            {
                el.data.flounder.flounder = false;
                flounderDestroy.call( f );
            };
        } );

        return this;
    };
}( µ ) );
