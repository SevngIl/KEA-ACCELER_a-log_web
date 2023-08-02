import "./App.css";
import { AuthenticationContextProvider } from "./service/authentication/authentication.context";
import AppRouter from "./navigation/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { TeamsContextProvider } from "./service/teams/teams.context";

const App: React.FC = () => {
    return (
        <AuthenticationContextProvider>
            <TeamsContextProvider>
                <AppRouter />
            </TeamsContextProvider>
        </AuthenticationContextProvider>
    );
};

export default App;
