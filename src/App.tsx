import "./App.css";
import { AuthenticationContextProvider } from "./service/authentication/authentication.context";
import AppRouter from "./navigation/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { TeamsContextProvider } from "./service/teams/teams.context";
import { ProjectsContextProvider } from "./service/projects/projects.context";

const App: React.FC = () => {
    return (
        <AuthenticationContextProvider>
            <TeamsContextProvider>
                <ProjectsContextProvider>
                    <AppRouter />
                </ProjectsContextProvider>
            </TeamsContextProvider>
        </AuthenticationContextProvider>
    );
};

export default App;
