import { BarLoader } from "react-spinners"

const Preloader = () => {
  return (
    <div style={{width: "100%", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <BarLoader color="white" />
    </div>
  )
}

export default Preloader