const InventarioHandler = require("../../handlers/Inventario/InventarioHandler");

class InventarioController {
  static async post(req, res) {
    try {
      const { productoId, precio, stock } = req.body;

      const response = await InventarioHandler.post(productId, precio, stock);

      res.status(200).json(response);
    } catch (error) {
      console.log("Error al crear Inventario (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al crear Inventario (Controller)",
      });
    }
  }

  static async trueDelete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "El id es requerido",
          message: "Error al borrar Inventario (Controller)",
        });
      }

      const response = await InventarioHandler.trueDelete(id);

      res.status(200).json(response);
    } catch (error) {
      console.log("Error al borrar Inventario (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al borrar Inventario (Controller)",
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { precio, stock } = req.body;

      if (!id) {
        return res.status(400).json({
          error: "El id es requerido",
          message: "Error al actualizar Inventario (Controller)",
        });
      }

      const response = await InventarioHandler.put(id, precio, stock);

      res.status(200).json(response);
    } catch (error) {
      console.log("Error al actualizar Inventario (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al actualizar Inventario (Controller)",
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          error: "El id es requerido",
          message: "Error al obtener Inventario por id (Controller)",
        });
      }

      const response = await InventarioHandler.getById(id);

      res.status(200).json(response);
    } catch (error) {
      console.log("Error al obtener Inventario por id (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al obtener Inventario por id (Controller)",
      });
    }
  }

  static async getAll(req, res) {
    try {
      const response = await InventarioHandler.getAll();

      res.status(200).json(response);
    } catch (error) {
      console.log("Error al obtener Inventarios (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al obtener Inventarios (Controller)",
      });
    }
  }
}

module.exports = InventarioController;
