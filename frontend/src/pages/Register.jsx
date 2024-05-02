import { Fragment } from "react"
import Form from "../components/Form"

function Register() {
  return <Form route="api/user/register/" method="register" /> // using the Form component
}

export default Register