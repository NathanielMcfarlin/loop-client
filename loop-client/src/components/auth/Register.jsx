import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "/home/nathanielmcfarlin/workspace/loop-client/loop-client/src/managers/AuthManager.js"

export const Register = ({ setToken }) => {
  const [isStaff, setIsStaff] = useState(false);
  const firstName = useRef()
  const lastName = useRef()
  const username = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        password: password.current.value,
        is_staff: isStaff
      }

      registerUser(newUser)
        .then(res => {
          if ("token" in res && res.token) {
            setToken(res.token)
            navigate("/")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  const handleStaffChange = (e) => {
    setIsStaff(e.target.checked); // Update isStaff state based on checkbox value
  };

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleRegister}>
        <h1 className="title">In The Loop</h1>
        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>



        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>




        <div className="field">
          <label className="checkbox">
            <input
              type="checkbox"
              onChange={handleStaffChange}
              checked={isStaff} // Use the isStaff state for checkbox status
            />
            Are you staff?
          </label>
        </div>


        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>

      </form>
    </section>
  )
}
