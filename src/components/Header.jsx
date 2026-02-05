import Search from './Search';
import './Header.css'

const Header = ({searchTerm,setSearchTerm}) => {
  return (
    <header>
      <img src="./assets/images/hero.png" alt="Hero Image"  />
      <h1>Find your <span className='text-gradient'>favourite</span> movies.</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </header>
  )
}

export default Header;