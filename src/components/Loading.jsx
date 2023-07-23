import LoadingImg from '../img/loading.png';
import '../css/Loading.css';

export default function Loading({ children, isLoading }) {
	return (
		<>
			{children}
			<div className={`loading ${!isLoading && 'hidden'}`}>
				<img src={LoadingImg} alt="loading" />
			</div>
		</>
	);
}