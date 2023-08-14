import LoadingImg from '../img/loading.png';
import '../css/Loading.css';

export default function Loading({ children, isLoading, loadingError }) {
	if (!loadingError) return (
		<>
			{children}
			<div className={`loading ${!isLoading && 'hidden'}`}>
				<img src={LoadingImg} alt="loading" />
			</div>
		</>
	);
	else return (
		<div className="error">
			{loadingError}
		</div>
	);
}