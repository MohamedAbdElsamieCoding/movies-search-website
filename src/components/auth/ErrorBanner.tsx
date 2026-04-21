interface ErrorProps {
  message: string;
}

const ErrorBanner = ({ message }: ErrorProps) => {
  return (
    <div className="error_banner">
      <p>{message}</p>
    </div>
  );
};

export default ErrorBanner;
