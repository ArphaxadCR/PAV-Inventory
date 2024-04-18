const generateBarCode = require("../../utils/generateBarCode");
const upload = require("../../utils/uploadAWS");
const ProductoHandler = require("../../handlers/Producto/ProductoHandler");

class ProductoController {
  static async post(req, res) {
    try {
      const { nombre, descripcion } = req.body;

      const barcodeImage = await generateBarCode(nombre);

      const uploadedBarcodeImage = await upload
        .single("barcodeImage")(barcodeImage)
        .promise();

      const barcodeImageURL = uploadedBarcodeImage.Location;

      const response = await ProductoHandler.post(
        nombre,
        descripcion,
        barcodeImageURL
      );

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al crear producto (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al crear Producto (Controller)",
      });
    }
  }

  static async logicDelete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "El id es requerido",
          message: "Error al desactivar Producto (Controller)",
        });
      }

      const response = await ProductoHandler.logicDelete(id);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al desactivar producto (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al desactivar producto (Controller)",
      });
    }
  }

  static async trueDelete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "El id es requerido",
          message: "Error al eliminar Producto (Controller)",
        });
      }

      const response = await ProductoHandler.trueDelete(id);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al eliminar Producto (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al eliminar Producto (Controller)",
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "El id es requerido",
          message: "Error al obtener Producto por id (Controller)",
        });
      }

      const response = await ProductoHandler.getById(id);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener Producto por id (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al obtener Producto por id (Controller)",
      });
    }
  }

  static async getByName(req, res) {
    try {
      const { name } = req.params;

      if (!name) {
        return res.status(400).json({
          error: "El nombre es requerido",
          message: "Error al obtener Productos por nombre (Controller)",
        });
      }

      const response = await ProductoHandler.getByName(name);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener Producto por nombre (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al obtener Producto por nombre (Controller)",
      });
    }
  }

  static async getAll() {
    try {
      const response = await ProductoHandler.getAll();

      return response;
    } catch (error) {
      console.error("Error al obtener Productos (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al obtener Productos (Controller)",
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (!id) {
        return res.status(400).json({
          error: "El id es requerido",
          message: "Error al actualizar Producto (Controller)",
        });
      }

      const response = await ProductoHandler.update(id, nombre, descripcion);

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al actualizar Producto (Controller)", error);
      res.status(500).json({
        error: error.message,
        message: "Error al actualizar Producto (Controller)",
      });
    }
  }
}
