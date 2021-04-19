import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Slug.module.css';
import LineChart from '../components/LineChart';

export default function Slug({ countryMonth, country }) {
    return (
        <div className={styles.container}>
        <Head>
            <title>{ country.Country }</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.banner}>
            <img src={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt="test" />
        </div>
        <div className={styles.contents}>
            <div className={styles.countryTitle}>
                <Link href="/"><a>
                    <div className={styles.backButton}>
                        <img src="./left-arrow.svg" alt="Back" />
                    </div></a></Link>
                {country.Country}
            </div>
            <div className={styles.twoContainers}>
                <div className={styles.leftContainer}>
                    <img className={styles.worldMap} src={"https://ontheworldmap.com/" + country.Slug + "/" + country.Slug + "-location-map.jpg"} alt="World Map Location" />
                    <p className={styles.countryCode}>Country Code: <span>{country.CountryCode}</span></p>
                    <div className={styles.newTotal}>
                        <div>
                            <p>New Confirmed: <span>{country.NewConfirmed}</span></p>
                            <p>New Deaths: <span>{country.NewDeaths}</span></p>
                            <p>New Recovered: <span>{country.NewRecovered}</span></p>
                        </div>
                        <div>
                            <p>Total Confirmed: <span>{country.TotalConfirmed}</span></p>
                            <p>Total Deaths: <span>{country.TotalDeaths}</span></p>
                            <p>Total Recovered: <span>{country.TotalRecovered}</span></p>
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <LineChart countryMonth={countryMonth} />
                </div>
            </div>
        </div>
        </div>
    )
}

// async function getCountries () {
//     const res = await fetch(`https://api.covid19api.com/summary`)
//     const data = await res.json()
//     const countries = await data.Countries.filter(country => country.TotalConfirmed < 5000);
//     return countries
//   }

// export const getStaticPaths = async () =>{
//     const countries = await getCountries()
//     const paths = countries.map(country => ({
//         params: {slug: `${country.Slug}`}
//     }));
//     return {
//         paths,
//         fallback: false,
//     }
// }

export async function getServerSideProps({ params }) {
    const res = await fetch(`https://api.covid19api.com/summary`)
    const data = await res.json()
    let previousMonth = new Date(data.Date.split('T')[0]);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    previousMonth = JSON.stringify(previousMonth).split('T')[0].replace('"','');
    const res1 = await fetch(`https://api.covid19api.com/country/${params.slug}/status/confirmed?from=${previousMonth}T00:00:00Z&to=${data.Date.split('T')[0]}T00:00:00Z`)
    const countryMonth = await res1.json()
    const country = await data.Countries.filter(country => country.Slug == params.slug);

  
    return {
      props: { countryMonth, country: country[0] }
    }
  }