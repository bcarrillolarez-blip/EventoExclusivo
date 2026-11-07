const SHEET_NAME = "Asistentes";

function doGet(e) {
  // Si la URL tiene ?view=admin, mostramos el Backoffice
  const view = e.parameter.view;
  const templateName = (view === 'admin') ? 'Admin' : 'Index';

  return HtmlService.createTemplateFromFile(templateName)
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setTitle('Evolución Financiera')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Guardar datos (tu función actual)
function registrarDatosPC(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Fecha y Hora", "Nombre y Apellido", "Número de DNI", "Celular"]);
      sheet.getRange("A1:D1").setFontWeight("bold").setBackground("#0a1931").setFontColor("#ffffff");
    }
    sheet.appendRow([new Date(), data.fullname, data.dni, data.phone]);
    return { status: "success" };
  } catch (error) {
    return { status: "error", message: error.toString() };
  }
}

// NUEVA FUNCIÓN: Leer los clientes para el Backoffice
function obtenerAsistentes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  data.shift(); // Quitamos los encabezados
  
  // Formateamos los datos para enviarlos al frontend
  return data.map(row => ({
    fecha: row[0] ? Utilities.formatDate(new Date(row[0]), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm") : '',
    nombre: row[1],
    dni: row[2],
    celular: row[3]
  })).reverse(); // Invertimos para que salgan los más recientes primero
}