const CountryFilter = ({search, handleSearch}) => {
  return (
    <div>
      find countries <input value={search} onChange={event => handleSearch(event)} />
    </div>
  )
}

export default CountryFilter