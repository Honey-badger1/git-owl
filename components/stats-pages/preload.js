const gimmeStat = require('../../backend/gimme-stat');

const data = async (pathRepo, since, until) => {

	return await gimmeStat.json({
		cwd: pathRepo,
		since: since,
		until: until,
		prepull: false
	}).then((answer) => {
		return answer.json;
	})
}

exports.data = data;