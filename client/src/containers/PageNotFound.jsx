import React from "react"

const PageNotFound = (props) => (
  <>
    <h1>404 PAGE NOT FOUND</h1>
    <p>Uy, llegaste a un mundo desconocido. Mejor regresa al inicio.</p>
    <button onClick={props.toggle}>TOGGLE</button>
  </>
)
export default PageNotFound