-- Tabla de roles
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(50) UNIQUE NOT NULL -- Ej: 'admin', 'user'
);

-- Tabla de usuarios
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    genero VARCHAR(10),
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roleid INTEGER REFERENCES rol(id) NOT NULL
);

-- Tabla de géneros de libro
CREATE TABLE genero_libro (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de libros
CREATE TABLE libro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    usuarioid INTEGER REFERENCES usuario(id) NOT NULL,
    genreid INTEGER REFERENCES genero_libro(id) NOT NULL
);

-- Tabla de colecciones
CREATE TABLE coleccion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuarioid INTEGER REFERENCES usuario(id) NOT NULL
);

-- Tabla N a N: relación libro-colección
CREATE TABLE book_collection (
    id SERIAL PRIMARY KEY,
    bookid INTEGER REFERENCES libro(id) ON DELETE CASCADE,
    collectionid INTEGER REFERENCES coleccion(id) ON DELETE CASCADE,
    UNIQUE(bookid, collectionid)
);

-- Tabla para compartir colecciones con otros usuarios
CREATE TABLE compartir_coleccion (
    id SERIAL PRIMARY KEY,
    coleccionid INTEGER REFERENCES coleccion(id) ON DELETE CASCADE,
    usuarioid INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
    fecha_compartido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de comentarios
CREATE TABLE comentario (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    userid INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
    bookid INTEGER REFERENCES libro(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de likes
CREATE TABLE "like" (
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
    bookid INTEGER REFERENCES libro(id) ON DELETE CASCADE,
    UNIQUE(userid, bookid)
);


CREATE TABLE reading_progress (
    id SERIAL PRIMARY KEY,
    usuarioId INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    libroId INTEGER NOT NULL REFERENCES libros(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paginas_leidas INTEGER NOT NULL,
    comentario VARCHAR(255)
);
