import { Router } from 'express';
import { UserRoutes } from '../../infraestructure/entry-point/user/routes';
import { HospitalRoutes } from '../../infraestructure/entry-point/hospital/routes';
import { DoctorRoutes } from '../../infraestructure/entry-point/doctor/routes';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/users', UserRoutes.routes);
        router.use('/api/v1/hospitals', HospitalRoutes.routes);
        router.use('/api/v1/doctors', DoctorRoutes.routes);

        return router;
    }
}
