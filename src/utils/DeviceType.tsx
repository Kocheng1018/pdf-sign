import { useEffect, useState } from "react"

const DeviceType = () => {
  const [device, setDevice] = useState("lg")

  const handleDevice = () => {
    if(window.innerWidth <= 768) {
      setDevice("xs")
    }else if(window.innerWidth <= 1440) {
      setDevice("sm")
    }else if(window.innerWidth < 1920) {
      setDevice("md")
    }else {
      setDevice("lg")
    }

  }

  useEffect(() => {
    window.addEventListener("resize", handleDevice)
    return (() => {
      window.removeEventListener("resize", handleDevice)
    })
  }, [])

  return device
}
export default DeviceType
