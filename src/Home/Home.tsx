import MapView from '../Map/MapView'
import Header from '../components/Header'
import Toolbar from '../components/Toolbar'

function Home() {
  return (
    <div style={{width: "100%"}}>
      <MapView/>
      <Header/>
      <Toolbar/>
      
    </div>
  )
}

export default Home
