const ErrorPage = () => {
  return (
    <div className="flex justify-center p-10">
      <div className="w-1/2 justify-center" role="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Error</div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>404 Page not found.</p>
        </div>
        <div className="mt-5">
          <a className="text-blue-800 underline" href="/dashboard">Back to Home</a>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
