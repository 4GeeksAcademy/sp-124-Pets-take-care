import {createBrowserRouter,createRoutesFromElements,Route,} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Sitters from "./sitter/Sitters"
import InfoSitter from "./sitter/InfoSitter"
import EditSitter from "./sitter/EditSitter"
import CreateSitter from "./sitter/CreateSitter"
import Pets from "./pet/Pets";
import InfoPet from "./pet/InfoPet";
import CreatePet from "./pet/CreatePet";
import EditPet from "./pet/EditPet";
import ClientList from "./components/clients/ClientList";
import ViewClient from "./components/clients/ViewClient";
import EditClient from "./components/clients/EditClient";
import NewClient from "./components/clients/NewClient";
import SkillsList from "./components/skills/SkillsList";
import NewSkill from "./components/skills/NewSkill";
import EditSkill from "./components/skills/EditSkills";
import ViewSkills from "./components/skills/ViewSkill";
import NewService from "./components/services/NewService";
import ServiceList from "./components/services/ServiceList";
import ViewService from "./components/services/ViewService";
import EditService from "./components/services/EditService";
import SitterPets from "./SitterPet/SitterPets";
import AddSitterPets from "./SitterPet/AddSitterPets";
import SitterLogin from "./Sitter-login/SitterLogin";
import SitterSkillsList from "./components/sitterskills/SitterSkillsList";
import NewSitterSkills from "./components/sitterskills/NewSitterSkills";
import HomeSitter from "./HomeSitter/HomeSitter";
import ClientLogin from "./components/loginclient/ClientLogin";
import ClientHome from "./HomeSitter/HomeSitter";


export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        
        <Route path="/sitters" element={ <Sitters />} /> 
        <Route path="/sitters/:id" element={ <InfoSitter />} />
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
          
        <Route path="/pets" element={ <Pets />} />
        <Route path="/pets/:id" element={ <InfoPet />} />
        <Route path="/pets/create" element={ <CreatePet />} />
        <Route path="/pets/edit/:id" element={ <EditPet />} />

        <Route path= "/newservices" element={<NewService />} />
        <Route path= "/services" element={<ServiceList />} />
        <Route path= "/viewservices/:id" element={<ViewService />} />
        <Route path= "/editservices/:id" element={<EditService />} />
        
        <Route path= "/sitterpets" element={<SitterPets />} />
        <Route path= "/sitters/:id/add-pet" element={<AddSitterPets />} />
{/* ==================================LOGIN SITTER=================================== */}
        <Route path= "/sitters/login" element={<SitterLogin />} />
        <Route path= "/clients/login" element={<ClientLogin />} />

        <Route path= "/newsitter/:id/newskills" element={<NewSitterSkills />} />
        <Route path= "/sitterskills" element={<SitterSkillsList />} />

{/* ==================================SITTER LOGGED=================================== */}
        <Route path= "/sitters/home" element={<HomeSitter />} />
        <Route path= "/clients/home" element={<ClientHome />} />



      </Route>
    )
);