

import * as React from 'react';


//
// Search implements a React component for editing and submitting search
// queries.
//

interface SearchProps {
	callback?: (query: string) => void;
}

interface SearchState {
	query: string;
}

class Search extends React.PureComponent<SearchProps, SearchState> {
	constructor(props: SearchProps) {
		super(props);
		this.state = { 'query': '' } as SearchState;
		this.composing = false;
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		const query = this.state.query;
		const callback = this.props.callback;
		const handleChange = this.handleChange;
		const handleSubmit = this.handleSubmit.bind(this, query, callback);

		return <form onSubmit={handleSubmit}>
			<input type="text" name="query" value={query} placeholder="Enter the Query" title="" autocomplete="off" onChange={handleChange} />
			<button type="submit" title="Search"><span class="fa fa-search" aria-hidden="true"></span></button>
		</form>;
	}

	handleChange(e: React.MouseEvent<HTMLInputElement>) {
		this.setState({ 'query': e.target.value });
	}

	handleSubmit(query: string, callback?: (query: string) => void, e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		if (callback) {
			callback(query);
		}
	}
}


//
// Default exports.
//

export { Search as default };


