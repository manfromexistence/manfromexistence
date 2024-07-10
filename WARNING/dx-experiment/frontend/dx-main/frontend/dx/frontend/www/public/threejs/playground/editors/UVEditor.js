import { SelectInput, LabelElement } from 'flow';
import { BaseNodeEditor } from '../BaseNodeEditor.js';
import { uv } from 'three/nodes';

export class UVEditor extends BaseNodeEditor {

	constructor() {

		const node = uv();

		super( 'UV', node, 200 );

		this.setOutputLength( 2 );

		const optionsField = new SelectInput( [ '0', '1', '2', '3' ], 0 ).onChange( () => {

			node.index = Number( optionsField.getValue() );

			this.invalidate();

		} );

		this.add( new LabelElement( 'Channel' ).add( optionsField ) );

	}

}
