import React from 'react'

export default function DocByCity({cityName}) {
  return (
    <div>
      <h2>Doc by city</h2>
      <h4>{cityName}</h4>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context;
  const {cityName} = params;

  // Pass data to the page via props
  return {
    props: {
      cityName
    }
  }
}