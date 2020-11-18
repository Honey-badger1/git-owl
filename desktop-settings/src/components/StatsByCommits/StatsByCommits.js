import React, { useState } from 'react';

function StatsByCommits(props) {
	const [inputValue, setValue] = useState('');
	const [searchHeandler, setSearchHeandler] = useState(false);
	const [sortedArray, setArray] = useState([]);
	const stats = JSON.parse(props.stats)[2];
	
	function searchCommits(e) {
		const arr = [];
		stats.map(item => {
			if (item.commit.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
				arr.push(item);
			}
		});
		setSearchHeandler(true);
		setArray(arr);
		console.log(arr)
		e.preventDefault();
	}

    return (
		stats?<>
			<form id="searchComment" onSubmit={(e) => searchCommits(e)}>
				<input type="search" name='commits' placeholder="Search comment" onChange={(e) => setValue(e.target['value'])}/>
				<button type="submit"><i className="fa fa-search" aria-hidden="true" onClick={(e) => searchCommits(e)}></i></button>
			</form>
			{searchHeandler?<table>
				{sortedArray.length?
					<tr> 
						<th>Author</th>
						<th>Comment</th>
						<th>Date</th>
					</tr>:
					<p>No Results Found</p>}
				{sortedArray.map((item, index) =>
					<tr key={index}>
						<td>{item.name}</td>
						<td>{item.commit}</td>
						<td>{item.day}</td>
					</tr>
				)}
			</table>:null}
		</>:<p>No Results Found</p>
	);
}

export default StatsByCommits;