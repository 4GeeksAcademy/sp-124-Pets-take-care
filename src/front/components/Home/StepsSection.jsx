import StepCard from "./StepCard"

const StepsSection = () => {
    return (
        <div className="container mt-5">
        <div className="row">
            <StepCard title="Post what you need" description="Describe the service (walking, bathing, in-home care), the date, and details about your pet." number="1" />
            <StepCard title="Receive applications" description="Interested caregivers apply and send you their proposals." number="2" />
            <StepCard title="Choose the best match" description="Review profiles and ratings, and accept the caregiver you trust most." number="3" />
        </div>
        </div>
    )
}
export default StepsSection