import PrivateRoute from "@/components/PrivateRoute";

const LayoutAuth = ({children}) => {
  return(
    <PrivateRoute>
      <div className='h-screen px-10 py-20 bg-gradient-to-br from-[#0F6EE3] to-[#dacbcb] flex justify-center items-center'>
        {children}
      </div>
    </PrivateRoute>
  )
}

export default LayoutAuth;