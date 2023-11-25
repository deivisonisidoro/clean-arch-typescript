import { Router } from "express";
import { expressAdapter } from "../../adapters/express";
import { authenticateUserComposer } from "../../../infra/services/composers/Authenticate/authenticateUser";

const authenticateRoutes = Router();


authenticateRoutes.post('/login', async (request, response)=>{
  const adapter = await expressAdapter(request, authenticateUserComposer())
  return response.status(adapter.statusCode).json(adapter.body)
});

export { authenticateRoutes }
