function Error() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary mt-3">Go Home</a>
    </div>
  );
}

export default Error;
