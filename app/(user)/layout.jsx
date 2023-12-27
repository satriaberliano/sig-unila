import Footer from '@/components/LandingPage/Footer/Footer'
import Navbar from '@/components/LandingPage/Navbar/Navbar'

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
        { children }
      <Footer />
    </>
  )
}

export default UserLayout