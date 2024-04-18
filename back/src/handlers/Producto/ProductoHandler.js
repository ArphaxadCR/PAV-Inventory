const prisma = require("@prisma/client");

class ProductoHandler {
  static async post(nombre, descripcion, barcodeImageURL) {
    try {
      const producto = await prisma.producto.create({
        data: {
          nombre,
          descripcion,
          barcodeImageURL,
        },
      });
      return { data: producto, message: "Producto creado con exito" };
    } catch (error) {
      return { error: error, message: "Error al crear Producto (handler)" };
    }
  }

  static async logicDelete(id) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          id,
        },
      });

      if (!producto) {
        throw new Error("El producto no existe");
      }

      let updateDisabled = !producto.disabled;

      await prisma.producto.update({
        where: {
          id,
        },
        data: {
          disabled: updateDisabled,
        },
      });

      return {
        data: producto,
        message: `El producto se ha ${
          updateDisabled ? "desactivado" : "activado"
        } exitosamente`,
      };
    } catch (error) {
      return {
        error: error,
        message: "Error al desactivar Producto (handler)",
      };
    }
  }

  static async trueDelete(id) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          id,
        },
      });

      if (!producto) {
        throw new Error("El producto no existe");
      }

      await prisma.producto.delete({
        where: {
          id,
        },
      });

      return {
        message: "El Producto se ha eliminado exitosamente",
      };
    } catch (error) {
      return {
        error: error,
        message: "Error al eliminar Producto (handler)",
      };
    }
  }

  static async getById(id) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          id,
        },
      });

      if (!producto) {
        throw new Error("El producto no existe");
      }

      return producto;
    } catch (error) {
      return {
        error: error,
        message: "Error al obtener Producto por id (handler)",
      };
    }
  }

  static async getByName(name) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          nombre: name,
        },
      });

      if (!producto) {
        throw new Error("El producto no existe");
      }

      return producto;
    } catch (error) {
      return {
        error: error,
        message: "Error al obtener Producto por nombre (handler)",
      };
    }
  }

  static async getAll() {
    try {
      const productos = await prisma.producto.findMany({});

      return productos;
    } catch (error) {
      return {
        error: error,
        message: "Error al obtener Productos (handler)",
      };
    }
  }

  static async put(id, nombre, descripcion) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          id,
        },
      });

      if (!producto) {
        throw new Error("El producto no existe");
      }

      let productoObj = {};

      if (nombre) productoObj.nombre = nombre;
      if (descripcion) productoObj.descripcion = descripcion;

      producto.update({
        where: {
          id,
        },
        data: {
          ...productoObj,
        },
      });

      return {
        data: producto,
        message: "El Producto se ha actualizado exitosamente",
      };
    } catch (error) {
      return {
        error: error,
        message: "Error al actualizar Producto (handler)",
      };
    }
  }
}

module.exports = ProductoHandler;
