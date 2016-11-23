
export function ErrorPage({ error, children }, context) {
  let title = 'Error';
  let content = 'Sorry, a critical error occurred on this page.';
  let errorMessage = null;
  if (!error) error = {}
  if (error.status === 404) {
    title = 'Page Not Found';
    content = 'Sorry, the page you were trying to view does not exist.';
  } else if (process.env.NODE_ENV !== 'production') {
    errorMessage = <pre>{error.stack}</pre>;
  }


  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      {errorMessage}
      {children}
    </div>
  );
}
export default ErrorPage;
