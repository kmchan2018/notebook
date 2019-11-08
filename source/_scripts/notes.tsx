

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as lunr from 'lunr';


interface Note {
	url: string;
	title: string;
}

interface NoteMap {
	[ url: string ]: Note;
}


//
// Convert a list of notes into a map of notes indexed by its URL.
//

function mapify(list: Array<Note>): NoteMap {
	let map = {} as NoteMap;
	list.forEach((item) => { map[item.url] = item; });
	return map;
}


//
// React component for a single note in the list.
//

interface NoteItemProps extends Note {
	// nothing else here atm
}

function NoteItem(props: NoteItemProps) {
	return <a className="list-group-item list-group-item-action flex-column align-items-start" href={props.url}>
		{props.title}
	</a>;
}


//
// React component for the filtered note list.
//

interface NoteListProps {
	notes: NoteMap;
	index: lunr.Index;
	query: string;
}

function NoteList(props: NoteListProps) {
	const matches = props.index.search(props.query);
	const results = matches.map((match) => props.notes[match.ref]);
	
	return <div className="list-group list-group-flush">
		{
			results.map(function(result: Note) {
				return <NoteItem key={result.url} url={result.url} title={result.title} />;
			})
		}
	</div>;
};


//
// React component for the whole application.
//

interface ApplicationProps {
	notes: NoteMap;
	index: lunr.Index;
}

interface ApplicationState {
	query: string;
}

class Application extends React.Component<ApplicationProps, ApplicationState> {
	constructor(props: ApplicationProps) {
		super(props);
		this.state = { 'query': '' } as ApplicationState;
	}

	render() {
		const notes = this.props.notes;
		const index = this.props.index;
		const query = this.state.query;
		return <NoteList notes={notes} index={index} query={query} />;
	}
}


//
// Application component factory.
//

interface Data {
	notes: Note[];
	index: any;
}

export default function(data: Data) {
	const notes = mapify(data.notes);
	const index = lunr.Index.load(data.index);
	return <Application notes={notes} index={index} />;
}


