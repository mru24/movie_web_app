import Search from './Search';
import './Header.css'

const Header = () => {
  return (
    <header>
      <img src="./assets/images/hero.png" alt="Hero Image"  />
      <h1>Find your <span className='text-gradient'>favourite</span> movies.</h1>
      <Search />
    </header>
  )
}

export default Header;