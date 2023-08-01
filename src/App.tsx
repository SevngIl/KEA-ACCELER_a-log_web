import "./App.css";
import { AuthenticationContextProvider } from "./service/authentication/authentication.context";
import AppRouter from "./navigation/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
    return (
        <AuthenticationContextProvider>
            <AppRouter />
        </AuthenticationContextProvider>
    );
};

export default App;
