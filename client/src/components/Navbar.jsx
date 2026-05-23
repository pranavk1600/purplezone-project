import { Link } from 'react-router-dom';
import logo from '../assets/Purplezonewt 1.png';

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center px-12">
        
        <Link to="/dashboard">
          <img
            src={logo}
            alt="PurpleZone"
            className="h-10 w-auto object-contain"
          />
        </Link>

      </div>
    </header>
  );
};

export default Navbar;