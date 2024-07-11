import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import WalletWiseLogo from '/my-wallet-logo-3.svg'

const Header = ({ toggleProfile, username }) => {
    return (
        <div className="flex flex-row items-center justify-around p-4 bg-gray-100 pt-8">
            <div className="items-center justify-start">
                <img 
                    src={WalletWiseLogo}
                    alt="My Wallet Logo"
                    className="w-9 h-9 lg:w-11 lg:h-11"
                />
            </div>
            <div className="items-center justify-center">
                <h1 className="text-purple-800 font-bold text-2xl md:text-3xl lg:text-4xl">
                    Olá, {username || 'Usuário'}
                </h1>
            </div>
            <div className="items-center justify-center cursor-pointer" onClick={toggleProfile}>
                <FontAwesomeIcon
                    icon={faUserCircle} 
                    className="text-purple-600 w-9 h-9 lg:w-11 lg:h-11" 
                />
            </div>
        </div>
    );
}

Header.propTypes = {
    toggleProfile: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired, 
};

export default Header;
