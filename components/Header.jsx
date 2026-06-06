import { useTheme } from '../hooks/useTheme'

const Header = () => {
  const [isDark, setIsDark] = useTheme()


  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
    <div className="header-content">
        <h2 className="title"><a href="/">Where in the world</a></h2>
        <div className="theme-changer" onClick={() => {
          setIsDark(!isDark)
          localStorage.setItem("isDarkMode", !isDark)
        }}>
            <p className="dark-theme"><i className={`fa-solid fa-${isDark ? "sun" : "moon"}`}></i>&nbsp;&nbsp;{isDark ? "Light" : "Dark"} Mode</p>
        </div>

    </div>
    </header>
  )
}

export default Header
