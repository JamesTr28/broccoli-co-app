import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import './App.css';

function App() {
  return (
    <div className="App d-flex flex-column">
      <Header title="Broccoli & Co." />
      <Main title="A better way to enjoy every day"
            content="Be the first to know when we launch"
            buttonTitle="Request an invite"
      />
      <Footer note="Made in Melbourne" />
    </div>
  );
}

export default App;
