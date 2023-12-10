import { Router } from "express";
import { expressAdapter } from "../../adapters/express";
import { refreshTokenUserComposer } from "../../../infra/services/composers/Authenticate/refreshTokenUser";
import { authenticateUserComposer } from "../../../infra/services/composers/Authenticate/authenticateUser";
import { recoverUserInformationUserComposer } from "../../../infra/services/composers/Authenticate/recoverUserInformation";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const authenticateRoutes = Router();


authenticateRoutes.post('/login', async (request, response)=>{
  const adapter = await expressAdapter(request, authenticateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
});
authenticateRoutes.post('/refresh-token', async (request, response)=>{
  const adapter = await expressAdapter(request, refreshTokenUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
});

authenticateRoutes.get('/user', ensureAuthenticated, async (request, response)=>{
  const adapter = await expressAdapter(request, recoverUserInformationUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
});

export { authenticateRoutes }
