import attr from "ember-data/attr";
import Fragment from "ember-data-model-fragments/fragment";
import { qualitiesLivestreamer } from "models/stream/qualities/index";


const attributes = {};
for ( const { id } of qualitiesLivestreamer ) {
	attributes[ id ] = attr( "string" );
}


export default Fragment.extend( attributes );
