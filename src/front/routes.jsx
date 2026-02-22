import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Sitters from "./components/sitter/Sitters"
import InfoSitter from "./components/sitter/InfoSitter"
import EditSitter from "./components/sitter/EditSitter"
import CreateSitter from "./components/sitter/CreateSitter"
import Pets from "./components/pet/Pets";
import InfoPet from "./components/pet/InfoPet";
import CreatePet from "./components/pet/CreatePet";
import EditPet from "./components/pet/EditPet";
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
import SitterPets from "./components/SitterPet/SitterPets";
import AddSitterPets from "./components/SitterPet/AddSitterPets";
import SitterLogin from "./components/flujo-sitter/SitterLogin";
import SitterSkillsList from "./components/sitterskills/SitterSkillsList";
import NewSitterSkills from "./components/sitterskills/NewSitterSkills";
import HomeSitter from "./components/flujo-sitter/HomeSitter";
import ClientLogin from "./components/Flujo-client/ClientLogin";
import Appointments from "./appointmment/appointments";
import InfoAppointment from "./appointmment/infoAppointment";
import PostAppointment from "./appointmment/PostAppointment";
import AdminLogin from "./components/loginadmin/AdminLogin";
import AdminHome from "./components/loginadmin/AdminHome";
import PutAppointment from "./appointmment/PutAppointments";

import AppointmentSitterList from "./components/appointmentsitter/AppointmentSitterList";
import ViewAppointmentSitter from "./components/appointmentsitter/ViewAppointmentSitter";
import NewAppointmentSitter from "./components/appointmentsitter/NewAppointmentSitter";
import EditAppointmentSitter from "./components/appointmentsitter/EditAppointmentSitter";

import ClientHome from "./components/Flujo-client/ClientHome";
import ClientsPets from "./components/Flujo-client/ClientsPets";
import ClientNewPets from "./components/Flujo-client/ClientNewPets";
import Welcome from "./components/flujo-sin-usuario/Welcome";
import NewSitterAccount from "./components/flujo-sitter/NewSitterAccount";
import AppointmentList from "./components/flujo-sitter/AppointmentList";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />

      <Route path="/sitters" element={<Sitters />} />
      <Route path="/sitters/:id" element={<InfoSitter />} />
      <Route path="/sitters/create" element={<CreateSitter />} />
      <Route path="/sitters/edit/:id" element={<EditSitter />} />
      <Route path="/sitters/:id" element={<InfoSitter />} />

      <Route path="/newclients" element={<NewClient />} />
      <Route path="/clients" element={<ClientList />} />
      <Route path="/viewclients/:id" element={<ViewClient />} />
      <Route path="/editclients/:id" element={<EditClient />} />

      <Route path="/newskills" element={<NewSkill />} />
      <Route path="/skills" element={<SkillsList />} />
      <Route path="/viewskills/:id" element={<ViewSkills />} />
      <Route path="/editskills/:id" element={<EditSkill />} />

      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />

      <Route path="/pets" element={<Pets />} />
      <Route path="/pets/:id" element={<InfoPet />} />
      <Route path="/pets/create" element={<CreatePet />} />
      <Route path="/pets/edit/:id" element={<EditPet />} />

      <Route path="/newservices" element={<NewService />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/viewservices/:id" element={<ViewService />} />
      <Route path="/editservices/:id" element={<EditService />} />

      <Route path="/sitterpets" element={<SitterPets />} />
      <Route path="/sitters/:id/add-pet" element={<AddSitterPets />} />
      {/* ==================================LOGIN SITTER=================================== */}
      
      <Route path="/clients/login" element={<ClientLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/newsitter/:id/newskills" element={<NewSitterSkills />} />
      <Route path="/sitterskills" element={<SitterSkillsList />} />

      {/* ==================================SITTER LOGGED=================================== */}
      <Route path="/sitters/home" element={<HomeSitter />} />
      <Route path="/clients/home" element={<ClientHome />} />
      <Route path="/admin/home" element={<AdminHome />} />


      <Route path="/appointments" element={<Appointments />} />
      <Route path="/appointments/:id" element={<InfoAppointment />} />
      <Route path="/appointments/new" element={<PostAppointment />} />
      <Route path="/appointments/edit/:id" element={<PutAppointment />} />

      <Route path="/appointments/sitters" element={<AppointmentSitterList />} />
      <Route path="/appointments/sitters/:id" element={<ViewAppointmentSitter />} />
      <Route path="/appointments/sitters/new" element={<NewAppointmentSitter />} />
      <Route path="/appointments/sitters/edit/:id" element={<EditAppointmentSitter />} />
      
      <Route path="/clients/pets" element={<ClientsPets />} />
      <Route path="/clients/pets/newpet" element={<ClientNewPets />} />
      
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/sitters/login" element={<SitterLogin />} />
      <Route path="/sitters/newaccount" element={<NewSitterAccount />} />
      <Route path="/appointments/list" element={<AppointmentList />} />




    </Route>
  )
);