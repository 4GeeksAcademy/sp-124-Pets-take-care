import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../main"

const AppointmentList = () => {

    const [appointments, setAppointments] = useState([])
    useEffect(() => {
        getAppointment()
    }, [])

    const getAppointment = () => {
        fetch(BACKEND_URL + "api/sitter/appointments/false", {
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
                setAppointments(data.appointments || [])
            }
            )
            .catch(err => setAppointments([]))
    }

    const handlePostulate = async (appointmentId) => {
        try{
            const resp = await fetch(BACKEND_URL + "api/sitter/appointment-sitter/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("sitterToken")
                },
                body: JSON.stringify({
                    appointment_id: appointmentId
                })
            })
            if(!resp.ok){
                throw new Error("Something went wrong while postulating")
            }
            getAppointment()
        } catch(err){
            console.log(err)
        }
    }



    return (
  <div className="container my-5">
    <div className="appointments-section p-4 p-md-5">
      <h1 className="mb-4">Looking for Appointments</h1>
      {appointments.length === 0 ? (
        <div className="empty-state text-center py-5">
          <h5 className="mb-3">No appointments available</h5>
          <p className="mb-0">Check back later for new opportunities.</p>
        </div>
      ) : (
        <div className="row">
          {appointments.map(el => (
            <div key={el.id} className="col-12 mb-4">
              <div className="appointment-card p-4">
                <div className="row">
                  <div className="col-12 col-md-3 mb-3 mb-md-0">
                    <span className="section-label">Client</span>
                    <p className="mb-0">{el.user_name}</p>
                  </div>
                  <div className="col-12 col-md-3 mb-3 mb-md-0">
                    <span className="section-label">When</span>
                    <p className="mb-0">
                      {el.appointment_date} · {el.appointment_time}
                    </p>
                  </div>
                  <div className="col-12 col-md-3 mb-3 mb-md-0">
                    <span className="section-label">Pet</span>
                    <p className="mb-0">{el.pet_name}</p>
                  </div>
                  <div className="col-12 col-md-3">
                    <span className="section-label">Service</span>
                    <p className="mb-0">{el.service_name}</p>
                  </div>
                </div>
                <hr className="my-4" />
                <button
                  className="btn btn-warm w-100 w-md-auto"
                  onClick={() => handlePostulate(el.id)}
                >
                  Apply
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
export default AppointmentList