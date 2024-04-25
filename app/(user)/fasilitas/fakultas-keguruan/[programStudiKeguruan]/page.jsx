import React from 'react'

export default function DetailFacilityPage({ params }) {
  return (
    <div className='py-32'>
      Halaman :  {params.programStudiKeguruan}
      {/* {console.log(params)} */}
    </div>
  )
}
