import React from 'react'

export default function Slug({ countryMonth, country }) {
    console.log(countryMonth)
    console.log(country)
    return (
        <div>
            Test.
        </div>
    )
}

async function getCountries () {
    const res = await fetch(`https://api.covid19api.com/summary`)
    const data2 = await res.json()
    const countries = await data2.Countries.filter(country => country.TotalConfirmed < 5000);
    return countries
  }

export const getStaticPaths = async () =>{
    const countries = await getCountries()
    const paths = countries.map(country => ({
        params: {slug: `${country.Slug}`}
    }));
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const res1 = await fetch(`https://api.covid19api.com/total/country/${params.slug}/status/confirmed?from=2021-03-01T00:00:00Z&to=2021-04-01T00:00:00Z`)
    const countryMonth = await res1.json()
    const res = await fetch(`https://api.covid19api.com/summary`)
    const data2 = await res.json()
    const country = await data2.Countries.filter(country => country.Slug == params.slug);

  
    return {
      props: { countryMonth, country: country[0] }
    }
  }