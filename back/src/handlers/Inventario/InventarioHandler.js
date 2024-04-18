const prisma = require("@primsa/client");

class InventarioHandler {
  static async post(productoId, precio, stock) {
    try {
      const inventario = prisma.inventario.create({
        data: {
          producto_id: productoId,
          precio,
          stock,
        },
      });

      return {
        data: inventario,
        message: "Inventario creado exitosamente",
      };
    } catch (error) {
      return {
        error: error,
        message: "Error al crear Inventario (handler)",
      };
    }
  }

  static async trueDelete(id) {
    try {
      const inventario = await prisma.inventario.findFirst({
        where: {
          id,
        },
      });

      if (!inventario) {
        throw new Error("El Inventario no existe");
      }

      await prisma.inventario.delete({
        where: {
          id,
        },
      });

      return {
        message: "El Inventario se ha eliminado exitosamente",
      };
    } catch (error) {
      return {
        error: error,
        message: "Error al borrar Inventario (handler)",
      };
    }
  }

  static async put(id, precio, stock) {
    try {
      const inventario = await prisma.inventario.findFist({
        where: {
          id,
        },
      });

      if (!inventario) {
        throw new Error("El Inventario no existe");
      }

      let inventarioObj = {};

      if (precio) inventarioObj.precio = precio;
      if (stock) inventarioObj.stock = stock;

      await prisma.inventario.update({
        where: {
          id,
        },
        data: {
          ...inventarioObj,
        },
      });

      return {
        data: inventario,
        message: "El Inventario se ha actualizado exitosamente",
      };
    } catch (error) {
      return {
        error: error,
        message: "Error al actualizar Inventario (handler)",
      };
    }
  }

  static async getById(id) {
    try {
      const inventario = await prisma.inventario.findFirst({
        where: {
          id,
        },
      });

      return inventario;
    } catch (error) {
      return {
        error: error,
        message: "Error al obtener Inventario por id (handler)",
      };
    }
  }

  static async getAll() {
    try {
      const inventarios = await prisma.inventario.findMany({});

      return inventarios;
    } catch (error) {
      return {
        error: error,
        message: "Error al obtener Inventarios (handler)",
      };
    }
  }
}

module.exports = InventarioHandler;
