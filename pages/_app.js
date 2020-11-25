import "../static/icons";
import "../validation/yup";
import "../static/styles.global.scss";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
