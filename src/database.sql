-- ============================================================
--  ToyStoreApp — Script de base de datos
--  Motor: MySQL 8.0+
--  Sistema de gestión para juguetería
-- ============================================================

CREATE DATABASE IF NOT EXISTS toystoreapp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE toystoreapp;

-- ------------------------------------------------------------
-- 1. USERS
--    Admins y empleados del sistema
-- ------------------------------------------------------------
CREATE TABLE users (
  id            CHAR(36)        NOT NULL DEFAULT (UUID()),
  nombre        VARCHAR(100)    NOT NULL,
  apellido      VARCHAR(100)    NOT NULL,
  email         VARCHAR(150)    NOT NULL,
  password_hash VARCHAR(255)    NOT NULL,
  role          ENUM('admin','empleado') NOT NULL DEFAULT 'empleado',
  activo        TINYINT(1)      NOT NULL DEFAULT 1,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT uq_users_email UNIQUE (email)
);

-- ------------------------------------------------------------
-- 2. CATEGORIAS
--    Categorías de juguetes
-- ------------------------------------------------------------
CREATE TABLE categorias (
  id            CHAR(36)      NOT NULL DEFAULT (UUID()),
  nombre        VARCHAR(100)  NOT NULL,
  descripcion   TEXT,
  activa        TINYINT(1)    NOT NULL DEFAULT 1,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_categorias PRIMARY KEY (id),
  CONSTRAINT uq_categoria_nombre UNIQUE (nombre)
);

-- ------------------------------------------------------------
-- 3. PRODUCTOS
--    Productos de la juguetería
-- ------------------------------------------------------------
CREATE TABLE productos (
  id              CHAR(36)      NOT NULL DEFAULT (UUID()),
  categoria_id    CHAR(36)      NOT NULL,
  nombre          VARCHAR(150)  NOT NULL,
  descripcion     TEXT,
  precio          DECIMAL(10,2) NOT NULL,
  stock           INT           NOT NULL DEFAULT 0,
  edad_recomendada VARCHAR(50),
  marca           VARCHAR(100),
  imagen_url      VARCHAR(500),
  activo          TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_productos PRIMARY KEY (id),

  CONSTRAINT fk_producto_categoria
    FOREIGN KEY (categoria_id)
    REFERENCES categorias(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 4. CLIENTES
--    Información de clientes
-- ------------------------------------------------------------
CREATE TABLE clientes (
  id            CHAR(36)      NOT NULL DEFAULT (UUID()),
  nombre        VARCHAR(100)  NOT NULL,
  apellido      VARCHAR(100)  NOT NULL,
  telefono      VARCHAR(20),
  email         VARCHAR(150),
  direccion     VARCHAR(255),
  activo        TINYINT(1)    NOT NULL DEFAULT 1,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT pk_clientes PRIMARY KEY (id)
);

-- ------------------------------------------------------------
-- 5. VENTAS
--    Registro principal de ventas
-- ------------------------------------------------------------
CREATE TABLE ventas (
  id              CHAR(36)      NOT NULL DEFAULT (UUID()),
  cliente_id      CHAR(36),
  user_id         CHAR(36)      NOT NULL,
  total           DECIMAL(10,2) NOT NULL,
  metodo_pago     ENUM('efectivo','tarjeta','transferencia')
                                  NOT NULL DEFAULT 'efectivo',
  estado          ENUM('completada','cancelada')
                                  NOT NULL DEFAULT 'completada',
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT pk_ventas PRIMARY KEY (id),

  CONSTRAINT fk_venta_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES clientes(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

  CONSTRAINT fk_venta_usuario
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- 6. DETALLE_VENTA
--    Productos vendidos por cada venta
-- ------------------------------------------------------------
CREATE TABLE detalle_venta (
  id              CHAR(36)      NOT NULL DEFAULT (UUID()),
  venta_id        CHAR(36)      NOT NULL,
  producto_id     CHAR(36)      NOT NULL,
  cantidad        INT           NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal        DECIMAL(10,2) NOT NULL,

  CONSTRAINT pk_detalle_venta PRIMARY KEY (id),

  CONSTRAINT fk_detalle_venta
    FOREIGN KEY (venta_id)
    REFERENCES ventas(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  CONSTRAINT fk_detalle_producto
    FOREIGN KEY (producto_id)
    REFERENCES productos(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- ÍNDICES
-- ------------------------------------------------------------

-- Login rápido
CREATE INDEX idx_users_email
  ON users(email);

-- Búsqueda de productos
CREATE INDEX idx_productos_nombre
  ON productos(nombre, activo);

-- Productos por categoría
CREATE INDEX idx_productos_categoria
  ON productos(categoria_id);

-- Historial de ventas
CREATE INDEX idx_ventas_fecha
  ON ventas(created_at);

-- ------------------------------------------------------------
-- DATOS DE PRUEBA
-- ------------------------------------------------------------

-- Usuario administrador
INSERT INTO users (
  id,
  nombre,
  apellido,
  email,
  password_hash,
  role
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Carlos',
  'Ramirez',
  'admin@toystore.com',
  '$2b$10$abcdefghijklmnopqrstuuVZ1234567890abcdefghijklmnopqrstu',
  'admin'
);

-- Categorías
INSERT INTO categorias (
  id,
  nombre,
  descripcion
) VALUES
(
  '22222222-2222-2222-2222-222222222222',
  'Carros',
  'Juguetes de vehículos y carreras'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Muñecas',
  'Muñecas y accesorios'
);

-- Productos
INSERT INTO productos (
  id,
  categoria_id,
  nombre,
  descripcion,
  precio,
  stock,
  edad_recomendada,
  marca
) VALUES
(
  '44444444-4444-4444-4444-444444444444',
  '22222222-2222-2222-2222-222222222222',
  'Carro RC Drift',
  'Carro de control remoto para derrapes',
  899.99,
  10,
  '8+',
  'Hot Wheels'
),
(
  '55555555-5555-5555-5555-555555555555',
  '33333333-3333-3333-3333-333333333333',
  'Barbie Fashion',
  'Muñeca Barbie edición fashion',
  499.99,
  15,
  '5+',
  'Mattel'
);

-- Cliente
INSERT INTO clientes (
  id,
  nombre,
  apellido,
  telefono,
  email
) VALUES (
  '66666666-6666-6666-6666-666666666666',
  'María',
  'López',
  '9611234567',
  'maria@email.com'
);

-- Venta
INSERT INTO ventas (
  id,
  cliente_id,
  user_id,
  total,
  metodo_pago
) VALUES (
  '77777777-7777-7777-7777-777777777777',
  '66666666-6666-6666-6666-666666666666',
  '11111111-1111-1111-1111-111111111111',
  899.99,
  'tarjeta'
);

-- Detalle venta
INSERT INTO detalle_venta (
  venta_id,
  producto_id,
  cantidad,
  precio_unitario,
  subtotal
) VALUES (
  '77777777-7777-7777-7777-777777777777',
  '44444444-4444-4444-4444-444444444444',
  1,
  899.99,
  899.99
);