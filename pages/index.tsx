import { Provider } from "react-redux";
import { store } from "@/app/store";
import BooksApp from "@/features/books/BooksApp";
import Nav from "@/features/navMenu/Nav";
import { GetStaticProps } from "next";

function Home() {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <div className="App-content">
          <BooksApp />
        </div>
      </div>
    </Provider>
  );
}

export const getStaticProps:GetStaticProps = async (context) => {
  return {
    props: {
      messages: (await import(`../public/locales/${context.locale}/translation.json`)).default,
    }
  }
}

export default Home;
