import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ data, countries }) {
  console.log(countries);
  return (
    <div className={styles.container}>
      <Head>
        <title>Coronavirus Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.headersInfo}>
        <p>Latest Update: {data.Date.split('T')[0]}</p>
        <p>Countries Currently Less Than 5000 Confirmed Infections: {countries.length}</p>
      </div>
      <p className={styles.headersTitle}>Countries with Lowest Confirmed Infections</p>
      <div className={styles.countriesPassed}>
        {countries.map(country =>{
          return(
          <div key={country.ID} className={styles.countryItem}>
            <img src={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt="test" />
            <p className={styles.countryTitle}>{country.Country} ({country.CountryCode})</p>
            <div className={styles.countryInfo}>
              <span className={styles.textInfo}>Confirmed <span className={styles.numbersInfo}>{country.TotalConfirmed}</span></span>
              <span className={styles.textInfo}>Deaths <span className={styles.numbersInfo}>{country.TotalDeaths}</span></span>
              <span className={styles.textInfo}>Recovered <span className={styles.numbersInfo}>{country.TotalRecovered}</span></span>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  )
}

async function getCountries () {
  const res = await fetch(`https://api.covid19api.com/summary`)
  const data2 = await res.json()
  const countries = await data2.Countries.filter(country => country.TotalConfirmed < 5000);
  return countries
}

// async function getCountry (countries) {
//   const country = await Promise.all(
//     countries.map(async (item) => {
//       const res1 = await fetch(`https://api.covid19api.com/total/country/${item.CountryCode}/status/confirmed?from=2021-03-01T00:00:00Z&to=2021-04-01T00:00:00Z`)
//       const total = await res1.json()
//       return total
//     })
//   )
//   return country
// }

export async function getStaticProps(context) {
  const res3 = await fetch(`https://api.covid19api.com/summary`)
  const data = await res3.json()
  const countries = await getCountries()
  countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1)
  // const country = await getCountry(countries) 

  return {
    props: { data, countries }
  }
}