import React from 'react'
import { DataProvide } from './hook/DataProvider'
import { ClimateTime } from './components/ClimateTime'
import Modal from './components/Modal'



function App() {

  return (

    <DataProvide>
      <div className="min-h-screen flex flex-col md:flex-row bg-[#100E1D] text-white ">
        <Modal/>
        <ClimateTime/>
       
      </div>
      
    </DataProvide>


  )
}

export default App
