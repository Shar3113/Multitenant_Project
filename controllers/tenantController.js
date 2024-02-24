
import Tenant from '../models/Tenant.js';

const getAllTenants = async (req, res) => {

  try {

    const tenants = await Tenant.findAll();

    res.json(tenants);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: 'Internal server error.' });

  }

};

const createTenant = async (req, res, next) => {

  try {

    if (req && req.body && req.body.admin) {

      const tenant = await Tenant.create({

        name: req.body.name

      });

      req.body.tenantid = tenant.id;

      next();

    } else {

      next();

    }

  } catch (error) {

    res.status(500).json({ message: 'Internal server error.' });

  }

};

export { getAllTenants, createTenant };
