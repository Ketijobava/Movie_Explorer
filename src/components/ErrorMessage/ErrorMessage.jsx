import { FaExclamationTriangle } from 'react-icons/fa';
import './ErrorMessage.scss';

const ErrorMessage = ({ message, onRetry, retryLabel = 'Retry' }) => (
  <div className="error-message">
    <FaExclamationTriangle className="error-message__icon" />
    <p>{message}</p>
    {onRetry && (
      <button className="btn btn--primary" onClick={onRetry}>
        {retryLabel}
      </button>
    )}
  </div>
);

export default ErrorMessage;
