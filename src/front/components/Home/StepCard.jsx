const StepCard = (props) => {
    return (
        <div className="col d-flex justify-content-center">
                <div className="card border-0" style={{ width: "20rem" }}>
                    <div className="card-body text-center">
                        <button className="btn btn-primary p-2 px-3 rounded-circle">{props.number}</button>
                        <p className="card-text fs-3">{props.title}</p>
                        <p className="card-text">{props.description}</p>
                    </div>
                </div>
            </div>
    )
}
export default StepCard