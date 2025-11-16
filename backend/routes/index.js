import express from "express";
import { inicializacionUser, activateUser,getUsers, getUserById, Register, updateUser, deleteUser,Login, Logout, setup2FA, verify2FA,toggle2FA } from "../controllers/Usuarios.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getRoles, createRole, updateRole, deleteRole } from "../controllers/Roles.js";
import {registerConductor, getConductores,getConductorById, updateConductor, deleteConductor} from "../controllers/Conductores.js";
import {createVehiculo, getVehiculos, getVehiculoById,updateVehiculo, deleteVehiculo} from "../controllers/Vehiculos.js";
import {createViaje, getViajes, updateViaje, deleteViaje} from "../controllers/Viajes.js";
import {createMonitoreo, getMonitoreos, getMonitoreosByViaje, updateMonitoreo, deleteMonitoreo} from "../controllers/Monitoreos.js";
import { createImagen, getImagenes, getImagenesByViaje, updateImagen, deleteImagen } from "../controllers/ImagenesMonitoreo.js";
import { getPasajeros,getPasajeroById, createPasajero, updatePasajero, deletePasajero} from "../controllers/Pasajeros.js";
import { getPasajerosViaje, getPasajeroViajeById,createPasajeroViaje, updatePasajeroViaje, deletePasajeroViaje } from "../controllers/PasajerosViaje.js";
import { getAlertas, createAlerta, updateAlerta, deleteAlerta } from "../controllers/Alertas.js";
import { getAccidentes, createAccidente, updateAccidente, deleteAccidente } from "../controllers/Accidentes.js";
import { upload } from "../middleware/upload.js";
import { uploadUserPhoto } from "../middleware/uploadusuario.js";


const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


//////////////////////
// RUTAS USUARIOS
//////////////////////

/**
 * @swagger
 * /users/inicializacion:
 *   get:
 *     summary: Verifica si el sistema tiene usuarios registrados
 *     tags: [Usuarios]
 *     description: Retorna si el sistema ya fue inicializado (si existen usuarios en la base de datos).
 *     responses:
 *       200:
 *         description: Estado de inicialización del sistema
 *         content:
 *           application/json:
 *             examples:
 *               sinUsuarios:
 *                 summary: Sin usuarios
 *                 value:
 *                   inicializado: false
 *                   msg: "No hay usuarios en el sistema. Se requiere configuración inicial."
 *               conUsuarios:
 *                 summary: Con usuarios
 *                 value:
 *                   inicializado: true
 *                   msg: "El sistema ya está inicializado."
 *                   totalUsuarios: 5
 *       500:
 *         description: Error al verificar la inicialización
 */
router.get('/users/inicializacion', inicializacionUser);
/**
 * @swagger
 * /users/{id}/activate:
 *   put:
 *     summary: Activar un usuario (cambia estado a activo)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a activar
 *     responses:
 *       200:
 *         description: Usuario activado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:id/activate', verifyToken, activateUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:id', verifyToken, getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_completo:
 *                 type: string
 *               email:
 *                 type: string
 *               id_rol:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [activo, inactivo]
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 */
router.put('/users/:id', uploadUserPhoto.single("foto_perfil"), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Desactivar usuario (cambia estado a inactivo)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a desactivar
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente
 */
router.delete('/users/:id', verifyToken, deleteUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/users', verifyToken, getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - ci
 *               - nombre_completo
 *               - apellido_paterno
 *               - apellido_materno
 *               - email
 *               - password
 *               - confPassword
 *               - id_rol
 *             properties:
 *               ci:
 *                 type: string
 *                 example: "123456"
 *               nombre_completo:
 *                 type: string
 *                 example: "Juan Pérez Gómez"
 *               apellido_paterno:
 *                 type: string
 *                 example: "Pérez"
 *               apellido_materno:
 *                 type: string
 *                 example: "Gómez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               confPassword:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               id_rol:
 *                 type: integer
 *                 example: 1
 *               estado:
 *                 type: string
 *                 enum: [activo, inactivo]
 *                 example: activo
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: Contraseña no coincide
 *       500:
 *         description: Error al crear usuario
 */

router.post('/users', uploadUserPhoto.single("foto_perfil"), Register);




/**
 * @swagger
 * /token:
 *   get:
 *     summary: Obtener un nuevo accessToken usando refreshToken
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Nuevo accessToken
 */
router.get('/token', refreshToken);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve accessToken
 *       400:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Email no encontrado
 */
router.post('/login', Login);
/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *       204:
 *         description: No había sesión activa
 */
router.delete('/logout', Logout);

/**
 * @swagger
 * /2fa/toggle:
 *   post:
 *     summary: Activar o desactivar 2FA
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               enable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estado de 2FA actualizado
 */
router.post('/2fa/toggle', toggle2FA);

/**
 * @swagger
 * /2fa/setup:
 *   post:
 *     summary: Generar configuración de 2FA para un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Devuelve QR y secreto para configurar 2FA
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/2fa/setup', setup2FA);

/**
 * @swagger
 * /2fa/verify:
 *   post:
 *     summary: Verificar el código 2FA del usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: 2FA verificado, devuelve accessToken
 *       400:
 *         description: Código inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/2fa/verify', verify2FA);

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Gestión de roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get('/roles', getRoles);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado
 */
router.post('/roles', createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol actualizado
 *       404:
 *         description: Rol no encontrado
 */
router.put('/roles/:id', updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado
 *       404:
 *         description: Rol no encontrado
 */
router.delete('/roles/:id', deleteRole);

/**
 * @swagger
 * tags:
 *   - name: Conductores
 *     description: Gestión de conductores
 */

/**
 * @swagger
 * /conductores:
 *   get:
 *     summary: Obtener todos los conductores
 *     tags: [Conductores]
 *     responses:
 *       200:
 *         description: Lista de conductores
 */
router.get('/conductores', getConductores);
/**
 * @swagger
 * /conductores/{id}:
 *   get:
 *     summary: Obtener un conductor por ID
 *     tags: [Conductores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del conductor
 *     responses:
 *       200:
 *         description: Conductor encontrado
 *       404:
 *         description: Conductor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/conductores/:id', getConductorById);

/**
 * @swagger
 * /conductores:
 *   post:
 *     summary: Crear un nuevo conductor (y usuario asociado)
 *     tags: [Conductores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ci:
 *                 type: string
 *               nombre_completo:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confPassword:
 *                 type: string
 *               id_rol:
 *                 type: string
 *               licencia:
 *                 type: string
 *               fecha_vencimiento_licencia:
 *                 type: string
 *                 format: date
 *               celular:
 *                 type: string
 *               contacto_emergencia:
 *                 type: string
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Conductor registrado exitosamente
 *       400:
 *         description: Error en los datos
 *       500:
 *         description: Error del servidor
 */
router.post('/conductores', registerConductor);

/**
 * @swagger
 * /conductores/{id}:
 *   put:
 *     summary: Actualizar un conductor
 *     tags: [Conductores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licencia:
 *                 type: string
 *               fecha_vencimiento_licencia:
 *                 type: string
 *                 format: date
 *               celular:
 *                 type: string
 *               contacto_emergencia:
 *                 type: string
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Conductor actualizado
 *       404:
 *         description: Conductor no encontrado
 */
router.put('/conductores/:id', updateConductor);

/**
 * @swagger
 * /conductores/{id}:
 *   delete:
 *     summary: Eliminar un conductor
 *     tags: [Conductores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conductor eliminado
 *       404:
 *         description: Conductor no encontrado
 */
router.delete('/conductores/:id', deleteConductor);

/**
 * @swagger
 * tags:
 *   - name: Vehículos
 *     description: Gestión de vehículos
 */

/**
 * @swagger
 * /vehiculos:
 *   get:
 *     summary: Obtener todos los vehículos
 *     tags: [Vehículos]
 *     responses:
 *       200:
 *         description: Lista de vehículos
 */
router.get('/vehiculos', getVehiculos);

/**
 * @swagger
 * /vehiculos/{id}:
 *   get:
 *     summary: Obtener un vehículo por ID
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vehículo
 *     responses:
 *       200:
 *         description: Detalles del vehículo
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/vehiculos/:id', getVehiculoById);
/**
 * @swagger
 * /vehiculos:
 *   post:
 *     summary: Crear un nuevo vehículo
 *     tags: [Vehículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               anio:
 *                 type: integer
 *               capacidad_pasajeros:
 *                 type: integer
 *               id_conductor:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [activo, mantenimiento, inactivo]
 *     responses:
 *       201:
 *         description: Vehículo registrado exitosamente
 *       400:
 *         description: Error en los datos
 *       500:
 *         description: Error del servidor
 */
router.post('/vehiculos', createVehiculo);

/**
 * @swagger
 * /vehiculos/{id}:
 *   put:
 *     summary: Actualizar un vehículo
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               anio:
 *                 type: integer
 *               capacidad_pasajeros:
 *                 type: integer
 *               id_conductor:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [activo, mantenimiento, inactivo]
 *     responses:
 *       200:
 *         description: Vehículo actualizado
 *       404:
 *         description: Vehículo no encontrado
 */
router.put('/vehiculos/:id', updateVehiculo);

/**
 * @swagger
 * /vehiculos/{id}:
 *   delete:
 *     summary: Eliminar un vehículo
 *     tags: [Vehículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehículo eliminado
 *       404:
 *         description: Vehículo no encontrado
 */
router.delete('/vehiculos/:id', deleteVehiculo);

/**
 * @swagger
 * /viajes:
 *   get:
 *     summary: Obtener todos los viajes
 *     tags: [Viajes]
 *     responses:
 *       200:
 *         description: Lista de viajes
 *       500:
 *         description: Error del servidor
 */
router.get('/viajes', getViajes);

/**
 * @swagger
 * /viajes:
 *   post:
 *     summary: Crear un nuevo viaje
 *     tags: [Viajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_vehiculo:
 *                 type: integer
 *               fecha_inicio:
 *                 type: string
 *                 format: date-time
 *               fecha_fin:
 *                 type: string
 *                 format: date-time
 *               origen:
 *                 type: string
 *               destino:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [programado, en_proceso, finalizado, cancelado]
 *     responses:
 *       201:
 *         description: Viaje creado exitosamente
 *       400:
 *         description: Error en los datos
 *       500:
 *         description: Error del servidor
 */
router.post('/viajes', createViaje);

/**
 * @swagger
 * /viajes/{id}:
 *   put:
 *     summary: Actualizar un viaje
 *     tags: [Viajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_vehiculo:
 *                 type: integer
 *               fecha_inicio:
 *                 type: string
 *                 format: date-time
 *               fecha_fin:
 *                 type: string
 *                 format: date-time
 *               origen:
 *                 type: string
 *               destino:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [programado, en_proceso, finalizado, cancelado]
 *     responses:
 *       200:
 *         description: Viaje actualizado
 *       404:
 *         description: Viaje no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/viajes/:id', updateViaje);

/**
 * @swagger
 * /viajes/{id}:
 *   delete:
 *     summary: Eliminar un viaje
 *     tags: [Viajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Viaje eliminado
 *       404:
 *         description: Viaje no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/viajes/:id', deleteViaje);

/**
 * @swagger
 * tags:
 *   - name: Monitoreos
 *     description: Gestión de registros de monitoreo de viajes
 */

/**
 * @swagger
 * /monitoreos:
 *   get:
 *     summary: Obtener todos los registros de monitoreo
 *     tags: [Monitoreos]
 *     responses:
 *       200:
 *         description: Lista de registros de monitoreo
 */
router.get('/monitoreos', getMonitoreos);

/**
 * @swagger
 * /monitoreos/viaje/{id_viaje}:
 *   get:
 *     summary: Obtener registros de monitoreo por ID de viaje
 *     tags: [Monitoreos]
 *     parameters:
 *       - in: path
 *         name: id_viaje
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del viaje
 *     responses:
 *       200:
 *         description: Lista de registros de monitoreo del viaje
 *       404:
 *         description: No se encontraron registros
 */
router.get('/monitoreos/viaje/:id_viaje', getMonitoreosByViaje);

/**
 * @swagger
 * /monitoreos:
 *   post:
 *     summary: Crear un nuevo registro de monitoreo
 *     tags: [Monitoreos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_viaje:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *               latitud:
 *                 type: number
 *                 format: float
 *               longitud:
 *                 type: number
 *                 format: float
 *               velocidad:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Registro de monitoreo creado exitosamente
 *       400:
 *         description: Error en los datos
 *       500:
 *         description: Error del servidor
 */
router.post('/monitoreos', createMonitoreo);

/**
 * @swagger
 * /monitoreos/{id}:
 *   put:
 *     summary: Actualizar un registro de monitoreo
 *     tags: [Monitoreos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de monitoreo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_viaje:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *               latitud:
 *                 type: number
 *                 format: float
 *               longitud:
 *                 type: number
 *                 format: float
 *               velocidad:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Registro actualizado
 *       404:
 *         description: Registro no encontrado
 */
router.put('/monitoreos/:id', updateMonitoreo);

/**
 * @swagger
 * /monitoreos/{id}:
 *   delete:
 *     summary: Eliminar un registro de monitoreo
 *     tags: [Monitoreos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de monitoreo
 *     responses:
 *       200:
 *         description: Registro eliminado
 *       404:
 *         description: Registro no encontrado
 */
router.delete('/monitoreos/:id', deleteMonitoreo);

/**
 * @swagger
 * tags:
 *   - name: ImagenesMonitoreo
 *     description: Gestión de imágenes de monitoreo
 */

/**
 * @swagger
 * /imagenes:
 *   get:
 *     summary: Obtener todas las imágenes de monitoreo
 *     tags: [ImagenesMonitoreo]
 *     responses:
 *       200:
 *         description: Lista de imágenes
 */
router.get('/imagenes', getImagenes);

/**
 * @swagger
 * /imagenes/viaje/{id_viaje}:
 *   get:
 *     summary: Obtener imágenes por ID de viaje
 *     tags: [ImagenesMonitoreo]
 *     parameters:
 *       - in: path
 *         name: id_viaje
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del viaje
 *     responses:
 *       200:
 *         description: Lista de imágenes del viaje
 *       404:
 *         description: No se encontraron imágenes
 */
router.get('/imagenes/viaje/:id_viaje', getImagenesByViaje);

/**
 * @swagger
 * /imagenes:
 *   post:
 *     summary: Subir una nueva imagen de monitoreo
 *     tags: [ImagenesMonitoreo]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_viaje:
 *                 type: integer
 *               procesada:
 *                 type: boolean
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Imagen subida exitosamente
 *       400:
 *         description: No se subió ninguna imagen
 *       500:
 *         description: Error del servidor
 */
router.post('/imagenes', upload.single('imagen'), createImagen);

/**
 * @swagger
 * /imagenes/{id}:
 *   put:
 *     summary: Actualizar datos de una imagen de monitoreo
 *     tags: [ImagenesMonitoreo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_viaje:
 *                 type: integer
 *               procesada:
 *                 type: boolean
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen actualizada exitosamente
 *       400:
 *         description: No se subió ninguna imagen (opcional)
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/imagenes/:id', upload.single('imagen'), updateImagen);

/**
 * @swagger
 * /imagenes/{id}:
 *   delete:
 *     summary: Eliminar una imagen de monitoreo
 *     tags: [ImagenesMonitoreo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Imagen eliminada
 *       404:
 *         description: Imagen no encontrada
 */
router.delete('/imagenes/:id', deleteImagen);

/**
 * @swagger
 * tags:
 *   - name: Pasajeros
 *     description: Gestión de pasajeros
 */

/**
 * @swagger
 * /pasajeros:
 *   get:
 *     summary: Obtener todos los pasajeros
 *     tags: [Pasajeros]
 *     responses:
 *       200:
 *         description: Lista de pasajeros
 *       500:
 *         description: Error del servidor
 */
router.get("/pasajeros", getPasajeros);

/**
 * @swagger
 * /pasajeros/{id}:
 *   get:
 *     summary: Obtener un pasajero por ID
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pasajero
 *     responses:
 *       200:
 *         description: Información del pasajero
 *       404:
 *         description: Pasajero no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/pasajeros/:id", getPasajeroById);

/**
 * @swagger
 * /pasajeros:
 *   post:
 *     summary: Crear un nuevo pasajero
 *     tags: [Pasajeros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ci:
 *                 type: string
 *               nombre_completo:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pasajero creado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post("/pasajeros", createPasajero);

/**
 * @swagger
 * /pasajeros/{id}:
 *   put:
 *     summary: Actualizar un pasajero existente
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pasajero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ci:
 *                 type: string
 *               nombre_completo:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pasajero actualizado
 *       404:
 *         description: Pasajero no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/pasajeros/:id", updatePasajero);

/**
 * @swagger
 * /pasajeros/{id}:
 *   delete:
 *     summary: Eliminar un pasajero
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pasajero
 *     responses:
 *       200:
 *         description: Pasajero eliminado
 *       404:
 *         description: Pasajero no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/pasajeros/:id", deletePasajero);

/**
 * @swagger
 * tags:
 *   - name: PasajerosViaje
 *     description: Gestión de pasajeros en viajes
 */

/**
 * @swagger
 * /pasajeros_viaje:
 *   get:
 *     summary: Obtener todos los pasajeros por viaje
 *     tags: [PasajerosViaje]
 *     responses:
 *       200:
 *         description: Lista de pasajeros por viaje
 *       500:
 *         description: Error del servidor
 */
router.get("/pasajeros_viaje", getPasajerosViaje);

/**
 * @swagger
 * /pasajeros_viaje/{id}:
 *   get:
 *     summary: Obtener un pasajero de viaje por su ID
 *     tags: [PasajerosViaje]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pasajero en viaje
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Datos del pasajero encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 id_viaje:
 *                   type: integer
 *                   example: 2
 *                 id_pasajero:
 *                   type: integer
 *                   example: 7
 *                 numero_asiento:
 *                   type: integer
 *                   example: 15
 *                 estado:
 *                   type: string
 *                   example: "confirmado"
 *       404:
 *         description: Pasajero no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/pasajeros_viaje/:id", getPasajeroViajeById);

/**
 * @swagger
 * /pasajeros_viaje:
 *   post:
 *     summary: Registrar un pasajero en un viaje
 *     tags: [PasajerosViaje]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_viaje:
 *                 type: integer
 *               id_pasajero:
 *                 type: integer
 *               numero_asiento:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [registrado, abordo, descendio]
 *                 default: registrado
 *     responses:
 *       201:
 *         description: Pasajero registrado en el viaje
 *       500:
 *         description: Error del servidor
 */
router.post("/pasajeros_viaje", createPasajeroViaje);

/**
 * @swagger
 * /pasajeros_viaje/{id}:
 *   put:
 *     summary: Actualizar un pasajero en un viaje
 *     tags: [PasajerosViaje]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro pasajero-viaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_asiento:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [registrado, abordo, descendio]
 *     responses:
 *       200:
 *         description: Registro actualizado
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/pasajeros_viaje/:id", updatePasajeroViaje);

/**
 * @swagger
 * /pasajeros_viaje/{id}:
 *   delete:
 *     summary: Eliminar un pasajero de un viaje
 *     tags: [PasajerosViaje]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro pasajero-viaje
 *     responses:
 *       200:
 *         description: Registro eliminado
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/pasajeros_viaje/:id", deletePasajeroViaje);

/**
 * @swagger
 * tags:
 *   - name: Alertas
 *     description: Gestión de alertas de viaje
 */

/**
 * @swagger
 * /alertas:
 *   get:
 *     summary: Obtener todas las alertas
 *     tags: [Alertas]
 *     responses:
 *       200:
 *         description: Lista de alertas
 *       500:
 *         description: Error del servidor
 */
router.get("/alertas", getAlertas);

/**
 * @swagger
 * /alertas:
 *   post:
 *     summary: Crear una nueva alerta
 *     tags: [Alertas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_viaje:
 *                 type: integer
 *               tipo:
 *                 type: string
 *                 enum: [retraso, emergencia, accidente]
 *               mensaje:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [activa, resuelta]
 *                 default: activa
 *     responses:
 *       201:
 *         description: Alerta creada
 *       500:
 *         description: Error del servidor
 */
router.post("/alertas", createAlerta);

/**
 * @swagger
 * /alertas/{id}:
 *   put:
 *     summary: Actualizar una alerta existente
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la alerta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [retraso, emergencia, accidente]
 *               mensaje:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [activa, resuelta]
 *     responses:
 *       200:
 *         description: Alerta actualizada
 *       404:
 *         description: Alerta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/alertas/:id", updateAlerta);

/**
 * @swagger
 * /alertas/{id}:
 *   delete:
 *     summary: Eliminar una alerta
 *     tags: [Alertas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la alerta
 *     responses:
 *       200:
 *         description: Alerta eliminada
 *       404:
 *         description: Alerta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/alertas/:id", deleteAlerta);

/**
 * @swagger
 * tags:
 *   - name: Accidentes
 *     description: Gestión de accidentes en viajes
 */

/**
 * @swagger
 * /accidentes:
 *   get:
 *     summary: Obtener todos los accidentes
 *     tags: [Accidentes]
 *     responses:
 *       200:
 *         description: Lista de accidentes
 *       500:
 *         description: Error del servidor
 */
router.get("/accidentes", getAccidentes);

/**
 * @swagger
 * /accidentes:
 *   post:
 *     summary: Registrar un nuevo accidente
 *     tags: [Accidentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_viaje:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               heridos:
 *                 type: integer
 *                 default: 0
 *               fallecidos:
 *                 type: integer
 *                 default: 0
 *               fecha:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Accidente registrado
 *       500:
 *         description: Error del servidor
 */
router.post("/accidentes", createAccidente);

/**
 * @swagger
 * /accidentes/{id}:
 *   put:
 *     summary: Actualizar un accidente existente
 *     tags: [Accidentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del accidente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               heridos:
 *                 type: integer
 *               fallecidos:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Accidente actualizado
 *       404:
 *         description: Accidente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/accidentes/:id", updateAccidente);

/**
 * @swagger
 * /accidentes/{id}:
 *   delete:
 *     summary: Eliminar un accidente
 *     tags: [Accidentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del accidente
 *     responses:
 *       200:
 *         description: Accidente eliminado
 *       404:
 *         description: Accidente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/accidentes/:id", deleteAccidente);

export default router;

