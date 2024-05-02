import express from 'express';
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from '../controllers/role.controller.js';

const router = express.Router();

// create a new role in db
router.post('/create', createRole);

// update role in db
router.put('/update/:id', updateRole);

// get all the roles from db
router.get('/getAll', getAllRoles);

// delete role from db
router.delete('/deleteRole/:id', deleteRole);

export default router;
