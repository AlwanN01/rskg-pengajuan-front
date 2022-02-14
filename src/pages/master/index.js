import React from 'react'
import NavMaster from 'src/layout/navbar/NavMaster'

export default function Index() {
  return <></>
}

Index.getLayout = function getLayout(page) {
  return (
    <>
      <NavMaster>{page}</NavMaster>
    </>
  )
}
