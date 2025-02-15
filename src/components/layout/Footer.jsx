
import { MdOutlineCopyright } from "react-icons/md";

function Footer() {
  return (
    <div className='text-light text-center'>
      <MdOutlineCopyright /> {new Date().getFullYear()} Contact Manager
    </div>
  )
}

export default Footer
