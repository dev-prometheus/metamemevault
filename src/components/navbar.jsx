import { useEffect, useState } from "react";
import { Loader2, Menu, X, MessageCircle, Wallet, ChevronDown, Globe } from "lucide-react";
import { mmv_logo_colored } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../metawalletprovider";
import "../styles/navbar.css";
import { TELEGRAM_LINK, TWITTER_LINK } from "../config/social_helpers";

const XIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
}

const PageNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const location = useLocation();
  const { isConnected, address, open, connectionStatus } = useWallet();

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname === path) return true;
    return false;
  };

  const ethAddress = formatAddress(address);

  // HARDCODED ENGLISH - Matches translation.json exactly
  const navLinks = [
    { path: "/giveaway", label: "Giveaway" },
    { path: "/memetreasury", label: "MemeTreasury" },
    { path: "/how-to-buy", label: "How to Buy" },
    { path: "/referral", label: "Referral" },
    { path: "/whitepaper", label: "Whitepaper" },
  ];

  // Language options (COSMETIC ONLY - does not change content)
  const languages = [
    { code: "EN", name: "English", flag: "🇬🇧" }, 
    { code: "ZH", name: "中文", flag: "🇨🇳" },
    { code: "RU", name: "Русский", flag: "🇷🇺" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "KR", name: "한국어", flag: "🇰🇷" },
    { code: "JP", name: "日本語", flag: "🇯🇵" },
    { code: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "TR", name: "Türkçe", flag: "🇹🇷" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "PT", name: "Português", flag: "🇧🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" }
  ];

  // COSMETIC ONLY - Just updates display, no actual translation
  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    setShowLangDropdown(false);
    // Note: This is visual only. Site remains in English.
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [isMenuOpen]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showLangDropdown && !e.target.closest('.language-selector')) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLangDropdown]);

  return (
    <>
      <nav className={`navbar-enhanced ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container-enhanced">
          {/* Logo Section */}
          <Link to="/" className="navbar-logo-enhanced">
            <div className="logo-wrapper">
              <div className="logo-glow"></div> 
              <img
                src={mmv_logo_colored}
                alt="MetaMemeVault Logo"
                className="logo-img-enhanced"
              />
            </div>
            <span className="navbar-title-enhanced">
              Meta<span className="title-highlight">Meme</span>Vault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions-desktop">
            {/* Language Selector (COSMETIC ONLY) */}
            <div className="language-selector">
              <button
                className="language-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLangDropdown(!showLangDropdown);
                }}
                aria-label="Select Language">
                <Globe size={18} />
                <span>{currentLang}</span>
                <ChevronDown size={14} className={showLangDropdown ? "rotate-180" : ""} />
              </button>

              {showLangDropdown && (
                <div className="language-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option ${currentLang === lang.code ? "active" : ""}`}
                      onClick={() => handleLanguageChange(lang.code)}>
                      <span className="lang-flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
                      {currentLang === lang.code && (
                        <span className="lang-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Connect Wallet Button */}
            <button
              type="button"
              onClick={() => open()}
              className="connect-wallet-enhanced">
              <div className="wallet-button-content">
                {isConnected ? (
                  <>
                    <div className="wallet-connected-dot"></div>
                    <span>{ethAddress}</span>
                    <ChevronDown size={16} />
                  </>
                ) : connectionStatus === "connecting" ? (
                  <>
                    <Loader2 className="spin-icon" size={18} />
                    <span>Connecting</span>
                  </>
                ) : (
                  <>
                    <Wallet size={18} />
                    <span>Connect Wallet</span>
                  </>
                )}
              </div>
              <div className="wallet-button-glow"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}>
            <span className="menu-icon-wrapper">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-content">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}>
                <span>
                  {link.label}
                  {link.badge && <span className="nav-badge-mobile">{link.badge}</span>}
                </span>
                <div className="mobile-link-underline"></div>
              </Link>
            ))}

            {/* Quick Links Section */}
            <div className="mobile-quick-links">
              <span className="quick-links-title">Quick Links</span>
              <div className="quick-links-grid">
                <Link
                  to="/#roadmap"
                  className="quick-link-btn"
                  onClick={() => setIsMenuOpen(false)}>
                  Roadmap
                </Link>
                <Link
                  to="/#tokenomics"
                  className="quick-link-btn"
                  onClick={() => setIsMenuOpen(false)}>
                  Tokenomics
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="mobile-menu-footer">
              {/* Language Selector Mobile (COSMETIC ONLY) */}
              <div className="mobile-language-selector">
                <Globe size={16} />
                <select
                  value={currentLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="mobile-language-select">
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Social Icons */}
              <div className="mobile-social-icons">
                <a
                  href={TWITTER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-icon">
                  <XIcon size={20} />
                </a>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-icon">
                  <MessageCircle size={20} />
                </a>
              </div>

              {/* Mobile Wallet Button */}
              <button
                type="button"
                onClick={() => {
                  open();
                  setIsMenuOpen(false);
                }}
                className="mobile-wallet-button">
                {isConnected ? (
                  <>
                    <div className="wallet-connected-dot"></div>
                    <span>{ethAddress}</span>
                  </>
                ) : connectionStatus === "connecting" ? (
                  <>
                    <Loader2 className="spin-icon" size={18} />
                    <span>Connecting</span>
                  </>
                ) : (
                  <>
                    <Wallet size={18} />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PageNavbar;