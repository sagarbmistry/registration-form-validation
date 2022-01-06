const ErrorSpan = (isError, type) => {
    return (
        !isError[type].status ?
            <span className="invalid">{isError[type].message}</span> :
            <span className="invalid success">{isError[type].message}</span>
    )
}

export default ErrorSpan;