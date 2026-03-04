import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../main"
import { useParams } from "react-router-dom"

const AppointmentAsigned = () => {

    const [appointments, setAppointments] = useState([])
    const [status, setStatus] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getAppointment()
    }, [])

    const getAppointment = () => {
        fetch(BACKEND_URL + "api/appointments/asigned", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("sitterToken")
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("something went wrong")
                }
                return resp.json()
            })

            .then(data =>{

                setAppointments(data.appointments)}
            )
            .catch(err => console.log(err))
    }

        const handleWithdrawn = async (id) => {
            try{
            const resp = await fetch(BACKEND_URL + `api/sitter/appointment-sitter/withdrawn/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("sitterToken")
                }
                })
            if(!resp.ok){
                throw new Error("Something went wrong")
            }
            getAppointment()
        } catch(err){
            console.log(err)
        }
        }

    return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <h1 className="mb-4">Assigned Appointments</h1>
      {appointments.length === 0 ? (
        <div className="empty-state text-center py-5">
          <h5 className="mb-3">No assigned appointments</h5>
          <p className="mb-0">
            When a client selects you, it will appear here.
          </p>
        </div>
      ) : (
        <div className="row">
          {appointments.map(el => (
            <div key={el.id} className="col-12 mb-4">
              <div className="appointment-card p-4">
                <div className="row">
                  <div className="col-12 col-md-2 mb-3 mb-md-0">
                    <span className="section-label">Client</span>
                    <p className="mb-0">{el.user_name}</p>
                  </div>
                  <div className="col-12 col-md-2 mb-3 mb-md-0">
                    <span className="section-label">Date</span>
                    <p className="mb-0">{el.appointment_date}</p>
                  </div>
                  <div className="col-12 col-md-2 mb-3 mb-md-0">
                    <span className="section-label">Time</span>
                    <p className="mb-0">{el.appointment_time}</p>
                  </div>
                  <div className="col-12 col-md-2 mb-3 mb-md-0">
                    <span className="section-label">Pet</span>
                    <p className="mb-0">{el.pet_name}</p>
                  </div>
                  <div className="col-12 col-md-2 mb-3 mb-md-0">
                    <span className="section-label">Service</span>
                    <p className="mb-0">{el.service_name}</p>
                  </div>
                  <div className="col-12 col-md-2">
                    <span className="section-label">Status</span>
                    <span
                      className={`status-badge ${
                        el.status === "selected"
                          ? "badge-confirmed"
                          : el.status === "pending"
                          ? "badge-pending"
                          : el.status === "cancelled"
                          ? "badge-cancelled"
                          : "badge-completed"
                      }`}
                    >
                      {el.status}
                    </span>
                  </div>
                </div>
                <hr className="my-4" />
                <button
                  className="btn btn-danger-soft"
                  onClick={() => handleWithdrawn(el.id)}
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
export default AppointmentAsigned