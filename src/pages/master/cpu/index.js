import React from 'react'
import NavMaster from 'src/layout/navbar/NavMaster'
export default function index() {
  return <div>awtess</div>
}

index.getLayout = function getLayout(page) {
  return (
    <>
      <NavMaster>{page}</NavMaster>
    </>
  )
}