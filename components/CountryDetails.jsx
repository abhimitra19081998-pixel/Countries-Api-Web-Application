import React, {useEffect, useState } from "react";
import "./CountryDetails.css";
import { Link, useLocation,useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailsShimmer";

export default function CountryDetails() {
  const params = useParams();
  const {state} = useLocation()
  const [isDark] = useTheme()
  console.log(state);
  const countryName = params.country;

  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  function updateCountryData(data){
    setCountryData({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName || {})[0]?.common,
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital,
          tld: data.tld,
          currencies: Object.values(data.currencies || {})
            .map((currency) => currency.name)
            .join(", "),
          languages: Object.values(data.languages || {}).join(", "),
          flags: data.flags.svg,
          borders: [],
        });

        Promise.all(
          (data.borders || []).map((border) =>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([borderCountry]) => borderCountry.name.common)
          )
        ).then((borders) => {
          setCountryData((prevState) => ({
            ...prevState,
            borders,
          }));
        })
  }

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        console.log(data);
          updateCountryData(data)
  })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return (
      <div>
        <h1>
          <b>Country Not Found Please Enter a Valid Country Name</b>
        </h1>
      </div>
    );
  }

  return countryData === null ? (
    <CountryDetailShimmer/>
  ) : (
    <main className={`${isDark ? "dark" : "" }`}>
      <div className="country-details-container">
        <span
          href="#"
          className="back-btn"
          onClick={() => history.back()}
        >
          <i className="fa-solid fa-arrow-left"></i>
          &nbsp;&nbsp;Back
        </span>

        <div className="country-details">
          <img src={countryData.flags} alt="" />

          <div className="details-text-container">
            <h1>{countryData.name}</h1>

            <div className="details-text">
              <p>
                <b>Native Name : {countryData.nativeName || countryData.name}</b>
                <span className="native-name"></span>
              </p>

              <p>
                <b>
                  Population :{" "}
                  {countryData.population?.toLocaleString("en-IN")}
                </b>
                <span className="population"></span>
              </p>

              <p>
                <b>Region : {countryData.region}</b>
                <span className="region"></span>
              </p>

              <p>
                <b>Sub Region : {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>

              <p>
                <b>Capital : {countryData.capital?.join(", ")}</b>
                <span className="capital"></span>
              </p>

              <p>
                <b>Top Level Domain : {countryData.tld}</b>
                <span className="domain"></span>
              </p>

              <p>
                <b>Currency : {countryData.currencies}</b>
                <span className="currency"></span>
              </p>

              <p>
                <b>Languages : {countryData.languages}</b>
                <span className="language"></span>
              </p>
            </div>

            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;

                {countryData.borders.map((border) => (
                  <Link key={border} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}