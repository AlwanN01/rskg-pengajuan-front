import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
// import ReactPDF from '@react-pdf/renderer'
// import PDF from '@/components/pdf/pdf'
export default function MyApp() {
  const createPDF = () => {
    const doc = new jsPDF()
    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
  }
  // const MyDocument = () => (
  //   <Document>
  //     <Page size='A4' style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>Section #1</Text>
  //       </View>
  //       <View style={styles.section}>
  //         <Text>Section #2</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // )
  return (
    <div>
      <button onClick={createPDF}>Create PDF</button>
    </div>
  )
}
