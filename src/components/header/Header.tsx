import './Header.scss';
import announcement from "../../assets/images/announcement.png";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="">
                <Link to="/">
                    <img src={announcement} className="announcement" />
                </Link>
            </div>
        </header>
    );
};

export default Header;