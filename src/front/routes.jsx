import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Sitters from "./pages/Sitters";
import CreateSitter from "./pages/CreateSitter";
import EditSitter from "./pages/EditSitter";
import InfoSitter from "./pages/InfoSitter";
import ClientList from "./components/clients/ClientList";
import ViewClient from "./components/clients/ViewClient";
import EditClient from "./components/clients/EditClient";
import NewClient from "./components/clients/NewClient";
import SkillsList from "./components/skills/SkillsList";
import NewSkill from "./components/skills/NewSkill";
import EditSkill from "./components/skills/EditSkills";
import ViewSkills from "./components/skills/ViewSkill";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        
        <Route index element={<Home />} />
        
        <Route path="/sitters" element={ <Sitters />} />
        <Route path="/sitters/create" element={ <CreateSitter />} />
        <Route path="/sitters/edit/:id" element={ <EditSitter />} />
        <Route path="/sitters/:id" element={ <InfoSitter />} />

        <Route path= "/newclients" element={<NewClient />} />
        <Route path= "/clients" element={<ClientList />} />
        <Route path= "/viewclients/:id" element={<ViewClient />} />
        <Route path= "/editclients/:id" element={<EditClient />} />

        <Route path= "/newskills" element={<NewSkill />} />
        <Route path= "/skills" element={<SkillsList />} />
        <Route path= "/viewskills/:id" element={<ViewSkills />} />
        <Route path= "/editskills/:id" element={<EditSkill />} />

        <Route path="/single/:theId" element={ <Single />} />
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
);