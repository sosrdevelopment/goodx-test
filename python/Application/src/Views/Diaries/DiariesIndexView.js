import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ApiHelper from '../../Helpers/Apis/ApiHelper'
import ResponsiveLoadingCard from '../../Components/Cards/ResponsiveLoadingCard'
import Card from '../../Components/Cards/Card'

function DiariesIndexView() {
	//	Variables
	const navigate = useNavigate()

	//	Queries
	const { data, isLoading, error } = useQuery('diaries', () => ApiHelper.indexDiaries())

	//	Response
	if (error) return null
	if (isLoading)
		return (
			<div className='m-auto'>
				<ResponsiveLoadingCard
					title='Loading Diaries. Please wait...'
					noBackground={true}
				/>
			</div>
		)
	return (
		<div className='w-full space-y-5'>
			<p className='text-lg font-medium'>Diaries</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-4'>
				{data.data.map((diary) => {
					return (
						<div key={diary.uid} onClick={() => navigate('/diaries/' + diary.uid)}>
							<Card
								outerClass='mb-auto cursor-pointer rounded-lg shadow-lg border hover:border-teal-300'
								innerClass='space-y-1'
							>
								<p className='text-lg font-bold text-center pb-1'>{diary.name}</p>
								{diary.description ? (
									<div className='flex space-x-3'>
										<label className='text-sm'>Description</label>
										<p className='text-sm'>{diary.description}</p>
									</div>
								) : null}
								{diary.service_center_uid ? (
									<div className='flex space-x-3'>
										<label className='text-sm'>Service Center</label>
										<p className='text-sm'>{diary.service_center_uid}</p>
									</div>
								) : null}
								{diary.treating_doctor_uid ? (
									<div className='flex space-x-3'>
										<label className='text-sm'>Treating Doctor</label>
										<p className='text-sm'>{diary.treating_doctor_uid}</p>
									</div>
								) : null}
							</Card>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default DiariesIndexView
