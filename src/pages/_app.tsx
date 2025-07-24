import Layout from "@/Components/Layout";
import store from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
const nunito = Nunito({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito.className}>
      <Toaster />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}
