import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      실행완료
      
      <div className="nav-btn">
        <button>
          <Link to="/"> HOME </Link>
        </button>
        <button>
          <Link to="/about"> ABOUT </Link>
        </button>
        <button>
          <Link to="/products"> PRODUCTS </Link>
        </button>
      </div>

      <Routes>
  <Route path="/" element={<Home />}></Route>
  <Route path="/about/*" element={<About />}></Route>
  <Route path="/products" element={<Products />}></Route>
</Routes>
    
    </div>
  );
}

export default App;
