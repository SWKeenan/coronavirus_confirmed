import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

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
          <Link href={"/" + country.Slug}><a>
          <div key={country.ID} className={styles.countryItem}>
            <img src={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt="test" />
            <p className={styles.countryTitle}>{country.Country} ({country.CountryCode})</p>
            <div className={styles.countryInfo}>
              <span className={styles.textInfo}>Confirmed <span className={styles.numbersInfo}>{country.TotalConfirmed}</span></span>
              <span className={styles.textInfo}>Deaths <span className={styles.numbersInfo}>{country.TotalDeaths}</span></span>
              <span className={styles.textInfo}>Recovered <span className={styles.numbersInfo}>{country.TotalRecovered}</span></span>
            </div>
          </div>
          </a></Link>
        )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const res3 = await fetch(`https://api.covid19api.com/summary`)
  const data = await res3.json()
  const countries = await data.Countries.filter(country => country.TotalConfirmed < 5000);
  countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1)

  return {
    props: { data, countries }
  }
}