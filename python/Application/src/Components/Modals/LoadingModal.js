import ModalCard from '../Cards/ModalCard'
import ResponsiveLoadingCard from '../Cards/ResponsiveLoadingCard'
import Modal from './Modal'

function LoadingModal({ title, isVisible, setIsVisible }) {
	return (
		<Modal isVisible={isVisible} setIsVisible={setIsVisible}>
			<ModalCard outerClass='m-auto border'>
				<ResponsiveLoadingCard title={title} noBackground={true} />
			</ModalCard>
		</Modal>
	)
}

export default LoadingModal
