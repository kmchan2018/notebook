

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as lunr from 'lunr';


interface Note {
	url: string;
	title: string;
}

interface Notes {
	[ url: string ]: Note;
}


//
// Item implements a React component for showing a single note.
//

interface ItemProps extends Note {
	// nothing else here atm
}

function Item(props: ItemProps) {
	return <a className="list-group-item list-group-item-action flex-column align-items-start" href={props.url}>
		{props.title}
	</a>;
}


//
// List implements a React component for showing a list of notes.
//

interface ListProps {
	notes: Note[];
}

function List(props: ListProps) {
	return <div className="list-group list-group-flush">
		{
			props.notes.map(function(note: Note) {
				return <Item key={note.url} {...note} />;
			})
		}
	</div>;
};


//
// Empty implements a React component for showing empty prompt.
//

interface EmptyProps {
}

function Empty(props: EmptyProps) {
	return <div className="empty">
		<span className="message">Nothing can be found that matches the given query.</span>
	</div>;
};


//
// Result implements a React component for showing a list of notes.
// matching the given query.
//

interface ResultProps {
	notes: Notes;
	index: lunr.Index;
	query: string;
}

function Result(props: ResultProps) {
	const matches = props.index.search(props.query);
	const notes = matches.map((match) => props.notes[match.ref]);

	if (notes.length > 0) {
		return <List notes={notes} />;
	} else {
		return <Empty />;
	}
};


//
// Browser implements a React component for showing the search result.
//

interface BrowserProps {
	notes: Notes;
	index: any;
}

interface BrowserState {
	index: lunr.Index;
	query: string;
}

class Browser extends React.PureComponent<BrowserProps, BrowserState> {
	constructor(props: BrowserProps) {
		super(props);
		this.state = { index: lunr.Index.load(props.index), query: '' };
	}

	render() {
		const notes = this.props.notes;
		const index = this.state.index;
		const query = this.state.query;
		return <Result notes={notes} index={index} query={query} />;
	}
}


//
// Default exports.
//

export { Browser as default };


