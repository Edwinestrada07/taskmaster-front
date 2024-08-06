// themeDark.js
export function ThemeDarkMode() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setTheme = (isDarkMode) => {
      document.documentElement.classList.toggle('dark', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };
  
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'dark');
    } else {
      setTheme(darkModeMediaQuery.matches);
    }
  
    darkModeMediaQuery.addEventListener('change', (e) => {
      setTheme(e.matches);
    });
  }
  
  export function toggleTheme() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setTheme(!isDarkMode);
  }
  
  function setTheme(isDarkMode) {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
  
  
  
  