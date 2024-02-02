import { useQuery } from 'react-query'
import ApiHelper from '../../Helpers/Apis/ApiHelper'

function DiariesIndexView() {
	//	Variables
	const { data, isLoading, error } = useQuery(
		'diaries',
		() => ApiHelper.indexDiaries()
	)
	
	return (
		<div>
			<h1>Diaries Index</h1>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error.message}</div>}
			{!isLoading && !error && data ? JSON.stringify(data) : JSON.stringify({}
			)}
		</div>
	)
}

export default DiariesIndexView
