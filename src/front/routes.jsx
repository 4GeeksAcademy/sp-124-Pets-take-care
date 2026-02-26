import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

import Sitters from "./components/Admin/sitter/Sitters"
import InfoSitter from "./components/Admin/sitter/InfoSitter"
import EditSitter from "./components/Admin/sitter/EditSitter"
import CreateSitter from "./components/Admin/sitter/CreateSitter"

import Pets from "./components/Admin/pet/Pets";
import InfoPet from "./components/Admin/pet/InfoPet";
import CreatePet from "./components/Admin/pet/CreatePet";
import EditPet from "./components/Admin/pet/EditPet";

import ClientList from "./components/Admin/Client/ClientList";
import ViewClient from "./components/Admin/Client/ViewClient";
import EditClient from "./components/Admin/Client/EditClient";
import NewClient from "./components/Admin/Client/NewClient";

import SkillsList from "./components/Admin/skills/SkillsList";
import NewSkill from "./components/Admin/skills/NewSkill";
import EditSkill from "./components/Admin/skills/EditSkills";
import ViewSkills from "./components/Admin/skills/ViewSkill";

import NewService from "./components/Admin/services/NewService";
import ServiceList from "./components/Admin/services/ServiceList";
import ViewService from "./components/Admin/services/ViewService";
import EditService from "./components/Admin/services/EditService";

import SitterPets from "./components/Admin/SitterPet/SitterPets";
import AddSitterPets from "./components/Admin/SitterPet/AddSitterPets";



import SitterSkillsList from "./components/Admin/sitterskills/SitterSkillsList";
import NewSitterSkills from "./components/Admin/sitterskills/NewSitterSkills";


import ClientLogin from "./components/Clients/Loggin/ClientLogin";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";

import AppointmentSitterList from "./components/Admin/appointmentsitter/AppointmentSitterList";
import ViewAppointmentSitter from "./components/Admin/appointmentsitter/ViewAppointmentSitter";
import NewAppointmentSitter from "./components/Admin/appointmentsitter/NewAppointmentSitter";
import EditAppointmentSitter from "./components/Admin/appointmentsitter/EditAppointmentSitter";

import Welcome from "./components/flujo-sin-usuario/Welcome";
import NewSitterAccount from "./components/flujo-sitter/NewSitterAccount";
import AppointmentList from "./components/flujo-sitter/AppointmentList";


import ClientsPets from "./components/Clients/Pets/ClientsPets";
import ClientNewPets from "./components/Clients/Pets/ClientNewPets";
import ClientEditPet from "./components/Clients/Pets/ClientEditPet";

import MyAppointments from "./components/Clients/Appointments/MyAppointments";
import MyAppointmentsEdit from "./components/Clients/Appointments/MyAppointmentsEdit";

import Appointments from "./components/Admin/appointmment/appointments";
import InfoAppointment from "./components/Admin/appointmment/infoAppointment";
import PostAppointment from "./components/Admin/appointmment/PostAppointment";
import PutAppointment from "./components/Admin/appointmment/PutAppointments";

import SitterLogin from "./components/flujo-sitter/SitterLogin";
import HomeSitter from "./components/flujo-sitter/HomeSitter";
import ClientHome from "./components/Clients/Loggin/ClientHome";
import AppointmentListOwn from "./components/flujo-sitter/AppointmentListOwn";
import AppointmentAsigned from "./components/flujo-sitter/AppointmentAsigned";


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
      <Route path="/clients/home" element={<ClientHome/>} />
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
      <Route path="/clients/pets/:id" element={<ClientEditPet />} />

      <Route path="/clients/appointments" element={<MyAppointments />} />
      <Route path="/clients/appointments/edit" element={<MyAppointmentsEdit />} />

      
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/sitters/login" element={<SitterLogin />} />
      <Route path="/sitters/newaccount" element={<NewSitterAccount />} />
      <Route path="/appointments/list" element={<AppointmentList />} />
      <Route path="/appointments-sitters/own" element={<AppointmentListOwn />} />
      <Route path="/appointments-sitters/asigned" element={<AppointmentAsigned />} />




    </Route>
  )
);