import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  let title = "Something went wrong.";
  let message = "An unexpected error occurred.";

  // Check if the error is from React Router
  if (isRouteErrorResponse(error)) {
    title = `${error.status} - ${error.statusText}`;
    message = error.data || message;
  } else if (error instanceof Error) {
    // Handle JavaScript errors
    message = error.message;
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Oops!!</h1>
      <h2 style={{fontSize:"5rem"}}>🐒</h2>
      <h2>Please enter correct path</h2>
      <h3>{message}</h3>
      <h3>{title}</h3>
      <br />
      <button className="btn" onClick={() => navigate("/")}>
        ⏮️ Back to Home
      </button>
    </div>
  );
}

export default Error;
