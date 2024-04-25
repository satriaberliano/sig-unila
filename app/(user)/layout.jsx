import Footer from '@/components/LandingPage/Footer/Footer'
import Navbar from '@/components/LandingPage/Navbar/Navbar'
import PrivateRoute from '@/components/PrivateRoute'

const UserLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <Navbar />
        { children }
      <Footer />
    </PrivateRoute>
  )
}

export default UserLayout