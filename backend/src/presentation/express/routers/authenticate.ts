import { Router } from "express";
import { expressAdapter } from "../../adapters/express";
import { refreshTokenUserComposer } from "../../../infra/services/composers/Authenticate/refreshTokenUser";
import { authenticateUserComposer } from "src/infra/services/composers/Authenticate/authenticateUser";

const authenticateRoutes = Router();


authenticateRoutes.post('/login', async (request, response)=>{
  const adapter = await expressAdapter(request, authenticateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
});
authenticateRoutes.post('/refresh-token', async (request, response)=>{
  const adapter = await expressAdapter(request, refreshTokenUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
});

export { authenticateRoutes }
